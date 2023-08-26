import React, { useMemo, useState } from 'react';
//third-party
import { useTranslation } from 'react-i18next';

//project
import { MENU_CUSTOMER } from '@base/config/menus';
import NoData from '@base/components/@hanbiro/NoData';

//menu
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import WritePage from '@customer/pages/WritePage';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';

//material
import { Add } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';

//local
import Customers from './Customers';

interface AssignCustomersContainerProps {
  placement?: string;
  items: any;
  menuSource?: string;
  menuSourceId?: string;
  menuSourceName?: string;
  menuTab?: string; //= customer type
  menuType?: string; //= customer category
  isLoading?: boolean;
  disabledAdd?: boolean;
  addLabel?: string;
  onDelete?: any;
  onAssign?: any;
  onCallback?: any;
  readOnly?: boolean;
  buttonsOnItems?: React.ReactNode[];
  sendMail?: boolean;
  sendSms?: boolean;
}

/**
 *
 * @param {*} props
 * @returns
 */
const AssignCustomersContaner = (props: AssignCustomersContainerProps) => {
  const {
    placement,
    menuType, //category
    menuSource,
    menuSourceId,
    menuSourceName,
    menuTab,
    items,
    isLoading = false,
    disabledAdd = true,
    addLabel = '',
    onDelete,
    onAssign,
    onCallback, //refresh list
    readOnly = false,
    buttonsOnItems,
    sendMail = false,
    sendSms = false
  } = props;

  //lang
  const { t } = useTranslation();
  //state
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ name: '' });
  const [deletedItem, setDeletedItem] = useState<any>(null);
  const [showSendMail, setShowSendMail] = useState<boolean>(false);
  const [showSendSms, setShowSendSms] = useState<boolean>(false);

  //contact view
  const handleView = (item: any) => {
    setSelectedItem(item);
    setShowView(true);
  };

  //delete confirm
  const handleDelete = (item: any) => {
    setIsDeleting(true);
    setDeletedItem(item);
    onDelete(item, () => {
      setDeletedItem(null);
      setIsDeleting(false);
    });
  };

  let placeholder = t('ncrm_customer_customer_placeholder');
  if (menuType === 'account') {
    placeholder = t('ncrm_customer_account_placeholder');
  }
  if (menuType === 'contact') {
    placeholder = t('ncrm_customer_contact_placeholder');
  }
  //render
  return (
    <Box sx={{ position: 'relative' }}>
      {isLoading && (
        <Box sx={{ position: 'absolute', zIndex: 10, top: '30%', left: '40%' }}>
          <CircularProgress />
        </Box>
      )}
      {items.length == 0 && <NoData icon={'users'} iconType={'custom'} />}
      {items.length > 0 ? <Customers items={items} sendMail sendSms onDelete={handleDelete} /> : null}
      {!isLoading && (menuSource === MENU_CUSTOMER || !disabledAdd) && (
        <Button size="small" color="primary" onClick={() => setShowAdd(true)} startIcon={<Add />}>
          {addLabel || t('ncrm_customer_add_new_contact')}
        </Button>
      )}
      {menuSource !== MENU_CUSTOMER && disabledAdd && !readOnly && (
        <CustomerAutoComplete
          single={true}
          category={menuType || ''}
          type={menuTab}
          //exceptItems={exceptItems}
          value={[]}
          onChange={onAssign}
          //addLabel=''
          //onAdd={menuSource === MENU_CUSTOMER ? () => setShowAdd(true) : null}
        />
      )}
      <WritePage
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        category={CUSTOMER_CATEGORY_CONTACT}
        account={
          menuSource === MENU_CUSTOMER
            ? {
                id: menuSourceId || '', //account id
                code: '', //account id
                name: menuSourceName || '', //account name
                category: CUSTOMER_CATEGORY_ACCOUNT
              }
            : undefined
        }
        menuApi={`${MENU_CUSTOMER}_${CUSTOMER_CATEGORY_CONTACT}`}
        onSuccess={onCallback}
      />
    </Box>
  );
};

export default AssignCustomersContaner;
