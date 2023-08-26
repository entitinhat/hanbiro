// mui import
import { Stack, Chip } from '@mui/material';
import { CommonViewProps } from '../Common/interface';

interface Props extends CommonViewProps {
  value: string[];
  
}

const View = (props: Props) => {
  const { value } = props;

  return (
    <Stack direction={'row'} spacing={0.5}>
      {value && value.map((_tag: string) => <Chip key={_tag} label={_tag} />)}
    </Stack>
  );
};

export default View;
