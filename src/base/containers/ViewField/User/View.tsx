import _ from 'lodash';

import { Chip, Stack } from '@mui/material';
import { AssignToName } from '@base/types/user';

interface ViewProps {
  value: AssignToName[] | AssignToName;
}

function UserView(props: ViewProps) {
  const { value } = props;

  console.log('user value', value)
  return (
    <>
      {value && (
        <Stack spacing={1} direction="row" alignItems="center">
          {_.isArray(value) ? (
            value.map((v) => <Chip key={v.user?.id} label={v.user?.name || ''} variant="combined" color="secondary" />)
          ) : (
            <Chip label={value.user?.name || ''} variant="combined" color="secondary" />
          )}
        </Stack>
      )}
    </>
  );
}

export default UserView;
