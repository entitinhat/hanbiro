import { EAREntryAssignToMode, RuleEntry } from '../../types/rule';

export const finalizeParams = (formData: any) => {
  let ar: any = {};
  ar = formData;
  ar.active = true;
  delete ar.id;
  // ar.module = ar.module.value;
  ar.channelType = ar.channel.type;
  ar.channel = { id: ar.channel.id, name: ar.channel.name };
  ar.rulesEntry = formData.rulesEntry.map((rule: any) => {
    rule.criteria = rule.criteria.filter((_item: any) => _item.condition !== '');
    rule.criteria = rule.criteria.map((val: { key: string; condition: any }) => ({
      key: val.key,
      condition: JSON.stringify(val.condition)
    }));
    console.log('modified rule', rule);
    delete rule.id;
    if (rule?.assignTo?.mode == EAREntryAssignToMode.USER) {
      rule.assignTo = {
        ...rule?.assignTo,
        assignsTo: rule.assignTo?.assignsTo?.map((item: any) => ({
          user: item?.user
        }))
      };
    } else
      rule.assignTo = {
        ...rule?.assignTo,
        assignsTo: rule.assignTo?.assignsTo?.map((item: any) => ({
          group: item?.group
        }))
      };

    return rule;
  });

  console.log('ar after Stringlify', ar);
  return { ar };
};
