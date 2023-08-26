import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';
import TextView from '@base/containers/ViewField/Text/View';
import { useRecoilValue } from 'recoil';
import { defaultCurrencySelector } from '@base/store/selectors/app';
import { moneyFormat } from '@base/utils/helpers';
interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  const prefix = value?.fCurrency?.code || defaultCurrency?.code || '$';
  const moneyValue = value?.moneyValue;

  return <TextView value={`${prefix + ' '}${moneyFormat(moneyValue?.toString() || '0')}`} />;
};

export default View;
