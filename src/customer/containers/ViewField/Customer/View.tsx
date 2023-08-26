import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { default as TextView } from '@base/containers/ViewField/Text/View';
import { Customer } from '@customer/types/interface';

interface ViewProps extends CommonViewProps {
  value?: Customer | Customer[] | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <Box>
      {Array.isArray(value) ? value.map((_item: Customer) => _item.name).join(', ') : value?.name ? <TextView value={value.name} /> : ''}
    </Box>
  );
};

export default View;
