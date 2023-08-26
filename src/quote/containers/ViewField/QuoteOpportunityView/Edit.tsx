import React from 'react';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import SelectTemplate from '@base/containers/ViewField/SelectTemplate';
import { TemplateGroup } from '@base/types/app';
import OpportunityAutoComplete from '@opportunity/containers/OpportunityAutoComplete';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const handleOnChange = (newValue: any) => {
    onChange && onChange(newValue);
  };

  return <OpportunityAutoComplete value={value} onChange={handleOnChange} />;
};

export default Edit;
