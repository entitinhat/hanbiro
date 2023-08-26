import { useCallback, useEffect, useState } from 'react';

//third-party
import { Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

//project
import NumberField from '@base/components/@hanbiro/NumberField';
import CurrencySelect from '@base/components/@hanbiro/CurrencySelect';
import { Currency } from '@base/types/common';
import { defaultCurrencySelector } from '@base/store/selectors/app';

//menu
import Section from '@settings/preferences/components/Section';
import { useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';

interface CostProps {
  data: any;
}

const Cost = (props: CostProps) => {
  const { data } = props;
  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);
  const [value, setValue] = useState<any>({
    email: { amount: 0, currency: defaultCurrency?.code },
    sms: { amount: 0, currency: defaultCurrency?.code }
  });
  //const theme = useTheme();
  //const { t } = useTranslation();
  const mSettingUpdate = useMenuSettingUpdate();

  //init value
  useEffect(() => {
    if (data) {
      if (JSON.stringify(data) !== JSON.stringify(value)) {
        setValue(data);
      }
    }
  }, [data]);

  //save item
  const handleSave = (newData: any) => {
    const params: any = {
      menu: 'marketing',
      key: 'campaign_cost',
      value: JSON.stringify(newData)
    };
    mSettingUpdate.mutate({ menuSetting: params });
  };

  //value change
  const handleValueChange = (keyField: string, keyAttr: string, keyValue: number | string) => {
    const newValue = { ...value };
    newValue[keyField][keyAttr] = keyValue;
    setValue(newValue);
    //save
    if (keyAttr === 'currency') {
      handleSave(newValue);
    }
  };

  //input blur
  const handleBlur = () => {
    handleSave(value);
  };

  console.log('cost value', value);
  return (
    <Section header="Cost">
      <Stack p={2} spacing={1}>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ flexBasis: '15%' }}>Email</Typography>
          <NumberField
            sx={{ flexBasis: '40%', mr: 1 }}
            //thousandSeparator=","
            value={value.email.amount || 0}
            onChange={(nVal: string | number) => handleValueChange('email', 'amount', Number(nVal))}
            onBlur={handleBlur}
          />
          <Stack direction="row" alignItems="center" flexBasis="20%">
            <CurrencySelect
              value={value.email.currency}
              onChange={(nVal: Currency) => handleValueChange('email', 'currency', nVal.code || '')}
            />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography sx={{ flexBasis: '15%' }}>SMS</Typography>
          <NumberField
            sx={{ flexBasis: '40%', mr: 1 }}
            //thousandSeparator=","
            value={value.sms.amount || 0}
            onChange={(nVal: string | number) => handleValueChange('sms', 'amount', Number(nVal))}
            onBlur={handleBlur}
          />
          <Stack direction="row" alignItems="center" flexBasis="20%">
            <CurrencySelect
              value={value.sms.currency}
              onChange={(nVal: Currency) => handleValueChange('sms', 'currency', nVal.code || '')}
            />
          </Stack>
        </Stack>
      </Stack>
    </Section>
  );
};

export default Cost;
