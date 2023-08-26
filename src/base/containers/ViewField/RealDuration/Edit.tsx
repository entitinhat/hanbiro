import Duration from '@base/components/@hanbiro/Duration';
import { LabelValue } from '@base/types/app';
import { DurationValue } from '@base/types/common';
import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  options?: LabelValue[];
  value: DurationValue;
  onChange: (params: DurationValue) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <Duration value={value} onChange={onChange} />;
};

export default Edit;
