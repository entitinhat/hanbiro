import {atom} from "recoil";

export const dashboardChartAtom = atom<any>({
  key: 'dashboardChartAtom',
  default: {
    sectionAll: null,
    chartBoxes: null
  }
});