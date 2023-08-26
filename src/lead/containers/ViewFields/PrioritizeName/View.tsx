import { Stack, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { CrownOutlined } from '@ant-design/icons';

interface Props extends CommonViewProps {
  value: any | null;
}

const View = (props: Props) => {
  const { value } = props;

  return <Stack direction={'row'} spacing={1}>
            <Typography sx={{ wordBreak: 'break-all' }}>{value?.name} </Typography>
            {value?.isPrioritize && 
                <CrownOutlined style={{ color: '#FAAD14', fontSize: '1.2rem' }} />
            }
        </Stack>
};

export default View;
