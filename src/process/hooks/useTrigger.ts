import { useEffect, useMemo, useState } from 'react';

import { IdName, OptionValue } from '@base/types/common';
import { useGetDefinedItems } from '@process/hooks/useDefinedItem';
import { GET_DEFINED_TRIGGER } from '@process/services/custom';
import { FieldType, TriggerType } from '@process/types/diagram';
import { DefinedTrigger, ModuleType, ProcessType, PropertyType } from '@process/types/process';

const useTrigger = (triggerType?: string, filter?: string): [DefinedTrigger | undefined, OptionValue[]] => {
  const [defined, setDefined] = useState<DefinedTrigger>();
  const { results: definedTriggers } = useGetDefinedItems(GET_DEFINED_TRIGGER, 'trigger', {
    type: 'TYPE_TRIGGER'
  });

  const triggerOptions = useMemo(() => {
    let options: OptionValue[] = [];
    if (definedTriggers && definedTriggers.results) {
      options = definedTriggers.results.map((trigger) => {
        return {
          keyName: trigger.id,
          languageKey: trigger.name,
          extra: trigger.trigger
        };
      });
      if (filter == 'wait') {
        options = options.filter(
          (opt) => opt.extra.trigger == 'TRIGGER_TYPE_FIELD_UPDATED' || opt.extra.trigger == 'TRIGGER_TYPE_PROCESS_PROPERTY_UPDATED'
        );
      }
    }
    return options;
  }, [definedTriggers]);

  useEffect(() => {
    if (triggerType) {
      const find = triggerOptions.find((trigger) => trigger.keyName == triggerType);
      if (find) {
        setDefined({
          trigger: find.extra.trigger as TriggerType,
          module: find.extra.module as ModuleType,
          field: find.extra.field as string,
          ftype: find.extra.ftype as FieldType,
          ptype: find.extra.ptype as ProcessType,
          process: find.extra.process as IdName,
          step: find.extra.step as IdName,
          property: find.extra.property as PropertyType
        });
      }
    }
  }, [triggerType, triggerOptions]);

  return [defined, triggerOptions];
};

export default useTrigger;
