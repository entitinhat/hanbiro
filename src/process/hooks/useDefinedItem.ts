import { useMemo } from 'react';

import { LIST_STALE_TIME } from '@base/config/constant';
import usePost from '@base/hooks/usePost';
import { OptionValue } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@process/config/queryKeys';
import { stepDoCustom } from '@process/containers/Diagram/Step/StepWrite';
import { GET_DEFINED_ITEMS } from '@process/services/custom';
import { NodeType } from '@process/types/diagram';
import { DefinedItem, SettingType } from '@process/types/settings';

export type useDefinedItemProps = {
  stepType: NodeType;
  direction: string;
};

export const useGetDefinedItems = (schema: string, tab: SettingType, params: any, opts?: any) => {
  const fallback = { results: [] };
  const queryKey = [queryKeys.definedItems, tab];
  const { data: results = fallback, refetch } = usePost<BaseResponse<DefinedItem[]>>(queryKey, schema, params, opts);

  return { results, refetch };
};

const useDefinedItem = ({ stepType, direction }: useDefinedItemProps): [Record<string, DefinedItem[]>, OptionValue[]] => {
  const { results: definedItems } = useGetDefinedItems(GET_DEFINED_ITEMS, 'all', { isTenant: false }, { staleTime: LIST_STALE_TIME });

  const definedData = useMemo(() => {
    let items: Record<string, DefinedItem[]> = {};
    if (definedItems) {
      for (const item of definedItems.results) {
        if (!items[item.type]) {
          items[item.type] = [];
        }
        items[item.type].push(item);
      }
    }
    return items;
  }, [definedItems]);

  const definedOptions = useMemo<OptionValue[]>(() => {
    let options: OptionValue[] = [];
    if (definedData) {
      if (stepType == 'TYPE_ACTION' && definedData.TYPE_ACTION) {
        options.push(stepDoCustom);
        for (const action of definedData.TYPE_ACTION) {
          if (direction == 'DIRECTION_FORWARD_OUTGOING_BOTTOM' && action.shape != 'SHAPE_BACKWARD') {
            continue;
          }
          if (direction == 'DIRECTION_FORWARD_OUTGOING_RIGHT' && action.shape != 'SHAPE_FORWARD') {
            continue;
          }
          if (direction == 'DIRECTION_BACKWARD_OUTGOING_RIGHT' && action.shape != 'SHAPE_BACKWARD') {
            continue;
          }
          options.push({
            keyName: action.id,
            languageKey: action.name
          });
        }
      } else if (stepType == 'TYPE_CRITERIA' && definedData.TYPE_CRITERIA) {
        for (const criteria of definedData.TYPE_CRITERIA) {
          options.push({
            keyName: criteria.id,
            languageKey: criteria.name
          });
        }
      }
    }
    return options;
  }, [stepType, definedData]);

  return [definedData, definedOptions];
};

export default useDefinedItem;
