import { atom } from 'recoil';
import { BaseIntro } from '../../configs/base-intro';
import { SettingIntro } from '../../configs/setting-intro';
import { IntroSteps } from '../../types';
import * as keyNames from '@base/containers/IntroSteps/configs/keyNames';
export interface IntroItem {
  [x: string]: {
    steps: IntroSteps[];
    currentStep: number;
    nextStep: number;
  };
}
export const introItem = atom({
  key: 'introItem',
  default: {
    [keyNames.SETTINGS_INTRO]: {
      steps: SettingIntro,
      currentStep: 0,
      nextStep: 1
    },
    [keyNames.MAIN_MENU_INTRO]: {
      steps: BaseIntro,
      currentStep: 0,
      nextStep: 1
    }
  } as IntroItem
});
