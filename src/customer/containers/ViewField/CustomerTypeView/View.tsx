import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { default as TextView } from '@base/containers/ViewField/Text/View';
import { Customer } from '@customer/types/interface';
import * as keyNames from '@customer/config/keyNames';
import { useSelectionFieldItems } from '@settings/general/hooks/useSelectionFieldItems';
import { FieldOption } from '@settings/general/types/interface';

interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  const { data: fieldsData, isFetching: isFieldLoading } = useSelectionFieldItems(
    { keyName: componentProps?.sourceKey },
    { enabled: componentProps?.sourceType === 'field' && componentProps?.sourceKey.length > 0 }
  );

  return (
    <>{(fieldsData && t(fieldsData?.data?.find((v: FieldOption) => v.keyName === value?.keyName)?.languageKey || '')) || <em>(none)</em>}</>
  );
};

export default View;
