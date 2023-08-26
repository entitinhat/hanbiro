import { useState } from 'react';

import LoadingButton from '@base/components/@extended/LoadingButton';
import { SET_TIMEOUT } from '@base/config/constant';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { User } from '@base/types/user';
import { Box, Button, Divider, Stack } from '@mui/material';
import { queryKeys } from '@project/config/queryKeys';
import useProjectMutation from '@project/hooks/useProjectMutation';
import { AssignRole } from '@project/types/project';
import { useQueryClient } from '@tanstack/react-query';

import Member from './';

export const MemberQuickView = (props: QuickViewComponentProps) => {
  console.log('memberQuickView', props);
  const [value, setValue] = useState(props.data);
  const queryClient = useQueryClient();

  const onChange = (success: boolean) => {
    if (success) {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.getProject]);
      }, SET_TIMEOUT);
    }
    props.onClose && props.onClose();
  };

  const {
    mUpdateProject: { mutate: updateProject, isLoading }
  } = useProjectMutation({ onChange });

  const handleOnChange = (val: AssignRole[]) => {
    setValue(val);
  };

  const handleOnSave = () => {
    updateProject({
      project: {
        id: props.id,
        members: value.map((_v: AssignRole) => {
          return {
            id: _v.id,
            role: _v.role,
            fields: _v.fields.map((_f) => {
              return {
                field: _f.field,
                assignTo: _f.assignTo.map((_j: User) => {
                  const group = _j.properties?.crmBaseGroup ?? { id: '', name: '' };
                  return {
                    user: {
                      id: _j.id,
                      name: _j.name
                    },
                    group: {
                      id: group.id,
                      name: group.name
                    }
                  };
                })
              };
            })
          };
        })
      }
    });
  };

  return (
    <Stack spacing={1}>
      <Box sx={{ p: 1 }}>
        <Member value={value} onChange={handleOnChange} />
      </Box>
      <Divider />
      <Stack sx={{ px: 1, pb: 1 }} direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
        <Button size="small" variant="outlined" color="secondary" onClick={() => props.onClose && props.onClose()}>
          Cancel
        </Button>
        <LoadingButton variant="contained" color={'primary'} loading={isLoading} disabled={isLoading} onClick={handleOnSave}>
          Save
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default withTextAndPreviewModal(MemberQuickView, { title: 'Assigned Rep' });
