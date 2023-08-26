import { useEffect, useMemo, useState } from 'react';

//project
import LoadingButton from '@base/components/@extended/LoadingButton';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import { User } from '@base/types/user';
import IconButton from '@base/components/@extended/IconButton';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import NoData from '@base/components/@hanbiro/NoData';

//material
import { ClearOutlined } from '@mui/icons-material';
import { Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const ListWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
ListWrapper.displayName = 'ListWrapper';

interface AssignRepProps {
  title: string;
  isOpen: boolean;
  loading?: boolean;
  visibleSelect?: boolean;
  value?: User[];
  onClose: () => void;
  onChange: (val: User[]) => void;
}

const AssignRepModal = (props: AssignRepProps) => {
  const { isOpen, title, value = [], visibleSelect, onClose, onChange, loading = false } = props;
  //const theme = useTheme();

  //state
  const [selectedReps, setSelectedReps] = useState<User[]>([]);

  //init selected reps
  useEffect(() => {
    if (value.length > 0) {
      const repIds = value.map((_rep: User) => _rep.id);
      const selectedIds = selectedReps.map((_ele: User) => _ele.id);
      if (repIds.join(',') !== selectedIds.join(',')) {
        setSelectedReps(value);
      }
    } else {
      setSelectedReps([]);
    }
  }, [value]);

  //select user
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

  //remove selected
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

  //buttons
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <LoadingButton
              size="small"
              sx={{ p: '3px 9px' }} //add this if using size small
              variant="contained"
              color={'primary'}
              loading={loading}
              onClick={() => onChange && onChange(selectedReps)}
            >
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [selectedReps, loading]);

  //console.log('selectedReps', selectedReps);
  return (
    <MiModal title={<SpanLang keyLang={title} />} isOpen={isOpen} size="xs" fullScreen={false} onClose={onClose} footer={Footer}>
      <MainCard sx={{ m: 1 }}>
        {visibleSelect && (
          <Stack>
            <UserAutoComplete showAvatar={true} single={true} visible={false} value={[]} onChange={handleSelectUser} />
          </Stack>
        )}
        <Stack>
          <ListWrapper>
            <List>
              {selectedReps.map((_rep: User) => (
                <ListItem
                  key={_rep.id}
                  divider
                  secondaryAction={
                    <IconButton size="small" color="error" edge="end" aria-label="delete" onClick={() => handleRemove(_rep.id)}>
                      <ClearOutlined fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <IconAvatar url={_rep.photo} alt={_rep.name} />
                  </ListItemAvatar>
                  <ListItemText primary={_rep.name} />
                </ListItem>
              ))}
              {selectedReps.length === 0 && <NoData icon="PeopleOutline" label="No assigned rep(s) found" />}
            </List>
          </ListWrapper>
        </Stack>
      </MainCard>
    </MiModal>
  );
};

export default AssignRepModal;
