import { useTranslation } from 'react-i18next';
import { FieldOption } from '@settings/general/types/interface';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

interface ViewProps extends CommonViewProps {
  value?: FieldOption | FieldOption[] | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value } = props;
  //console.log('view value', value);

  let sValue = Array.isArray(value) ? value.map((_ele: FieldOption) => t(_ele?.languageKey)).join(', ') : t(value?.languageKey || '');

  return <>{sValue ? sValue : ''}</>;
};

export default View;
