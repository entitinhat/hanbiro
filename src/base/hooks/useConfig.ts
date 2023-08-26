import { useRecoilState } from 'recoil';
// types
import { DefaultConfigProps, FontFamily, I18n as LangType, PresetColor, ThemeDirection, ThemeMode } from '@base/types/config';
import { configAtom } from '@base/store/atoms';
import Storages from '@base/utils/storages/ls';
import i18n from 'i18next';
import _ from 'lodash';
import { useAppSetting } from './user-setting/useAppSetting';
import { default as configConst } from '@base/config/config';

// ==============================|| CONFIG - HOOKS  ||============================== //

export interface UseConfigProps {
  onChange: (nConfig: DefaultConfigProps) => void;
}

const useConfig = () => {
  const { saveAppSetting } = useAppSetting();
  const [config, setConfig] = useRecoilState<DefaultConfigProps>(configAtom);
  // console.log('🚀 ~ file: useConfig.ts:11 ~ useConfig ~ config', config);

  const Ls = new Storages();
  const languageTranslator = Ls.get('language-translator') ? (Ls.get('language-translator') as string) : 'false';

  // save app config
  const handleAppSetting = (nConfig: DefaultConfigProps) => {
    // console.log('handleAppSetting');
    setConfig(nConfig);
    saveAppSetting(nConfig);
  };

  return {
    ...config,
    onChangeContainer: () => {},
    onChangeLocalization: async (lang: LangType) => {
      Ls.set('language-system', lang);
      const nConfig = { ...config, i18n: lang };
      handleAppSetting(nConfig);
      //change language view
      await i18n.changeLanguage(lang);
    },
    onChangeMode: (mode: ThemeMode) => {
      const nConfig = { ...config, mode: mode };
      handleAppSetting(nConfig);
    },
    onChangePresetColor: (theme: PresetColor) => {
      const nConfig = { ...config, presetColor: theme };
      handleAppSetting(nConfig);
    },
    onChangeDirection: (direction: ThemeDirection) => {},
    // onChangeMiniDrawer: (miniDrawer: boolean) => {},
    onChangeFontFamily: (fontFamily: FontFamily) => {},
    enableTrans: languageTranslator === 'true',
    onLanguageTranslator: (enableTrans: boolean) => {
      Ls.set('language-translator', enableTrans.toString());
      const nConfig = { ...config, enableTrans: enableTrans };
      setConfig(nConfig);
    },
    initAppSetting: (nConfig: DefaultConfigProps) => {
      // console.log('initAppSetting', nConfig, config);
      if (!_.eq(nConfig, config)) {
        setConfig(nConfig);
      }
    }
  };
};

export default useConfig;
