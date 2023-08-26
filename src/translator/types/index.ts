export interface Menu {
  keyName: string;
  languageKey: string;
  label: string;
  value: string;
}

export interface Keylang {
  system: {
    value: string;
    label: string;
  };
  id: string;
  menu: Menu;
  en: string;
  ko: string;
  vi: string;
  jp: string;
  ch: string;
  zh: string;
  ido: string;
  langKey: string;
}
