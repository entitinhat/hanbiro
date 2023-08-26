import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import Storages from '@base/utils/storages/ls';
// remove console.log
declare global {
  interface Window {
    console: {
      log: () => void;
    };
  }
}
function removeConsoleLog() {
  if (location.host.indexOf('localhost') === -1) {
    window.console.log = () => {};
  }
}
removeConsoleLog();
/******* Defined *****/
const Ls = new Storages();
const currentLang = Ls.get('language-system') ? (Ls.get('language-system') as string) : 'en';
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    lng: currentLang,
    fallbackLng: currentLang,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
