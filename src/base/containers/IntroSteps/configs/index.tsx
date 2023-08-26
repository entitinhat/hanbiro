import { IntroSteps } from '../types';
import { BaseIntro } from './base-intro';
import { SettingIntro } from './setting-intro';
interface stepsIntros {
  [x: string]: IntroSteps[];
}
export const stepsIntros: stepsIntros = {
  'main-menu': BaseIntro,
  settings: SettingIntro
};
