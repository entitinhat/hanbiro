import {EChartType, EUserType} from "@analytic/main/types/enum";
import {sectionTitles} from "@analytic/main/config/sections";
import {chartBoxes as CChartBoxes} from "@analytic/main/config/charts";
import {DragAndDropItem} from "@analytic/dashboard/types/interfaces/setting";
import {cloneDeep, keys, merge} from "lodash";
import {IdName} from "@base/types/common";
import { t } from 'i18next';

interface Section {
  key: string;
  title: string;
  charts: any[];
  order: number;
}

export const getConfigsBySetting = (sections: DragAndDropItem[], userType: EUserType): Section[] => {
  return sections.reduce((f: Section[], v, i) => {
    const {key: s, items, hide} = v;
    if(!hide){
      f = [...f, {
        key: s,
        title: t(sectionTitles[s]),
        charts: items?.reduce((f2: any[], v) => {
          const {key: c, hide} = v;
          if(!hide){
            const {adminProps, ...restProps} = CChartBoxes?.[c] ?? {};
            f2 = [...f2, (userType === EUserType.USER_TYPE_ADMIN && !!adminProps) ? merge(restProps, adminProps, {me: false}) : {...restProps, me: true}];
          }
          return f2;
        }, []) ?? [],
        order: i
      }];
    }
    return f;
  }, []);
}

export const getConfigsBySetting2 = (chartBoxes: any, sections: DragAndDropItem[], userType: EUserType): Section[] => {
  return sections.reduce((f: Section[], v, i) => {
    const {key: s, items, hide} = v;
    if(!hide){
      f = [...f, {
        key: s,
        title: t(sectionTitles[s]),
        charts: items?.reduce((f2: any[], v) => {
          const {key: c, hide} = v;
          if(!hide){
            const {adminProps, ...restProps} = chartBoxes?.[c] ?? {};
            f2 = [...f2, (userType === EUserType.USER_TYPE_ADMIN && !!adminProps) ? merge(restProps, adminProps, {me: false}) : {...restProps, me: true}];
          }
          return f2;
        }, []) ?? [],
        order: i
      }];
    }
    return f;
  }, []);
}

export const makeSatisfactionConfigs = (questions: IdName[]) => {
  const questionConfig = CChartBoxes?.[EChartType.CHART_SATISFACTION_QUESTION] ?? {};
  return questions.reduce((f: any, q) => {
    f[q.id] = merge(
      cloneDeep(questionConfig),
      {
        key: q.id,
        title: q.name,
        filterProps: {
          defaultQuery: `question="${q.name}"`
        },
        adminProps: {
          title: q.name
        }
      }
    );
    return f;
  }, {});
}

export const keyValueToArray = (source: {[x: string|number]: string|number}) => {
  return keys(source).map((k) => ({label: source[k], value: k}));
}