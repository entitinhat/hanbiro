import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { convertDateTimeServerToClient } from '@base/utils/helpers';

import { Box, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { CheckOnTime } from '@desk/ticket/utils/helper';
import StatusOnTime from '@base/components/@hanbiro/StatusOnTime';
import StatusOverdue from '@base/components/@hanbiro/StatusOverdue';
import { showResponseDue } from '../atom';
import { useSetRecoilState } from 'recoil';
import { convertUTCDateToNormalDate } from '@base/utils/helpers/dateUtils';
interface ViewProps extends CommonViewProps {
  value: string;
}

const View = (props: ViewProps) => {
  const { value } = props;
  // const statusClss = CheckOnTime(value) ? 'status-on-time' : 'status-overdue';
  // const strDate = convertDateTimeServerToClient({
  //   date: value,
  //   formatInput: '',
  //   formatOutput: '',
  //   isTime: true,
  //   humanize: false
  // });
  // const setResponseDue = useSetRecoilState(showResponseDue);
  // setResponseDue(value);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {/* {CheckOnTime(value) ? <StatusOnTime sx={{ marginRight: '20px' }} /> : <StatusOverdue sx={{ marginRight: '20px' }} />} */}
        <span>{convertUTCDateToNormalDate(value)}</span>
      </Box>
    </>
  );
};

export default View;
