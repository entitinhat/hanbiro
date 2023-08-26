import { AssignmentRule } from '../../types/rule';

export const ParseData = (data: AssignmentRule, curIndex: number) => {
  if (data) {
    const curEntry = data.rulesEntry[curIndex];
    var criteria: { [x: string]: any } = {};
    curEntry?.criteria?.map((item: { key: string; condition: string }) => {
      criteria[item.key] = item.condition ? JSON.parse(item.condition) : '';
    });
    return {
      ...criteria,
      assignTo: curEntry?.assignTo,
      // assignUnassigned: curEntry?.assignUnassigned
    };
  } else return null;
};
