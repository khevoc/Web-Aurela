import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa tus archivos de traducción
import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    lng: "en", // idioma inicial
    fallbackLng: "en", // idioma de respaldo si falta una traducción
    debug: false,

    interpolation: {
      escapeValue: false, // react ya hace el escape de valores
    },
  });

export default i18n;
