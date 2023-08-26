import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OptionValue } from '@base/types/common';
import { numberFormat } from '@base/utils/helpers';
import { projectSettingSelector } from '@project/store/selectors/setting';
import { SettingType } from '@project/types/setting';
import { currencySettingSelector } from '@base/store/selectors/app';

interface editProps {
  type: SettingType;
  value: OptionValue;
  componentProps?: any;
  onChange: (val: OptionValue) => void;
}

function Edit(props: editProps) {
  const { type, value, onChange, componentProps } = props;
  const [option, setOption] = useState<OptionValue>(value);
  const settings = useRecoilValue(projectSettingSelector(type ?? componentProps.type));
  const settingCurrency = useRecoilValue(currencySettingSelector);

  const options = useMemo(
    () =>
      settings.map((v) => {
        let label = v.name;
        if (type == 'TYPE_COST') {
          let currency = '';
          if (settingCurrency && settingCurrency.usedCurrencies) {
            const findCurrency = settingCurrency.usedCurrencies.find((_v) => v.name == _v.code);
            if (findCurrency) {
              currency = findCurrency?.currencySymbol;
            }
          }
          label = `${label} (${currency} ${numberFormat(Number(v.meta?.cost))})`;
        }
        return { keyName: v.id, languageKey: label };
      }),
    [settings]
  );

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(option)) {
        setOption(value);
      }
    }
  }, [value]);

  return (
    <>
      <SelectBox value={option} options={options} onChange={onChange} />
    </>
  );
}

export default Edit;
