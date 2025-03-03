import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import hi from './locales/hi/translation.json';
import fr from './locales/fr/translation.json';
import zh from './locales/zh/translation.json';
import es from './locales/es/translation.json';
import jp from './locales/jp/translation.json';
import ru from './locales/ru/translation.json';
import ar from './locales/ar/translation.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      fr: { translation: fr },
      zh: { translation: zh },
      es: { translation: es },
      jp: { translation: jp },
      ru: { translation: ru },
      ar: { translation: ar },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    supportedLngs: ['en', 'hi', 'fr', 'zh', 'es', 'jp', 'ru', 'ar'],
    detection: { order: ['navigator'] },
  });

export default i18n;