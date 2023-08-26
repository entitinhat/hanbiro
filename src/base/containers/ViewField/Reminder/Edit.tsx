import Reminder, { ReminderState } from '@base/components/@hanbiro/Reminder';
import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: ReminderState;
  onChange: (val: ReminderState) => void;
}

const defaultValue: ReminderState = {
  use: false,
  notify: 'NOTIFY_EMAIL',
  end: 15
};

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <Reminder value={value ?? defaultValue} onChange={onChange} />;
};

export default Edit;
