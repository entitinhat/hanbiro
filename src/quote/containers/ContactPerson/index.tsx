import RouteName from '@base/components/@hanbiro/RouteName';
import { Theme } from '@fullcalendar/react';
import { Box, Button, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useCustomerAssignContacts, useCustomerCreateAssignContact } from '@customer/hooks/useCustomerAssignContact';
import NoData from '@base/components/@hanbiro/NoData';
import { getMapColumns } from '@customer/pages/ListPage/Helper';
import * as keyNames from '@customer/config/keyNames';
import WritePage from '@customer/pages/WritePage';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import { MENU_CUSTOMER } from '@base/config/menus';
import { Customer } from '@customer/types/interface';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { selectionFieldsAtom } from '@base/store/atoms/app';
import { FieldOption } from '@settings/general/types/interface';
import { useSelectionFieldItems } from '@settings/general/hooks/useSelectionFieldItems';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import _ from 'lodash';

interface ContactPersonProps {
  menuSource: string;
  customerId: string;
  menuSourceName: string;
}

const ContactPerson = (props: ContactPersonProps) => {
  const { menuSource, customerId, menuSourceName } = props;
  const url = `/quote`;
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<any[]>([]);
  const [typeData, setTypeData] = useState<FieldOption[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const selectionFields = useRecoilValue(selectionFieldsAtom);

  const { data: contactsData, isLoading, refetch } = useCustomerAssignContacts(customerId);

  const sourceKey = 'customer_category';

  const { data: fieldsData, isFetching: isFieldLoading } = useSelectionFieldItems(
    { keyName: sourceKey },
    { enabled: sourceKey.length > 0 }
  );

  useEffect(() => {
    if (fieldsData?.data && fieldsData?.data?.length > 0) {
      setTypeData(fieldsData?.data);
    } else {
      setTypeData([]);
    }
  }, [fieldsData]);

  useEffect(() => {
    if (contactsData?.data) {
      if (!_.isEqual(contactsData?.data, items)) setItems(contactsData.data);
    } else {
      setItems([]);
    }
  }, [contactsData]);

  //set query data list - cache
  const updateListQueryData = (contact: Customer) => {
    const contactListQueryKey = [customerQueryKeys.customersGet, customerId, 'employee'];
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

  return (
    <>
      {items.length == 0 && <NoData icon={'users'} iconType={'custom'} />}
      {items && (
        <Stack spacing={2} p={2}>
          <Box className="scroll-box" maxHeight="250px">
            {items.map((item: any, i: number) => {
              const type = typeData.find((v: any) => v.keyName === item?.type)?.languageKey || '';
              let url = `/${MENU_CUSTOMER}/${CUSTOMER_CATEGORY_CONTACT}/${item?.id}`;
              return (
                <Stack key={i} spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <RouteName name={item.name} url={url} />
                    {type && (
                      <Chip
                        label={<SpanLang keyLang={type} />}
                        size="small"
                        variant="outlined"
                        sx={{ border: 'none', backgroundColor: theme.palette.secondary.lighter }}
                      />
                    )}
                  </Stack>
                  <Grid container>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <Stack direction="row">
                          <Typography color="secondary" mr={0.5}>
                            Email:
                          </Typography>
                          <Box>
                            {getMapColumns('', selectionFields)?.[keyNames.KEY_NAME_CUSTOMER_EMAIL](keyNames.KEY_NAME_CUSTOMER_EMAIL, item)}
                          </Box>
                        </Stack>
                        <Stack direction="row">
                          <Typography color="secondary" mr={0.5}>
                            Mobile:
                          </Typography>
                          <Box>
                            {getMapColumns('', selectionFields)?.[keyNames.KEY_NAME_CUSTOMER_MOBILE](
                              keyNames.KEY_NAME_CUSTOMER_MOBILE,
                              item
                            )}
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack spacing={1}>
                        <Stack direction="row">
                          <Typography color="secondary" mr={0.5}>
                            Phone:
                          </Typography>
                          <Box>
                            {getMapColumns('', selectionFields)?.[keyNames.KEY_NAME_CUSTOMER_PHONES](
                              keyNames.KEY_NAME_CUSTOMER_PHONES,
                              item
                            )}
                          </Box>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              );
            })}
          </Box>
          <Button
            sx={{ width: 'fit-content' }}
            variant="contained"
            color="primary"
            onClick={() => setShowAdd(true)}
            startIcon={<AddIcon />}
            size="small"
          >
            Add
          </Button>
        </Stack>
      )}

      <WritePage
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        category={CUSTOMER_CATEGORY_CONTACT}
        account={
          menuSource === MENU_CUSTOMER
            ? {
                id: customerId || '', //account id
                code: '', //account id
                name: menuSourceName || '', //account name
                category: CUSTOMER_CATEGORY_ACCOUNT
              }
            : undefined
        }
        menuApi={`${MENU_CUSTOMER}_${CUSTOMER_CATEGORY_CONTACT}`}
        onSuccess={handleAfterAddAndAssign}
      />
    </>
  );
};

export default ContactPerson;
