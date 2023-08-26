import DateSelector from '../../DateSelector';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { Customer } from '@customer/types/interface';
import { IdName } from '@base/types/common';
import Tags from '@desk/knowledge-base/containers/ViewFields/Tags/Tags';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: IdName | IdName[]) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return (
    <>
      {componentProps?.type !== 'customer' ? (
        <Tags
          value={value}
          onChange={(val) => {
            onChange && onChange(val);
          }}
        />
      ) : (
        <CustomerAutoComplete
          single
          addAll
          value={value}
          onChange={(val) => {
            const nUser = val as Customer;
            onChange &&
              onChange({
                id: nUser?.id,
                name: nUser?.name
              });
          }}
        />
      )}
    </>
  );
};

export default Edit;
