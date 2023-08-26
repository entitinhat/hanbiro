import Icon from '@base/assets/icons/svg-icons';
import { OptionValue } from '@base/types/common';
import { useEffect, useState } from 'react';
import AutoCompleteCustom from '@base/components/@hanbiro/Autocomplete';
import { LabelData } from '@settings/template/types/template';
import { useTranslation } from 'react-i18next';

const names = ['All', 'Candy', 'Coppy at Milk', 'Milk', 'Test', 'Coke'];

interface SelectboxEditProps {
  value: OptionValue;
  onChange: (params: any) => void;
  options: OptionValue[];
  fieldValue?: string;
  fieldLabel?: string;
  errors?: any;
  className?: string;
  isSearchable?: boolean;
  isMultiple?: boolean;
  isDisabled?: boolean;
}

const SelectBoxCustom = (props: any) => {
  const {
    value,
    onChange,
    options,
    fieldValue = 'keyName',
    fieldLabel = 'languageKey',
    errors = { isRequired: false },
    className,
    isSearchable = true,
    isDisabled = false,
    isMultiple = true,
    disableClearable = false
  } = props;
  const { t } = useTranslation();
  const [langOptions, setLangOptions] = useState([]);
  const [langValue, setLangValue] = useState();
  useEffect(() => {
    if (JSON.stringify(langOptions) !== JSON.stringify(options)) {
      const newOptions = options.map((option: LabelData) => {
        return {
          ...option,
          label: t(option.label)
        };
      });
      setLangOptions(newOptions);
    }
  }, [options]);

  useEffect(() => {
    if (value) {
      setLangValue({
        ...value,
        label: t(value.label)
      });
    }
  }, [value]);

  // console.log('value',value)
  return (
    <AutoCompleteCustom
      placeholder={t('ncrm_common_item_auto_complete_placeholder') as string}
      value={langValue}
      onChange={onChange}
      iconIndicator={Icon('down')}
      options={langOptions}
      disableClearable={disableClearable}
    />
  );
};

export default SelectBoxCustom;
