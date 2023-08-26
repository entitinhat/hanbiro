import OnetimeTable from "@settings/template/quote/containers/OnetimeTable";

interface EditProps {
  value: any;
  componentProps: any;
  onChange: (val: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  const handleChange = (value: any) => {
    onChange && onChange(value);
  };
  return <OnetimeTable value={value} {...componentProps} onChange={handleChange} />;
};

export default Edit;
