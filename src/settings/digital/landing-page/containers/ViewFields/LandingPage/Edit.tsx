import LangdingPageAutocomplete from '@settings/digital/landing-page/containers/LandingPageAutocomplete';

const Edit = (props: any) => {
  const { value, errors, componentProps, onChange } = props;

  return <LangdingPageAutocomplete {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
