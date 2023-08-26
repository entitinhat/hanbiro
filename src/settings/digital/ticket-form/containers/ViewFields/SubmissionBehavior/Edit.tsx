import React, { useEffect, useState } from 'react';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';

interface EditProps {
  value: any;
  componentProps: any;
  onChange: (val: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const [curValue, setCurValue] = useState<any>({
    [keyNames.KEY_TICKET_FORM_CREATE_TICKET]: value[keyNames.KEY_TICKET_FORM_CREATE_TICKET],
    [keyNames.KEY_TICKET_FORM_TICKET_NAME]: value[keyNames.KEY_TICKET_FORM_TICKET_NAME]
  });

  const handleValueChange = (keyName: string, keyValue: any) => {
    const newValue = { ...curValue };
    newValue[keyName] = keyValue;
    setCurValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  return (
    <MuiCheckbox
      value={curValue[keyNames.KEY_TICKET_FORM_CREATE_TICKET]}
      onChange={(value: any) => handleValueChange(keyNames.KEY_TICKET_FORM_CREATE_TICKET, value)}
      label={'ncrm_generalsetting_ticket_form_new_ticket'}
      labelPlacement="end"
    />
  );
};

export default Edit;
