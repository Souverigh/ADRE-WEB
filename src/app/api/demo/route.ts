import {NextResponse} from 'next/server';

type DemoRequest = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  industry?: string;
  volume?: string;
  workflow?: string;
};

const recipientEmail = 'info@adre-cloud.app';

function required(value: string | undefined) {
  return typeof value === 'string' && value.trim().length > 0;
}

function formatMessage(data: DemoRequest) {
  return [
    'Новая заявка на демо ADRE',
    '',
    `Имя: ${data.name?.trim() || '-'}`,
    `Компания: ${data.company?.trim() || '-'}`,
    `Телефон / WhatsApp: ${data.phone?.trim() || '-'}`,
    `Email: ${data.email?.trim() || '-'}`,
    `Направление: ${data.industry?.trim() || '-'}`,
    `Документов в месяц: ${data.volume?.trim() || '-'}`,
    '',
    'Процесс / комментарий:',
    data.workflow?.trim() || '-',
  ].join('\n');
}

export async function POST(request: Request) {
  let data: DemoRequest;
  try {
    data = await request.json() as DemoRequest;
  } catch {
    return NextResponse.json({error: 'Некорректные данные формы.'}, {status: 400});
  }

  if (!required(data.name) || !required(data.email) || !required(data.workflow)) {
    return NextResponse.json({error: 'Заполните имя, email и описание процесса.'}, {status: 400});
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  if (!resendApiKey || !telegramBotToken || !telegramChatId) {
    return NextResponse.json({error: 'Каналы отправки не настроены.'}, {status: 500});
  }

  const message = formatMessage(data);
  const emailResult = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || 'ADRE website <onboarding@resend.dev>',
      to: [recipientEmail],
      reply_to: data.email,
      subject: `Новая заявка на демо: ${data.company?.trim() || data.name?.trim()}`,
      text: message,
    }),
  });

  const telegramResult = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({chat_id: telegramChatId, text: message}),
  });

  if (!emailResult.ok && !telegramResult.ok) {
    console.error('Demo delivery failed', {emailStatus: emailResult.status, telegramStatus: telegramResult.status});
    return NextResponse.json({error: 'Не удалось доставить заявку.'}, {status: 502});
  }

  if (!emailResult.ok || !telegramResult.ok) {
    console.error('Demo delivery partially succeeded', {emailStatus: emailResult.status, telegramStatus: telegramResult.status});
  }

  return NextResponse.json({ok: true, email: emailResult.ok, telegram: telegramResult.ok});
}