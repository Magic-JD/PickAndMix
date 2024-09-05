import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
        "start": "Start",
        "current": "Current",
        "goal": "Goal",
        "congratulations": "Congratulations!",
        "choices": "Choices",
        "time": "Time",
        "try-again": "Try Again",
        "share": "Share",
        "donate": "Donate",
    }
  },
  id: {
    translation: {
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
