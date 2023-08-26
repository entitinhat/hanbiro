import { SelectBox } from '@base/config/write-field/components';
import { OptionValue } from '@base/types/common';

import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: OptionValue;
  options: OptionValue[];
  onChange: (params: any) => {};
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  const options = componentProps?.options ?? [];

  return <SelectBox value={value} options={options} onChange={onChange} />;
};

export default Edit;
