import _ from 'lodash';
import React, { useMemo } from 'react';

import useChecklistMutation from '@activity/hooks/useChecklistMutation';
import { TaskChecklist } from '@activity/types/task';
import HanPopper from '@base/components/@hanbiro/Popper';
import { CloseOutlined, CommentOutlined, DeleteOutlineOutlined, EditOutlined, SaveOutlined } from '@mui/icons-material';
import { Checkbox, Chip, IconButton, Stack, TableCell, TextField, Typography } from '@mui/material';
import { UserAutoComplete } from '@activity/config/write-field/components';
import { Duration, DurationSelect } from '@base/config/write-field/components';
import { User } from '@base/types/user';
import { useRecoilCallback } from 'recoil';
import { checklistAtom } from '@activity/store/atoms/task';
import { replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { DurationOptions, parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

interface ChecklistItemProps {
  item: TaskChecklist;
  mode?: 'write' | 'view';
  sourceId?: string;
  onChange?: (val: TaskChecklist[]) => void;
  allChecked?: boolean;
}

function ChecklistItem(props: ChecklistItemProps) {
  const { item, mode = 'write', sourceId, onChange, allChecked = false } = props;
  const { t } = useTranslation();

  // const itemMode = mode == 'view' ? (item.editFlag || item.newFlag ? 'write' : 'view') : 'write';
  const { mutationAdd, mutationDelete, mutationUpdate } = useChecklistMutation({
    item,
    onChange
  });

  const workers = item?.workers?.map((worker) => worker.user?.name).join(',');

  const handleRemoveRow = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        if (item.editFlag) {
          handleValueChange('editFlag', false);
        } else {
          const items = snapshot.getLoadable(checklistAtom).contents as TaskChecklist[];
          const newItems = items.filter((ele) => ele.id !== item.id);
          set(checklistAtom, newItems);
          onChange && onChange(newItems);

          if (!item.newFlag && mode == 'view') {
            // run delete mutatation
            mutationDelete({ id: sourceId!!, refId: item.id });
          }
        }
      },
    [item, mode]
  );

  const handleValueChange = useRecoilCallback(
    ({ set, snapshot }) =>
      (key: keyof TaskChecklist, val: any | any[]) => {
        const items = snapshot.getLoadable(checklistAtom).contents as TaskChecklist[];
        const targetIndex = items.findIndex((v) => v.id == item.id);
        const targetValue = { ...item, done: allChecked, [key]: val };
        const newItems = replaceItemAtIndex(items, targetIndex, targetValue);
        set(checklistAtom, newItems);
        onChange && onChange(newItems);
        if (key == 'done' && mode == 'view') {
          let updateData: any = {
            id: sourceId,
            checklist: {
              id: item.id,
              done: val
            }
          };
          const completed = items.filter((v) => v.done).length;
          if (completed + 1 == items.length) {
            updateData.checklist.completed = true;
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
      mutationAdd({ id: sourceId!!, checklist: updateItem });
    } else {
      mutationUpdate({ id: sourceId!!, checklist: updateItem });
    }
  };

  const renderItemWrite = useMemo(() => {
    return (
      <>
        {/* <TableCell>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Checkbox defaultChecked={item.done} disabled={item.done} onChange={(e) => handleValueChange('done', e)} />
          <Typography color="secondary">#{item.id}</Typography>
        </Stack>
      </TableCell> */}
        <TableCell>
          <Stack direction="row" alignItems="center">
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
          <Box maxWidth="200px">
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
          </Box>
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
              placeholder={t('ncrm_activity_enter_comment') as string}
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
                onChange={(e) => handleValueChange('done', e.currentTarget.checked)}
              /> */}
              <Typography variant="body1">{item.title}</Typography>
            </Stack>
            {/* {item.done && (
              <Typography variant="body2" color="textPrimary" sx={{ ml: 4 }}>
                {convertDateTimeServerToClient({
                  date: item.doneTime,
                  isTime: true,
                  humanize: true
                })}
              </Typography>
            )} */}
          </Stack>
        </TableCell>
        <TableCell align="left">
          <Typography>
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
              <Typography fontSize="small" key={_ele.user?.id} color="secondary">
                {_ele.user?.name}
              </Typography>
            ))} */}
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Typography>{item.instruction}</Typography>
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

export default React.memo(ChecklistItem);
