import {atom, atomFamily} from "recoil";
import {ESectionType, EUserType} from "@analytic/main/types/enum";
import {sectionAll} from "@analytic/main/config/sections";
import {Setting} from "@analytic/dashboard/types/interfaces/setting";

const defaultDashboardSetting = (userType: EUserType) => {
  const sectionKeys: ESectionType[] = [
    ESectionType.SECTION_CUSTOMER,
    ESectionType.SECTION_ACTIVITY,
    ESectionType.SECTION_DESK,
    ESectionType.SECTION_SATISFACTION
  ];

  const sections = sectionKeys.map((s, i) => {
    const items = sectionAll?.[s]?.[userType]?.map((k: string) => ({
      key: k
    })) ?? [];

    return {
      key: s,
      items
    }
  });

  return {
    userType: userType,
    sections
  };
}

export const dashboardSettingAtom = atomFamily<Setting, EUserType>({
  key: 'dashboardSettingAtom',
  default: (userType) => defaultDashboardSetting(userType)
});