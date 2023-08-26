import { selectorFamily } from 'recoil';

import { Setting, SettingType } from '@project/types/setting';
import { projectSettingsAtom } from '../atoms/setting';

export const projectSettingSelector = selectorFamily({
  key: 'projectSettingSelector',
  get:
    (type: SettingType) =>
    ({ get }) => {
      const projectSettings = get(projectSettingsAtom);
      return projectSettings.filter((item: Setting) => item.type == type);
    }
});

/*
export const costTypeSelector = selector<Setting[]>({
  key: 'costTypeSelector',
  get: ({ get }) => {
    const projectSettings = get(projectSettingsAtom);
    return projectSettings.filter((item: Setting) => item.type == 'TYPE_COST');
  }
});

export const devTypeSelector = selector<Setting[]>({
  key: 'devTypeSelector',
  get: ({ get }) => {
    const projectSettings = get(projectSettingsAtom);
    return projectSettings.filter((item: Setting) => item.type == 'TYPE_DEV');
  }
});

export const noteCategorySelector = selector<Setting[]>({
  key: 'noteCategorySelector',
  get: ({ get }) => {
    const projectSettings = get(projectSettingsAtom);
    return projectSettings.filter((item: Setting) => item.type == 'TYPE_NOTE_CATEGORY');
  }
});

export const projectTypeSelector = selector<Setting[]>({
  key: 'projectTypeSelector',
  get: ({ get }) => {
    const projectSettings = get(projectSettingsAtom);
    return projectSettings.filter((item: Setting) => item.type == 'TYPE_PROJECT');
  }
});

export const projectTypeSelector = selector<Setting[]>({
  key: 'projectTypeSelector',
  get: ({ get }) => {
    const projectSettings = get(projectSettingsAtom);
    return projectSettings.filter((item: Setting) => item.type == 'TYPE_PROJECT');
  }
});
*/
