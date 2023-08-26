import {ESectionType, EUserType} from "@analytic/main/types/enum";

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const makeDashboardDefaultSetting = (sectionAll: any, userType: EUserType): any => {
  const sectionKeys: ESectionType[] = [
    ESectionType.SECTION_CUSTOMER,
    ESectionType.SECTION_ACTIVITY,
    ESectionType.SECTION_DESK,
    ESectionType.SECTION_SATISFACTION,
    ESectionType.SECTION_SUS
  ];

  return sectionKeys?.map((s, i) => {
    const items = sectionAll?.[s]?.[userType]?.map((k: string) => ({
      key: k
    })) ?? [];

    return {
      key: s,
      items
    }
  }) ?? [];
}