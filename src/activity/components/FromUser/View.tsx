import { UserOrCustomer } from '@activity/types/activity';
import { Stack, Chip } from '@mui/material';
import { isArray } from 'lodash';

interface ViewProps {
  value: UserOrCustomer[];
  mode?: 'phone' | 'email';
}

function FromUserView(props: any) {
  const { value, mode } = props;
  console.log(`~~~~ valueUser View`, props);
  return (
    <>
      {mode ? (
        <></>
      ) : (
        <Stack direction={'row'} spacing={0.5}>
          {value?.length > 0 && isArray(value) && value.map((item: UserOrCustomer) => <Chip key={item.id} label={item.name} />)}
        </Stack>
      )}
    </>
  );
}

export default FromUserView;
