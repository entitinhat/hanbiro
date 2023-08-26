import { useEffect, useMemo, useState } from 'react';

import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OptionValue } from '@base/types/common';
import { useGetTaskTemplate, useGetTaskTemplates } from '../../hooks/useTemplate';
import { TaskTemplate } from '../../types/template';
import { useSetRecoilState } from 'recoil';
import { taskTemplateAtom } from '../../store/atoms/template';

interface templateBoxProps {
  value: OptionValue;
  componentProps?: any;
  onChange: (val: OptionValue) => void;
}

function TemplateBox(props: templateBoxProps) {
  const { value, onChange, componentProps } = props;
  const [option, setOption] = useState<OptionValue>(value);
  const [selectedId, setSelectedId] = useState('');
  const setTaskTemplate = useSetRecoilState(taskTemplateAtom);

  const { data: templates } = useGetTaskTemplates();
  console.log('templatebox data', templates);
  const items = templates?.results;
  const options = useMemo(() => {
    if (items) {
      return items.map((v: TaskTemplate) => ({
        languageKey: v.name,
        keyName: v.id
      }));
    }
    return [];
  }, [items]);

  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(option)) {
        setOption(value);
      }
    }
  }, [value]);

  const template = useGetTaskTemplate(selectedId);

  useEffect(() => {
    if (template.id) {
      setTaskTemplate(template);
    }
  }, [template]);

  const handleValueChange = (val: OptionValue) => {
    setSelectedId(val.keyName);
    onChange && onChange(val);
  };

  return (
    <>
      <SelectBox value={option} options={options} onChange={handleValueChange} useClear />
    </>
  );
}

export default TemplateBox;
