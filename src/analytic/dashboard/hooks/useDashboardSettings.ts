import {useRecoilState} from "recoil";
import {dashboardSettingAtom} from "@analytic/dashboard/store/atoms";
import {DragAndDropItem} from "@analytic/dashboard/types/interfaces/setting";
import {EUserType} from "@analytic/main/types/enum";
import {useUserSetting} from "@base/services";
import {MENU_ANALYTIC} from "@base/config/menus";
import {CATEGORY_DASHBOARD} from "@analytic/main/config";
import useUserSettingMutation from "@base/hooks/user-setting/useUserSettingMutation";
import {isEqual} from "lodash";
import {useEffect} from "react";

export const useDashboardSettings = (userType: EUserType) => {
  const settingKey = [CATEGORY_DASHBOARD, userType.toLowerCase()].join('_')

  const [setting, setSetting] = useRecoilState(dashboardSettingAtom(userType));
  const {data, isLoading} = useUserSetting(MENU_ANALYTIC, settingKey, {});
  const {mUpdateUserSetting} = useUserSettingMutation();

  const handleSave = (newSetting: any) => {
    const param = {
      userSetting: {
        menu: MENU_ANALYTIC,
        key: settingKey,
        value: JSON.stringify(newSetting)
      }
    };
    mUpdateUserSetting.mutate(param);
  };

  useEffect(() => {
    if (!isLoading && !!data?.value) {
      try {
        const settingStored = JSON.parse(data.value);
        if (!isEqual(setting, settingStored)) {
          setSetting(settingStored);
        }
      } catch (error: any) {
        console.log('parse error');
      }
    }
    return () => {}
  }, [data])

  const setSection = (newSections: DragAndDropItem[]) => {
    const newSetting = {...setting, sections: newSections};
    setSetting(newSetting);
    handleSave(newSetting);
  };

  const setItems = (index: number, items: DragAndDropItem[]) => {
    const sections = [...setting.sections];
    sections[index].items = items;

    const newSetting = {...setting, sections};
    setSetting(newSetting);
    handleSave(newSetting);
  };

  return {
    userType: setting.userType,
    isLoading,
    sections: setting.sections,
    setSection,
    setItems
  }
};