import SiteAutocomplete from '../../SiteAutocomplete';

const Edit = (props: any) => {
  const { value, errors, componentProps, onChange } = props;

  return <SiteAutocomplete {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
