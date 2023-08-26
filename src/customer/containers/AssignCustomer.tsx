import React, { useState, useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import { MENU_CUSTOMER } from '@base/config/menus';

//menu
import { CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import AssignCustomersContainer from '@customer/containers/AssignCustomersContainer';
import {
  useCustomerAssignContacts,
  useCustomerCreateAssignContact,
  useCustomerDeleteContact
} from '@customer/hooks/useCustomerAssignContact';
import { Customer } from '@customer/types/interface';
import { customerQueryKeys } from '@customer/config/queryKeys';

const LIMIT = 100;

interface AssignCustomerProps {
  placement?: string;
  menuSource: string;
  menuCategory: string;
  menuSourceName?: string;
  menuSourceId: string;
}

/**
 *
 * @param {*} props
 * @returns
 */
const AssignCustomer = (props: AssignCustomerProps) => {
  const { menuSource, menuCategory, menuSourceName, menuSourceId, placement } = props;
  //state
  const [contactItems, setContactItems] = useState<any>([]);
  const [newContact, setNewContact] = useState<any>(null);
  const queryClient = useQueryClient();

  //hooks
  const { data: contactsData, isLoading, refetch } = useCustomerAssignContacts(menuSourceId);
  const mutationCreate = useCustomerCreateAssignContact();
  const mutationDelete = useCustomerDeleteContact(menuSourceId);
  //console.log('contactsData', contactsData);

  //init contact items
  useEffect(() => {
    if (contactsData?.data) {
      setContactItems(contactsData.data);
    } else {
      setContactItems([]);
    }
  }, [contactsData]);

  //assign success from Select box
  useEffect(() => {
    if (mutationCreate.isSuccess) {
      //console.log('new contact', newContact);
      if (newContact) {
        // const newItems = [...contactItems];
        // newItems.unshift(newContact);
        // setContactItems(newItems);

        updateListQueryData(newContact);
        //waiting some seconds for server processing
        // setTimeout(() => {
        //   refetch();
        // }, 1000);
      }
    }
  }, [mutationCreate.isSuccess]);

  //set in query data
  // useEffect(() => {
  //   if (mutationDelete.isSuccess) {
  //     const params: any = mutationDelete?.variables;
  //     if (params && params?.ids && params.ids.length > 0) {
  //       const newItems = [...contactItems];
  //       const fIdx = newItems.findIndex((_ele: any) => _ele.id === params.ids[0]);
  //       if (fIdx > -1) {
  //         newItems.splice(fIdx, 1);
  //         setContactItems(newItems);
  //         //waiting some seconds for server processing
  //         setTimeout(() => {
  //           refetch();
  //         }, 1000);
  //       }
  //     }
  //   }
  // }, [mutationDelete.isSuccess]);

  //set query data list - cache
  const updateListQueryData = (contact: Customer) => {
    const contactListQueryKey = [customerQueryKeys.customersGet, menuSourceId, 'employee'];
    //remove list query
    queryClient.removeQueries([customerQueryKeys.customersGet, 'list']);
    // cancel all queries that contain the key list
    queryClient.cancelQueries(contactListQueryKey); //duplicated get
    const currentList = queryClient.getQueryData<{ data: Customer[] }>(contactListQueryKey);
    //console.log('currentList', currentList);
    if (!currentList) {
      return;
    }
    let newList = currentList?.data ? [...currentList.data] : [];
    newList.push(contact);
    //adjust current list
    queryClient.setQueryData(contactListQueryKey, {
      ...currentList,
      data: newList
    });
  };

  //add new assign
  const handleCreateAssign = (item: any) => {
    //check exist before add
    const foundIdx = contactItems.findIndex((_ele: any) => _ele.id === item.id) || -1;
    if (foundIdx > -1) return;
    //state
    setNewContact({ ...item, account: { id: menuSourceId, name: menuSourceName } });
    //save to db
    const params: any = {
      customer: {
        id: item.id,
        account: {
          id: menuSourceId,
          name: menuSourceName
        }
      }
    };
    mutationCreate.mutate(params);
  };

  //create new and assign
  const handleAfterAddAndAssign = (newVal: Customer) => {
    //console.log('assign newVal', newVal);
    if (newVal) {
      // const newItems = [...contactItems];
      // newItems.push(newVal);
      // setContactItems(newItems);

      updateListQueryData(newVal);
      //waiting some seconds for server processing
      // setTimeout(() => {
      //   refetch();
      // }, 1000);
    }
  };

  //delete customer contact
  const handleDeleteAssign = (item: any, cb: any) => {
    let params: any = {
      ids: [item.id]
    };
    mutationDelete.mutate(params);
    //callback
    cb && cb();
  };

  return (
    <AssignCustomersContainer
      items={contactItems}
      placement={placement}
      isLoading={isLoading || mutationCreate.isLoading || mutationDelete.isLoading}
      menuSource={MENU_CUSTOMER}
      menuSourceId={menuSourceId}
      menuSourceName={menuSourceName}
      menuTab={menuCategory}
      menuType={CUSTOMER_CATEGORY_CONTACT} // = employee contact
      onAssign={handleCreateAssign} //assign by select item from Select
      onDelete={handleDeleteAssign}
      onCallback={handleAfterAddAndAssign} //assign by create new one from modal
    />
  );
};

export default AssignCustomer;
