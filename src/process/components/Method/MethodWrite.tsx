import React, { useMemo } from 'react';
import { LabelValue } from '@base/types/app';
import { stepSettingAtom } from '@process/store/atoms/diagram';
import { MethodOptions } from './';
import { useRecoilValue } from 'recoil';
import RadioGroup from '@base/components/@hanbiro/RadioGroup';

interface MethodWriteProps {
  value: string;
  onChange: (val: string) => void;
}

function MethodWrite(props: MethodWriteProps) {
  const { onChange, value } = props;
  const stepSetting = useRecoilValue(stepSettingAtom);
  const selectedValue = useMemo(() => {
    return MethodOptions.find((_ele: LabelValue) => _ele.value === value)!!;
  }, [value]);

  const methodOptions = useMemo(() => {
    if (stepSetting.method == 'ACTION_METHOD_MANUAL') {
      return [MethodOptions[0]];
    } else if (stepSetting.method == 'ACTION_METHOD_AUTO') {
      return [MethodOptions[1]];
    } else {
      return MethodOptions;
    }
  }, [stepSetting]);

  const handleValueChange = (newOption: LabelValue) => {
    onChange && onChange(newOption.value as string);
  };

  return (
    <RadioGroup
      isVertical={false}
      options={methodOptions}
      value={selectedValue}
      onChange={handleValueChange}
    />
  );
}

export default MethodWrite;
