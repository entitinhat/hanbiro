import AssignGroupRep, { ValueProps } from '../../AssignGroupRep';

interface EditProps {
  value: ValueProps;
  onChange: (val: ValueProps) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <AssignGroupRep hideGroupLabel={true} value={value} onChange={onChange} />;
};

export default Edit;
