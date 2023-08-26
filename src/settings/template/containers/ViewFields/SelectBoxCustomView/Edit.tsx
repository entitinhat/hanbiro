import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
interface EditProps {
  value: any;
  componentProps: any;
  onChange: (val: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return <SelectBoxCustom value={value} {...componentProps} onChange={onChange} />;
};

export default Edit;
