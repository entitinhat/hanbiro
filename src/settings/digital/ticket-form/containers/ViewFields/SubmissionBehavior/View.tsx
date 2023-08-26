import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import _ from 'lodash';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;
  return (
    <MuiCheckbox
      value={value[keyNames.KEY_TICKET_FORM_CREATE_TICKET]}
      disabled
      label={'ncrm_generalsetting_ticket_form_new_ticket'}
      labelPlacement="end"
    />
  );
};

export default View;
