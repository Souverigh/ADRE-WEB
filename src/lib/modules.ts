import type {Locale} from './i18n';

type Module = {
  id: string;
  title: string;
  description: string;
  documents: string;
  highlights: string[];
  features: [string, string][];
};
type ModulesCopy = {eyebrow: string; title: string; body: string; details: string; documentsLabel: string; items: Module[]};

export const modulesCopy: Record<Locale, ModulesCopy> = {
  ru: {
    eyebrow: 'Новые возможности ADRE',
    title: 'Бухгалтерия и перевод документов',
    body: 'Два отдельных модуля для бухгалтеров, переводчиков и бюро переводов. Меньше ручной работы, результат под вашим контролем.',
    details: 'Все возможности модуля', documentsLabel: 'Поддерживаемые документы',
    items: [
      {
        id: 'accounting', title: 'Бухгалтерия',
        description: 'Распознавайте финансовые документы, проверяйте данные и выгружайте результат в Excel.',
        documents: 'Электронная счёт-фактура (ЭСФ), товарная накладная, акт выполненных работ, платёжное поручение.',
        highlights: ['Проверка распознанных данных перед сохранением', 'Загрузка нескольких документов сразу', 'Excel для дальнейшего переноса данных в 1С и другие системы'],
        features: [
          ['Поля и реквизиты', 'Автоматическое извлечение полей, включая банковские реквизиты и дополнительный текст: сведения о подписи, печати и договоре.'],
          ['Проверка перед сохранением', 'На отдельном экране видно, что распознано. Вы проверяете данные до принятия результата.'],
          ['Работа с пачкой документов', 'Загружайте сразу несколько документов для обработки.'],
          ['Экспорт в Excel', 'Получайте готовую основу для переноса данных в 1С и другие бухгалтерские системы.'],
          ['Понятные замечания', 'Ошибки и предупреждения описаны обычным языком вместо технических кодов.'],
          ['С телефона и компьютера', 'Модуль адаптирован под мобильные устройства.'],
        ],
      },
      {
        id: 'translation', title: 'Перевод',
        description: 'Отдельный раздел для подготовки нотариальных и юридических переводов с сохранением структуры документа.',
        documents: 'Паспорта, в том числе Канады и Узбекистана (старого и биометрического образца), удостоверения личности, аттестаты, свидетельства о рождении и смерти, справки о несудимости и составе семьи, апостили и любые ваши типы документов.',
        highlights: ['Перевод целиком с сохранением структуры', 'Глоссарий ФИО, топонимов и юридических формулировок', 'Отдельные роли владельца бюро и переводчиков'],
        features: [
          ['Автоматическое определение языка', 'ADRE определяет язык исходного документа. Указывать его вручную не нужно. Добавлены итальянский и испанский языки перевода.'],
          ['«Перевести как есть»', 'Перевод всего документа с сохранением структуры и разбивки на абзацы, а не только отдельных полей.'],
          ['Перевод PDF «на месте»', 'Перевод с сохранением исходной вёрстки страницы.'],
          ['Глоссарий ФИО и топонимов', 'Словарь учитывает подтверждённые клиентом варианты написания. Общие варианты формируются по большинству подтверждений.'],
          ['Юридические формулировки на кыргызском', 'Для юридических клише используются устоявшиеся формулировки из словаря.'],
          ['Оформление для нотариуса', 'По умолчанию добавляется печатная приписка переводчика со ссылкой на закон и обозначенным местом под печать нотариуса.'],
          ['Работа бюро', 'Мультипользовательские аккаунты с раздельными ролями владельца и переводчиков.'],
          ['Поворот сканов', 'Автоматическое распознавание и исправление поворота страницы при сканировании.'],
          ['Экспорт в DOCX и PDF', 'Улучшена обработка таблиц, переносов текста и колонтитулов при экспорте.'],
        ],
      },
    ],
  },
  en: {
    eyebrow: 'New in ADRE', title: 'Accounting and document translation',
    body: 'Two dedicated modules for accountants, translators and translation agencies. Less manual work, with you in control of the result.',
    details: 'All module features', documentsLabel: 'Supported documents',
    items: [
      {
        id: 'accounting', title: 'Accounting',
        description: 'Extract financial document data, review it and export the result to Excel.',
        documents: 'Electronic tax invoices (ESF), delivery notes, certificates of completed work and payment orders.',
        highlights: ['Review extracted data before saving', 'Upload multiple documents at once', 'Excel as a starting point for transferring data to 1C and other systems'],
        features: [
          ['Fields and bank details', 'Automatically extract fields, including bank details and additional text relating to signatures, stamps and contracts.'],
          ['Review before saving', 'A dedicated review screen shows the extracted data before you accept the result.'],
          ['Batch upload', 'Upload several documents together for processing.'],
          ['Excel export', 'Get a starting point for transferring data to 1C and other accounting systems.'],
          ['Clear feedback', 'Errors and warnings use plain language instead of technical codes.'],
          ['Mobile access', 'The module adapts to phones as well as desktop screens.'],
        ],
      },
      {
        id: 'translation', title: 'Translation',
        description: 'A dedicated workspace for preparing legal translations and translations for notarization while preserving document structure.',
        documents: 'Passports, including Canadian and Uzbek passports (old and biometric versions), identity cards, school certificates, birth and death certificates, criminal record and family composition certificates, apostilles and your own document types.',
        highlights: ['Full-document translation with structure preserved', 'Glossary for names, place names and legal wording', 'Separate roles for agency owners and translators'],
        features: [
          ['Automatic language detection', 'ADRE detects the source language without manual selection. Italian and Spanish have been added as translation languages.'],
          ['“Translate as is”', 'Translate the whole document with its structure and paragraph breaks, rather than only selected fields.'],
          ['In-place PDF translation', 'Translate while preserving the original page layout.'],
          ['Name and place-name glossary', 'The glossary learns from spellings confirmed by the client. Shared entries are based on the majority of confirmations.'],
          ['Kyrgyz legal wording', 'Established legal phrases are taken from a dedicated dictionary.'],
          ['Formatting for notarization', 'A printed translator’s statement with a legal reference and a marked area for the notary’s stamp is included by default.'],
          ['Agency accounts', 'Multi-user accounts with separate roles for the agency owner and translators.'],
          ['Scan rotation', 'Automatically detect and correct rotated scanned pages.'],
          ['DOCX and PDF export', 'Improved handling of tables, text wrapping, headers and footers during export.'],
        ],
      },
    ],
  },
  kg: {
    eyebrow: 'ADRE жаңылыктары', title: 'Бухгалтерия жана документтерди которуу',
    body: 'Бухгалтерлер, котормочулар жана котормо бюролору үчүн эки өзүнчө модуль. Кол менен жасалчу иш азаят, натыйжа сиздин көзөмөлүңүздө болот.',
    details: 'Модулдун бардык мүмкүнчүлүктөрү', documentsLabel: 'Колдоого алынган документтер',
    items: [
      {
        id: 'accounting', title: 'Бухгалтерия',
        description: 'Финансылык документтерден маалыматтарды алып, текшерип, натыйжаны Excel форматына чыгарыңыз.',
        documents: 'Электрондук эсеп-фактура (ЭСФ), товардык коштомо кагаз, аткарылган иштердин актысы, төлөм тапшырмасы.',
        highlights: ['Таанылган маалыматтарды сактоодон мурун текшерүү', 'Бир нече документти чогуу жүктөө', 'Маалыматтарды 1С жана башка системаларга өткөрүү үчүн Excel'],
        features: [
          ['Талаалар жана реквизиттер', 'Банк реквизиттерин жана кол тамга, мөөр, келишим тууралуу кошумча текстти кошо автоматтык түрдө алуу.'],
          ['Сактоодон мурун текшерүү', 'Өзүнчө экранда таанылган маалыматтар көрсөтүлөт. Натыйжаны кабыл алардан мурун аларды текшересиз.'],
          ['Документтерди чогуу иштетүү', 'Иштетүү үчүн бир нече документти бир убакта жүктөңүз.'],
          ['Excel форматына чыгаруу', 'Маалыматтарды 1С жана башка бухгалтердик системаларга өткөрүү үчүн даяр негиз алыңыз.'],
          ['Түшүнүктүү эскертүүлөр', 'Каталар жана эскертүүлөр техникалык коддордун ордуна жөнөкөй тилде түшүндүрүлөт.'],
          ['Телефондон иштөө', 'Модуль мобилдик түзмөктөргө ылайыкташтырылган.'],
        ],
      },
      {
        id: 'translation', title: 'Котормо',
        description: 'Документтин түзүмүн сактап, нотариалдык күбөлөндүрүү үчүн жана юридикалык котормолорду даярдоочу өзүнчө бөлүм.',
        documents: 'Паспорттор, анын ичинде Канада жана Өзбекстандын эски жана биометрикалык паспорттору, өздүк күбөлүктөр, аттестаттар, туулгандыгы жана өлгөндүгү тууралуу күбөлүктөр, соттолбогондугу жана үй-бүлө курамы тууралуу маалымкаттар, апостилдер жана сиздин документ түрлөрүңүз.',
        highlights: ['Документти түзүмүн сактоо менен толук которуу', 'Аты-жөндөр, жер-суу аттары жана юридикалык сөз айкаштары үчүн сөздүк', 'Бюро ээси жана котормочулар үчүн өзүнчө ролдор'],
        features: [
          ['Тилди автоматтык аныктоо', 'ADRE баштапкы документтин тилин өзү аныктайт. Кол менен тандоонун кереги жок. Котормо тилдерине италия жана испан тилдери кошулду.'],
          ['«Кандай болсо, ошондой которуу»', 'Тандалган талааларды гана эмес, бүт документти түзүмүн жана абзацтарын сактап которуу.'],
          ['PDF барагында которуу', 'Котормодо барактын баштапкы жайгашуусу сакталат.'],
          ['Аты-жөндөр жана жер-суу аттары', 'Сөздүк кардар ырастаган жазылыштарды эске алат. Жалпы варианттар көпчүлүк ырастоолордун негизинде түзүлөт.'],
          ['Кыргызча юридикалык сөз айкаштары', 'Юридикалык туруктуу сөз айкаштары үчүн сөздүктөгү калыптанган формулировкалар колдонулат.'],
          ['Нотариус үчүн тариздөө', 'Котормочунун мыйзамга шилтемеси бар басма жазуусу жана нотариустун мөөрү үчүн белгиленген орун демейки боюнча кошулат.'],
          ['Бюронун иши', 'Бюро ээси жана котормочулар үчүн өзүнчө ролдору бар көп колдонуучулуу аккаунттар.'],
          ['Скандын багытын оңдоо', 'Сканерленген барактын бурулушун автоматтык аныктоо жана оңдоо.'],
          ['DOCX жана PDF форматына чыгаруу', 'Таблицаларды, тексттин сапка бөлүнүшүн жана колонтитулдарды экспорттоодо иштетүү жакшыртылды.'],
        ],
      },
    ],
  },
};
