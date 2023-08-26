import SurveyAutocomplete from '../../SurveyAutocomplete';

const Edit = (props: any) => {
  const { value, errors, componentProps, onChange } = props;

  return <SurveyAutocomplete {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
