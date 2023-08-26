import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';

import Write from './WaitWrite';
import { OptionValue } from '@base/types/common';

export const TYPE_OPTIONS: OptionValue[] = [
  { keyName: 'WAIT_UNTIL_TRIGGER', languageKey: 'ncrm_process_step_wait_until_rigger' },
  { keyName: 'WAIT_UNTIL_DATE_TIME', languageKey: 'ncrm_process_step_wait_until_date_time' },
  { keyName: 'WAIT_UNTIL_AND_JOIN', languageKey: 'ncrm_process_step_wait_until_and_join' },
  { keyName: 'WAIT_BY_DURATION', languageKey: 'ncrm_process_step_wait_by_duration' },
  { keyName: 'WAIT_SCHEDULE_ATTRIBUTE', languageKey: 'ncrm_process_step_wait_schedule_attribute' }
];

interface WaitProps extends CommonViewFieldProps {}

function WaitViewField(props: WaitProps) {
  return <CommonViewField {...props} componentView={Write} componentEdit={Write} value={props.value} />;
}

export default WaitViewField;
