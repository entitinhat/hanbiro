import _ from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import IconButton from '@base/components/@extended/IconButton';
import { Add, CloseOutlined } from '@mui/icons-material';
import { List, ListItem, ListItemText, TextField } from '@mui/material';
import statusAtom from '@process/store/atoms/status';

interface ChecklistWriteProps {
  mode: 'edit' | 'view';
  componentProps?: any;
}

function ChecklistWrite({ mode, componentProps }: ChecklistWriteProps) {
  if (componentProps?.mode) {
    mode = componentProps.mode;
  }

  const [statusesValue, setStatusesValue] = useRecoilState(statusAtom);
  const [name, setName] = useState('');
  console.log('statusesValue', statusesValue);
  const targetIndex = useMemo(() => statusesValue.findIndex((status) => status.property.keyName == 'PROPERTY_TODO_CLOSE'), []);
  let checklist = _.cloneDeep(statusesValue[targetIndex]?.checklist!!);

  const onChangeName = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleAdd = useCallback(() => {
    setStatusesValue((old) => {
      checklist.push({ id: uuidv4(), name: name });
      const targetValue = { ...old[targetIndex], ...{ checklist: checklist } };
      return [...old.slice(0, targetIndex), targetValue, ...old.slice(targetIndex + 1)];
    });
    setName('');
  }, [checklist, targetIndex]);

  const hanldeDelete = useCallback(
    (id: string) => {
      setStatusesValue((old) => {
        const newChecklist = checklist.filter((ck) => ck.id != id);
        const targetValue = { ...old[targetIndex], ...{ checklist: newChecklist } };
        return [...old.slice(0, targetIndex), targetValue, ...old.slice(targetIndex + 1)];
      });
    },
    [checklist, targetIndex]
  );

  console.log('checklist', checklist);

  return (
    <List sx={{ width: '100%', p: 0 }}>
      <>
        {checklist?.map((ck) => {
          return (
            <ListItem disablePadding disableGutters key={ck.id}>
              <ListItemText primary={ck.name} />
              {mode == 'edit' && (
                <IconButton size="small" color="secondary" onClick={() => hanldeDelete(ck.id)}>
                  <CloseOutlined sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </ListItem>
          );
        })}
        {mode == 'edit' && (
          <ListItem disableGutters>
            <TextField
              fullWidth
              size="small"
              value={name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeName(event.target.value)}
            />
            <IconButton sx={{ ml: 1 }} variant="outlined" size="small" color="primary" onClick={handleAdd}>
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </ListItem>
        )}
      </>
    </List>
  );
}

export default ChecklistWrite;
