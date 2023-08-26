export type ThemeDirection = 'ltr' | 'rtl';
export type ThemeMode = 'light' | 'dark';
export type FontFamily =
  | `Inter,sans-serif`
  | `Roboto,sans-serif`
  | `'IBM Plex Sans',sans-serif`
  | `'Nanum Gothic',sans-serif`
  | `'Noto Sans',sans-serif`
  | `'Noto Sans KR',sans-serif`;
export type PresetColor = 'default';
// export type I18n = 'en' | 'fr' | 'ro' | 'zh' | 'vi' | 'ko'; // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
export type I18n = 'en' | 'ko' | 'vi' | 'jp' | 'zh' | 'ido'; // like /src/base/config/constant.ts > LANGUAGES

// ==============================|| CONFIG TYPES  ||============================== //

export type CustomizationActionProps = {
  type: string;
  payload?: CustomizationProps;
};

export type DefaultConfigProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  i18n: I18n;
  // miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  enableTrans: boolean;
};

export type CustomizationProps = {
  defaultPath: string;
  fontFamily: FontFamily;
  i18n: I18n;
  miniDrawer: boolean;
  container: boolean;
  mode: ThemeMode;
  presetColor: PresetColor;
  themeDirection: ThemeDirection;
  onChangeContainer: VoidFunction;
  onChangeLocalization: (lang: I18n) => void;
  onChangeMode: (mode: ThemeMode) => void;
  onChangePresetColor: (theme: PresetColor) => void;
  onChangeDirection: (direction: ThemeDirection) => void;
  // onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeFontFamily: (fontFamily: FontFamily) => void;
};

export interface Language {
  code: I18n;
  title: string;
}
