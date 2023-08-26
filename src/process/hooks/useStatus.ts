import _ from 'lodash';
import { ChangeEvent } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';

import { OptionValue } from '@base/types/common';
import { replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { PROCESS_STATUS_DIRECTIONS_SORT } from '@process/config/constants';
import statusAtom, { showStatusMultipleAtom } from '@process/store/atoms/status';
import { MultipleType } from '@process/types/diagram';
import { StatusForm } from '@process/types/process';

export const useStatusCallback = (status: StatusForm, view?: boolean) => {
  const setShowMultiple = useSetRecoilState(showStatusMultipleAtom);

  const onChangeKeyName = useRecoilCallback(
    ({ set }) =>
      (newValue: { [key: string]: OptionValue }) => {
        const targetValue = { ...status, ...newValue };
        set(statusAtom, (old) => {
          const targetIndex = old.findIndex((e) => e.id === status.id);
          return replaceItemAtIndex(old, targetIndex, targetValue);
        });
      },
    [status]
  );

  const onChangeDirection = useRecoilCallback(
    ({ set, snapshot }) =>
      (newValue: OptionValue) => {
        let changeValue = {
          direction: newValue,
          order: PROCESS_STATUS_DIRECTIONS_SORT[newValue.keyName],
          multiple: 'MULTIPLE_NONE' as MultipleType,
          primary: false
        };
        // Case of forward, It can add up to 3.
        if (newValue.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
          const forwardCount = snapshot
            .getLoadable(statusAtom)
            .getValue()
            .filter((status) => status.direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT').length;
          if (forwardCount >= 3) {
            alert('Forward Direction can only add until 3');
            return;
          }
          const forwardValue = snapshot
            .getLoadable(statusAtom)
            .getValue()
            .find((e) => e.direction.keyName === newValue.keyName);
          if (forwardValue) {
            if (forwardValue.multiple == 'MULTIPLE_NONE') {
              setShowMultiple(true);
              if (!view) {
                changeValue.primary = true;
              }
            } else {
              changeValue.multiple = forwardValue.multiple;
            }
          }
        }
        set(statusAtom, (old) => {
          const targetIndex = old.findIndex((e) => e.id === status.id);
          const targetValue = {
            ...old[targetIndex],
            ...changeValue
          };
          return _.orderBy(replaceItemAtIndex(old, targetIndex, targetValue), ['order', 'primary', 'sequence'], ['asc', 'desc', 'asc']);
        });
      },
    [status, view]
  );

  const onChangeStatus = useRecoilCallback(
    ({ set }) =>
      (newValue: { [key: string]: string }) => {
        const targetValue = { ...status, ...newValue };
        set(statusAtom, (old) => {
          const targetIndex = old.findIndex((e) => e.id === status.id);
          console.log('targetIndex', targetIndex);
          return replaceItemAtIndex(old, targetIndex, targetValue);
        });
      },
    [status]
  );

  const onSequenceChange = useRecoilCallback(
    ({ set }) =>
      (newValue: OptionValue, index: number) => {
        set(statusAtom, (old) => {
          const targetIndex = old.findIndex((e) => e.id === status.id);
          const newOpt = _.cloneDeep(old[targetIndex].sequence);
          newOpt[index] = newValue.keyName;
          const targetValue = { ...status, sequence: newOpt };
          return replaceItemAtIndex(old, targetIndex, targetValue);
        });
      },
    [status]
  );

  const onSequenceAdd = useRecoilCallback(
    ({ set }) =>
      () => {
        set(statusAtom, (old) => {
          const targetIndex = old.findIndex((e) => e.id === status.id);
          const newOpt = _.cloneDeep(old[targetIndex].sequence);
          newOpt.push('2');
          const targetValue = { ...status, sequence: newOpt };
          return replaceItemAtIndex(old, targetIndex, targetValue);
        });
      },
    [status]
  );

  const onSequenceDelete = useRecoilCallback(
    ({ set }) =>
      () => {
        set(statusAtom, (old) => {
          const targetIndex = old.findIndex((e) => e.id === status.id);
          const newOpt = _.cloneDeep(old[targetIndex].sequence);
          newOpt.pop();
          const targetValue = { ...status, sequence: newOpt };
          return replaceItemAtIndex(old, targetIndex, targetValue);
        });
      },
    [status]
  );

  const onChangeMultiplePrimary = useRecoilCallback(
    ({ set }) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const {
          currentTarget: { value }
        } = e;

        set(statusAtom, (old) => {
          const newValues = old.map((e) => {
            if (value == 'yes' && e.id == status.id) {
              return { ...status, ...{ primary: true } };
            } else {
              return { ...status, ...{ primary: false } };
            }
          });
          return _.orderBy(newValues, ['order', 'primary', 'sequence'], ['asc', 'desc', 'asc']);
        });
      },
    [status]
  );

  const onReset = useRecoilCallback(
    ({ set }) =>
      () => {
        if (status.new) {
          set(statusAtom, (old) => {
            return old.filter((e) => e.id !== status.id);
          });
        }
      },
    [status]
  );

  return {
    onChangeKeyName,
    onChangeDirection,
    onChangeStatus,
    onSequenceChange,
    onSequenceAdd,
    onSequenceDelete,
    onChangeMultiplePrimary,
    onReset
  };
};
