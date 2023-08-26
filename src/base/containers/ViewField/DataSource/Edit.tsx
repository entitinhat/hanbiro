import DataSourceSelect from '@base/containers/DataSourceSelect';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const handleOnChange = (newValue: any) => {
    // console.log('...DataSource.onChange...', newValue);
    onChange && onChange(newValue);
  };

  return (
    <DataSourceSelect
      value={value}
      onChange={handleOnChange}
      sourceMenu={componentProps?.sourceMenu ?? ''}
      sourceKey={componentProps?.sourceKey ?? ''}
      sourceType={componentProps?.sourceType ?? 'setting'}
      {...componentProps}
    />
  );
};

export default Edit;
