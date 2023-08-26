import _ from 'lodash';
import React, { useMemo } from 'react';

import useSequenceMutation from '@activity/hooks/useSequenceMutation';
import { TaskSequence } from '@activity/types/task';
import HanPopper from '@base/components/@hanbiro/Popper';
import { Close, CloseOutlined, CommentOutlined, DeleteOutlineOutlined, Edit, EditOutlined, Save, SaveOutlined } from '@mui/icons-material';
import { Checkbox, Chip, IconButton, Stack, TableCell, TextField, Typography } from '@mui/material';
import { UserAutoComplete } from '@activity/config/write-field/components';
import { Duration } from '@base/config/write-field/components';
import { User } from '@base/types/user';
import { useRecoilCallback } from 'recoil';
import { sequenceAtom } from '@activity/store/atoms/task';
import { replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { DurationOptions, parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import MainCard from '@base/components/App/MainCard';
import useSnackBar from '@base/hooks/useSnackBar';
import DurationSelect from '@base/components/@hanbiro/DurationSelect';
import { useTranslation } from 'react-i18next';

interface SequenceItemProps {
  item: TaskSequence;
  seq: number;
  mode?: 'write' | 'view';
  sourceId?: string;
  onChange?: (val: TaskSequence[]) => void;
  allChecked?: boolean;
}

function SequenceItem(props: SequenceItemProps) {
  const { enqueueInfoBar } = useSnackBar();
  const { item, mode = 'write', sourceId, onChange, seq, allChecked = false } = props;
  // const itemMode = mode == 'view' ? (item.editFlag || item.newFlag ? 'write' : 'view') : 'write';
  const { mutationAdd, mutationDelete, mutationUpdate } = useSequenceMutation({
    item,
    onChange
  });

  const workers = item?.workers?.map((worker) => worker.user?.name).join(',');
  const { t } = useTranslation();
  const handleRemoveRow = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        if (item.editFlag) {
          handleValueChange('editFlag', false);
        } else {
          const items = snapshot.getLoadable(sequenceAtom).contents as TaskSequence[];
          const newItems = items.filter((ele) => ele.id !== item.id);
          set(sequenceAtom, newItems);
          onChange && onChange(newItems);

          if (!item.newFlag && mode == 'view') {
            // run delete mutatation
            // console.log('run delete mutation');
            mutationDelete({ id: sourceId!!, refId: item.id });
          }
        }
      },
    [item, mode]
  );

  const handleValueChange = useRecoilCallback(
    ({ set, snapshot }) =>
      (key: keyof TaskSequence, val: any | any[]) => {
        const items = snapshot.getLoadable(sequenceAtom).contents as TaskSequence[];
        const targetIndex = items.findIndex((v) => v.id == item.id);
        if (key == 'done') {
          if (targetIndex != 0 && !items[targetIndex - 1]?.done) {
            enqueueInfoBar('You should check in order.');
            return;
          }
        }
        const targetValue = { ...item, done: allChecked, [key]: val };
        const newItems = replaceItemAtIndex(items, targetIndex, targetValue);
        set(sequenceAtom, newItems);
        onChange && onChange(newItems);
        if (key == 'done' && mode == 'view') {
          let updateData: any = {
            id: sourceId,
            sequence: {
              id: item.id,
              done: val
            }
          };
          const completed = items.filter((v) => v.done).length;
          if (completed + 1 == items.length) {
            updateData.sequence.completed = true;
          }
          mutationUpdate(updateData);
        }
      },
    [item]
  );

  // integrate with save api
  const onSave = () => {
    // api : newFlag : true - create, newFlag: false - edit
    let updateItem = _.clone(item);
    delete updateItem.newFlag;
    delete updateItem.editFlag;
    delete updateItem.done;
    delete updateItem.doneTime;
    if (item.newFlag) {
      mutationAdd({ id: sourceId!!, sequence: updateItem });
    } else {
      mutationUpdate({ id: sourceId!!, sequence: updateItem });
    }
  };

  const renderItemWrite = useMemo(() => {
    return (
      <>
        <TableCell>
          <Stack spacing={0.5} direction="row" alignItems="center">
            <TextField
              required
              size="small"
              fullWidth
              value={item.title}
              onChange={(e) => handleValueChange('title', e.currentTarget.value)}
            />
          </Stack>
        </TableCell>
        <TableCell>
          <DurationSelect
            size="small"
            options={_.clone(DurationOptions).splice(1, 4)}
            value={{ duration: Number(item.duration.time), durationUnit: item.duration.unit }}
            onChange={(val) => {
              const newDuration = {
                time: val.duration,
                unit: val.durationUnit
              };
              handleValueChange('duration', newDuration);
            }}
          />
        </TableCell>
        <TableCell>
          <UserAutoComplete
            size="small"
            value={item.workers?.map((v) => ({ id: v.user.id, name: v.user.name }))}
            onChange={(user: User | User[] | null) => {
              const users = _.isArray(user) ? user : [user];
              const newWorkers = users?.map((_ele: any) => ({
                user: { id: _ele.id, name: _ele.name },
                group: { id: '', name: '' }
              }));
              handleValueChange('workers', newWorkers);
            }}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            fullWidth
            size="small"
            placeholder={t('ncrm_activity_enter_comment') as string}
            defaultValue={item.instruction}
            onChange={(e) => handleValueChange('instruction', e.currentTarget.value)}
          />
          {/* <HanPopper icon={<CommentOutlined fontSize="small" />}>
            <TextField
              fullWidth
              multiline
              sx={{ width: 300 }}
              rows={5}
              placeholder="Enter comment"
              defaultValue={item.instruction}
              onChange={(e) => handleValueChange('instruction', e.currentTarget.value)}
            />
          </HanPopper> */}
        </TableCell>
        <TableCell align="center">
          {mode == 'view' && (
            <IconButton size="small" color="primary" onClick={onSave}>
              <SaveOutlined fontSize="small" />
            </IconButton>
          )}
          <IconButton size="small" color="error" onClick={handleRemoveRow}>
            <DeleteOutlineOutlined fontSize="small" />
          </IconButton>
        </TableCell>
      </>
    );
  }, [item]);

  const renderItemView = useMemo(() => {
    return (
      <>
        <TableCell>
          <Stack spacing={0.5}>
            <Stack spacing={0.5} direction="row" alignItems="center">
              {/* <Checkbox
                defaultChecked={item.done}
                disabled={item.done}
                color="secondary"
                onChange={(e) => handleValueChange('done', e.currentTarget.checked)}
              />
              <Typography color="secondary">#{seq + 1}</Typography> */}
              <Typography variant="body1">{item.title}</Typography>
            </Stack>
            {item.done && (
              <Typography variant="body2" color="textPrimary" sx={{ ml: 4 }}>
                {convertDateTimeServerToClient({
                  date: item.doneTime,
                  isTime: true,
                  humanize: true
                })}
              </Typography>
            )}
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1">
            {parseDurationValueToString({
              durationUnit: item.duration.unit,
              duration: item.duration.time
            })}
          </Typography>
        </TableCell>
        <TableCell>
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Typography>{workers}</Typography>
            {/* {item.workers?.map((_ele) => (
              <Chip key={_ele.user?.id} size="small" variant="outlined" label={_ele.user?.name} />
            ))} */}
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Typography color="secondary">{item.instruction}</Typography>
          {/* <HanPopper icon={<CommentOutlined fontSize="small" />}>
            <MainCard sx={{ display: 'flex', minWidth: 250, minHeight: 150 }}>
              <Typography color="secondary">{item.instruction}</Typography>
            </MainCard>
          </HanPopper> */}
        </TableCell>
        {/* <TableCell align="center">
          <Stack spacing={0.3} direction="row">
            {mode == 'view' && (
              <IconButton size="small" color="secondary" onClick={() => handleValueChange('editFlag', true)}>
                <EditOutlined fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" color="error" onClick={handleRemoveRow}>
              <DeleteOutlineOutlined fontSize="small" />
            </IconButton>
          </Stack>
        </TableCell> */}
      </>
    );
  }, [item]);

  return <React.Suspense>{mode == 'write' ? renderItemWrite : renderItemView}</React.Suspense>;
}

export default React.memo(SequenceItem);
