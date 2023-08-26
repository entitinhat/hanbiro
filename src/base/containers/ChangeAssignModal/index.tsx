import React, { useMemo, useState } from 'react';

import { Delete, Save } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';

import MiModal from '@base/components/@hanbiro/MiModal';
import MainCard from '@base/components/App/MainCard';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { User } from '@base/types/user';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import NoData from '@base/components/@hanbiro/NoData';

export enum modeKeyNames {
  ADD_ASSIGN = 'ADD_ASSIGN',
  CHANGE_ASSIGN = 'CHANGE_ASSIGN',
  DELETE_ASSIGN = 'DELETE_ASSIGN'
}

interface ChangeAssignProps {
  isOpen: boolean;
  mode: modeKeyNames.ADD_ASSIGN | modeKeyNames.DELETE_ASSIGN | modeKeyNames.CHANGE_ASSIGN;
  onClose: () => void;
  isSaving: boolean;
  assignReps?: User[];
  onChange?: (mode: string, params: any) => void;
}

const ChangeAssignModal = (props: ChangeAssignProps) => {
  const { isOpen, mode, onClose, isSaving, assignReps, onChange } = props;

  const [selectedReps, setSelectedReps] = useState<User[]>([]);
  const [fromRep, setFromRep] = useState<User>();
  const [toRep, setToRep] = useState<User>();

  // select user
  const handleSelectUser = (selected: User | User[] | null) => {
    if (selected && !Array.isArray(selected)) {
      const newReps = [...selectedReps];
      const fIdx = newReps.findIndex((_ele: User) => _ele.id === selected.id);
      if (fIdx === -1) {
        newReps.push(selected);
        setSelectedReps(newReps);
      }
    }
  };

  // remove selected
  const handleRemove = (repId: string) => {
    if (repId) {
      const newReps = [...selectedReps];
      const fIdx = newReps.findIndex((_ele: User) => _ele.id === repId);
      if (fIdx > -1) {
        newReps.splice(fIdx, 1);
        setSelectedReps(newReps);
      }
    }
  };

  // change from rep
  const handleOnChangeFrom = (from: User | User[] | null) => {
    setFromRep(from as User);
  };

  // change to rep
  const handleOnChangeTo = (to: User | User[] | null) => {
    setToRep(to as User);
  };

  // on save
  const handleOnSave = () => {
    let params: any = {};
    if (mode == modeKeyNames.DELETE_ASSIGN) {
      params = {
        refIds: selectedReps?.map((assign: User) => assign?.id)
      };
    } else if (mode == modeKeyNames.ADD_ASSIGN) {
      let newAssignTo: any[] = [];
      selectedReps?.map((assign: User) => {
        if (assign?.id != '') {
          newAssignTo.push({
            user: {
              id: assign?.id,
              name: assign?.name
            },
            group: {}
          });
        }
      });
      params = {
        assignTo: newAssignTo
      };
    } else if (mode == modeKeyNames.CHANGE_ASSIGN) {
      params = {
        from: {
          user: {
            id: fromRep?.id,
            name: fromRep?.name
          },
          group: {}
        },
        to: {
          user: {
            id: toRep?.id,
            name: toRep?.name
          },
          group: {}
        }
      };
    }
    onChange && onChange(mode, params);
  };

  const getDisableSave = (): boolean => {
    if (mode === modeKeyNames.ADD_ASSIGN || mode === modeKeyNames.DELETE_ASSIGN) {
      return selectedReps?.length <= 0;
    } else if (mode === modeKeyNames.CHANGE_ASSIGN) {
      return !fromRep || fromRep?.id == '' || !toRep || toRep?.id == '';
    }
    return true;
  };

  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color={'primary'}
              loading={isSaving}
              disabled={isSaving || getDisableSave()}
              loadingPosition="start"
              startIcon={<Save />}
              onClick={handleOnSave}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isSaving, mode, selectedReps, fromRep, toRep]);

  const AddAssign = useMemo(() => {
    return (
      <>
        <Stack>
          <UserAutoComplete showAvatar={true} single={true} visible={false} onChange={handleSelectUser} />
        </Stack>
        <Stack>
          <Box className="scroll-box" sx={{ maxHeight: 300 }}>
            <List>
              {selectedReps.map((_rep: User) => (
                <ListItem
                  key={_rep.id}
                  divider
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(_rep.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <IconAvatar url={_rep.photo} alt={_rep.name} />
                  </ListItemAvatar>
                  <ListItemText primary={_rep.name} />
                </ListItem>
              ))}
              {selectedReps.length === 0 && <NoData icon="PeopleOutline" label="Choose assigned rep(s) to assign" />}
            </List>
          </Box>
        </Stack>
      </>
    );
  }, [selectedReps]);

  const ChangeAssign = useMemo(() => {
    return (
      <Stack spacing={2}>
        <Stack spacing={1}>
          {`From`}
          <UserAutoComplete showAvatar={true} single={true} options={assignReps} visible={true} onChange={handleOnChangeFrom} />
        </Stack>
        <Stack spacing={1}>
          {`To`}
          <UserAutoComplete showAvatar={true} single={true} visible={true} onChange={handleOnChangeTo} />
        </Stack>
      </Stack>
    );
  }, [assignReps]);

  const DeleteAssign = useMemo(() => {
    return (
      <>
        <Stack>
          <UserAutoComplete showAvatar={true} single={true} options={assignReps} visible={false} onChange={handleSelectUser} />
        </Stack>
        <Stack>
          <Box className="scroll-box" sx={{ maxHeight: 300 }}>
            <List>
              {selectedReps.map((_rep: User) => (
                <ListItem
                  key={_rep.id}
                  divider
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(_rep.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <IconAvatar url={_rep.photo} alt={_rep.name} />
                  </ListItemAvatar>
                  <ListItemText primary={_rep.name} />
                </ListItem>
              ))}
              {selectedReps.length === 0 && <NoData icon="PeopleOutline" label="Choose assigned rep(s) to remove" />}
            </List>
          </Box>
        </Stack>
      </>
    );
  }, [assignReps, selectedReps]);

  const title =
    mode === modeKeyNames.CHANGE_ASSIGN ? 'Change assign(s)' : mode === modeKeyNames.ADD_ASSIGN ? 'Add assign(s)' : 'Delete assign(s)';

  return (
    <MiModal title={<SpanLang keyLang={title} />} isOpen={isOpen} size="xs" fullScreen={false} onClose={onClose} footer={Footer}>
      <MainCard sx={{ m: 1 }}>
        {mode === modeKeyNames.ADD_ASSIGN && AddAssign}
        {mode === modeKeyNames.CHANGE_ASSIGN && ChangeAssign}
        {mode === modeKeyNames.DELETE_ASSIGN && DeleteAssign}
      </MainCard>
    </MiModal>
  );
};

export default ChangeAssignModal;
