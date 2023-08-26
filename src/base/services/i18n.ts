import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Storages from '@base/utils/storages/ls';
import { getLanguageByMenuAPI } from '@base/services/settingService';
import usePost from '@base/hooks/usePost';
import { GET_LANGUAGE_BY_MENU, GET_PUBLIC_LANGUAGE_BY_MENU } from './graphql/setting';
import { MenuLanguageResponse } from '@base/types/setting';
import usePublicPost from '@base/hooks/publics/usePublicPost';

/******* Defined *****/
const menuLoaded: string[] = [];
const langLoaded: string[] = [];
const Ls = new Storages();

/******* Function *****/
export const getCurrentLang = () => {
  return Ls.get('language-system') ? (Ls.get('language-system') as string) : 'en';
};

export const getLanguageByMenu = async (menus: string[], cb: any) => {
  const currentLang = getCurrentLang();
  let newMenus: string[] = [];
  menus.map((_menu) => {
    if (menuLoaded.indexOf(_menu) === -1 || langLoaded.indexOf(currentLang) === -1) {
      newMenus.push(_menu);
    }
  });
  if (newMenus.length === 0) {
    cb && cb();
    return;
  }

  newMenus.map((_menu) => {
    if (menuLoaded.indexOf(_menu) === -1) {
      menuLoaded.push(_menu);
    }
  });
  if (langLoaded.indexOf(currentLang) === -1) {
    langLoaded.pop();
    langLoaded.push(currentLang);
  }
  console.log('Locales -> Load Language', newMenus, currentLang);
  // useQuery
  const res = await getLanguageByMenuAPI(newMenus, currentLang);
  if (res && res.results) {
    const rows = res.results || {};
    i18n.addResourceBundle(currentLang, 'translation', rows, true, true);
    //refresh lang
    await i18n.changeLanguage(currentLang);
  }
};

export const useLanguageByMenu = async (menus: string[], cb?: any) => {
  const currentLang = getCurrentLang();
  let newMenus: string[] = [];
  menus.map((_menu) => {
    if (menuLoaded.indexOf(_menu) === -1 || langLoaded.indexOf(currentLang) === -1) {
      newMenus.push(_menu);
    }
  });
  if (newMenus.length === 0) {
    cb && cb();
    return;
  }

  newMenus.map((_menu) => {
    if (menuLoaded.indexOf(_menu) === -1) {
      menuLoaded.push(_menu);
    }
  });
  if (langLoaded.indexOf(currentLang) === -1) {
    langLoaded.pop();
    langLoaded.push(currentLang);
  }

  const res = await getLanguageByMenuAPI(newMenus, currentLang);
  if (res && res.results) {
    const rows = res.results || {};
    i18n.addResourceBundle(currentLang, 'translation', rows, true, true);
    //refresh lang
    await i18n.changeLanguage(currentLang);
  }
};

export const updateLanguageI18n = (langKey: string, langValue: any) => {
  const userLang = getCurrentLang();
  let newLangJson: any = {};
  newLangJson[langKey] = langValue[userLang];
  i18n.addResources(userLang, 'translation', newLangJson);
};

export const loadLocaleData = (newLang: string, cb: any) => {
  console.log('loadLocaleData newLang', newLang);
  return getLanguageByMenu(menuLoaded, cb);
};

//for public site
export const usePublicLanguageByMenu = async (menus: string[], token: string) => {
  const currentLang = getCurrentLang();
  menus.map((_menu) => {
    if (menuLoaded.indexOf(_menu) !== -1 && langLoaded.indexOf(currentLang) !== -1) {
      return;
    }
  });
  menus.map((_menu) => {
    if (menuLoaded.indexOf(_menu) === -1) {
      menuLoaded.push(_menu);
    }
  });
  if (langLoaded.indexOf(currentLang) === -1) {
    langLoaded.push(currentLang);
  }
  let queryKeys: string[] = ['site_menusLanguages', ...menus, currentLang];
  let variables = {
    menus: menus,
    lang: currentLang,
    token
  };
  const { data } = usePublicPost<MenuLanguageResponse>(queryKeys, GET_PUBLIC_LANGUAGE_BY_MENU, variables, {
    enabled: menus.length > 0 && token !== ''
  });
  if (data && data.results) {
    const rows = data.results || {};
    i18n.addResourceBundle(currentLang, 'translation', rows, true, true);
    await i18n.changeLanguage(currentLang);
  }
};
