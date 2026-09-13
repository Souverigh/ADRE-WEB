import type {Locale} from './i18n';

export const contactRegion: Record<Locale, {title: string; region: string; description: string}> = {
  ru: {
    title: 'Регион работы',
    region: 'Кыргызстан',
    description: 'АДРЕ ориентирован на бизнес в Кыргызстане. Работаем онлайн с клиентами из Бишкека, Оша и других городов и регионов страны, а также из стран СНГ. Обсудить обработку документов, демонстрацию платформы и интеграцию можно дистанционно по электронной почте, телефону или через форму обращения.',
  },
  kg: {
    title: 'Иштөө аймагы',
    region: 'Кыргызстан',
    description: 'АДРЕ Кыргызстандагы бизнеске багытталган. Бишкек, Ош жана өлкөнүн башка шаарлары менен аймактарындагы, ошондой эле КМШ өлкөлөрүндөгү кардарлар менен онлайн иштейбиз. Документтерди иштетүүнү, платформанын демосун жана интеграцияны электрондук почта, телефон же кайрылуу формасы аркылуу аралыктан талкууласаңыз болот.',
  },
  en: {
    title: 'Service area',
    region: 'Kyrgyzstan',
    description: 'ADRE focuses on businesses in Kyrgyzstan. We work online with clients in Bishkek, Osh and other cities and regions across the country, as well as the CIS. Contact us remotely by email, phone or the enquiry form to discuss document processing, a platform demonstration or integration.',
  },
};
