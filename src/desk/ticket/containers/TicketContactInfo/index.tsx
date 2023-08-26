import { useState } from 'react';
import { default as customerViewConfig } from '@customer/config/view-field';
import ContactName from '@desk/ticket/containers/ViewFields/ContactName';
import * as keyNames from '@customer/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { MENU_CUSTOMER, MENU_CUSTOMER_CONTACT } from '@base/config/menus';
import { PlusOneOutlined } from '@mui/icons-material';
import WriteModal from '@customer/pages/WritePage';
import { Customer } from '@customer/types/interface';
import MainCard from '@base/components/App/MainCard';
import { Box, Button } from '@mui/material';
interface TicketContactInfoProps {
  menuSource: string;
  menuSourceId: string;
  account?: Customer | null;
  contact: Customer;
  readOnly?: boolean;
}
const TicketContactInfo = (props: TicketContactInfoProps) => {
  const { account, contact, readOnly } = props;
  //state
  const [showAdd, setShowAdd] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  //build fields by config
  const buildFieldConfig = (data: any, keyName: string, languageKey: string) => {
    return {
      config: customerViewConfig[keyName],
      data,
      keyName,
      languageKey,
      userPermission: { isEdit: true, isShow: true }
    };
  };
  let customerBasicFields: any[] = [];
  if (contact) {
    let compConfig = {
      component: ContactName,
      componentProps: {
        showSymbol: true
      },
      schema: `name`,

      getMutationValue: (value: any) => {
        return { [keyNames.KEY_NAME_CUSTOMER_NAME]: value.name };
      }
    };
    let cusNameComponent = buildFieldConfig(contact, keyNames.KEY_NAME_CUSTOMER_NAME, 'Name');
    cusNameComponent.config = compConfig;

    customerBasicFields.push(cusNameComponent);
    customerBasicFields.push(buildFieldConfig(contact[keyNames.KEY_NAME_CUSTOMER_EMAIL], keyNames.KEY_NAME_CUSTOMER_EMAIL, 'Email'));
    customerBasicFields.push(buildFieldConfig(contact[keyNames.KEY_NAME_CUSTOMER_PHONES], keyNames.KEY_NAME_CUSTOMER_PHONES, 'Phone'));
  }
  //// console.log('customerBasicFields', customerBasicFields);

  return (
    <>
      <MainCard sx={{ width: '100%' }} border={false}>
        <Box sx={{ marginBotton: 10 }}>
          <ViewFields
            fields={customerBasicFields}
            ignoreFields={[]}
            menuSource={MENU_CUSTOMER} //data?.category === 'CATEGORY_ACCOUNT' ? 'customer_account' : 'customer_contact'
            menuSourceId={contact?.id}
            readOnly={readOnly}
          />
        </Box>

        {account && (
          <>
            <Button size="small" sx={{ marginLeft: 'auto' }} onClick={() => setShowAdd(true)} variant="text" disabled={readOnly}>
              <PlusOneOutlined fontSize="small" />
              Add New Contact
            </Button>
            {showAdd && (
              <WriteModal
                category="contact"
                fullScreen={fullScreen}
                isOpen={showAdd}
                account={account}
                menuApi={MENU_CUSTOMER_CONTACT}
                onClose={() => setShowAdd(false)}
                //onReload={onCallback} //TODO
              />
            )}
          </>
        )}
      </MainCard>
    </>
  );
};

export default TicketContactInfo;
