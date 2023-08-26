import StatusOnTime from '@base/components/@hanbiro/StatusOnTime';
import StatusOverdue from '@base/components/@hanbiro/StatusOverdue';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { convertUTCDateToNormalDate } from '@base/utils/helpers/dateUtils';
import { CalculateOverdueDay, CheckOnTime } from '@desk/ticket/utils/helper';
import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { showResponseDue } from '../atom';

interface ViewProps {
  value: string;
}

const View = (props: ViewProps) => {
  const { value } = props;
  // console.log('🚀 ~ file: View.tsx:13 ~ View ~ value:', value);

  // const statusClss = CheckOnTime(value) ? 'status-on-time' : 'status-overdue';
  const strDate = convertDateTimeServerToClient({
    date: value,
    formatInput: '',
    formatOutput: '',
    isTime: true,
    humanize: false
  });
  // console.log('🚀 ~ file: View.tsx:25 ~ View ~ strDate:', strDate);

  const responseDue = useRecoilValue(showResponseDue);

  const responseDueConvert = convertDateTimeServerToClient({
    date: responseDue,
    formatInput: '',
    formatOutput: '',
    isTime: true,
    humanize: false
  });
  // console.log('🚀 ~ file: View.tsx:35 ~ View ~ responseDueConvert:', responseDueConvert);
  const overDueDays = CalculateOverdueDay(strDate !== null ? strDate : '', responseDueConvert !== null ? responseDueConvert : '');
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <span>{convertUTCDateToNormalDate(value)}</span>
        {/* {CheckOnTime(value) ? (
          ''
        ) : ( */}
        <Box component="span" sx={{ marginLeft: 1, color: 'red' }}>
          Overdue {overDueDays} {overDueDays > 1 ? 'days' : 'day'}
        </Box>
        {/* )} */}
        {/* {CheckOnTime(value) ? <StatusOnTime sx={{ marginRight: '20px' }} /> : <StatusOverdue sx={{ marginRight: '20px' }} />} */}
      </Box>
    </>
  );
};

export default View;
