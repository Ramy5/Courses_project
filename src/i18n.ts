import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18next
  .use(I18NextHttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // if i want to set initial value, otherwise remove this to be automatic
    lng: "en",
    load: "languageOnly", // will prevent backend from loading en-US for example
    backend: {
      // options for backend plugin
      // loadPath: '/locales/{{lng}}/{{ns}}.json', // path to your translation files
    },
    detection: {
      // order and from where user language should be detected
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],

      // keys or params to lookup language from
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // cache user language on
      caches: ["localStorage", "cookie"],
      excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

      // optional expire and domain for set cookie
      cookieMinutes: 10,
      cookieDomain: "myDomain",

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement,
      // optional custom function to get the user's language, has to return a string (lng) or an array of strings (lngs)
      // getCustomDetector: function() { return 'en'; }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });
