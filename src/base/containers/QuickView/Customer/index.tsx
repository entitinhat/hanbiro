import { useEffect, useMemo } from 'react';
import { MENU_CUSTOMER } from '@base/config/menus';
import { default as viewConfig } from '@customer/config/view-field';
import { isFunction } from 'lodash';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import PhotoViewField from '@base/containers/ViewField/Photo';
import * as keyNames from '@customer/config/keyNames';
import { Box, Divider, Grid, InputLabel, Stack, Switch, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { useCustomerQuickView } from '@customer/hooks/useCustomerQuickView';
import { CustomerCategory, CustomerContactType, CustomerType } from '@customer/types/type';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ViewField from '@base/components/@hanbiro/ViewPage/ViewField';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import RouteName from '@base/components/@hanbiro/RouteName';
import { CustomerQuickView } from '@customer/types/interface';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';

const fieldsConfig: any = {
  photo: {
    languageKey: 'customer_contact_field_basic_photo'
  },
  code: {
    languageKey: 'customer_contact_field_basic_code'
  },
  name: {
    languageKey: 'customer_contact_field_basic_name'
  },
  contactType: {
    languageKey: 'customer_contact_field_basic_contacttype'
  },
  type: {
    languageKey: 'customer_contact_field_basic_type'
  },
  rating: {
    languageKey: 'customer_contact_field_basic_rating'
  },
  employeeRole: {
    languageKey: 'customer_contact_field_basic_employeerole'
  },
  industries: {
    languageKey: 'customer_contact_field_basic_industries'
  },
  account: {
    languageKey: 'customer_contact_field_basic_account'
  },
  emails: {
    languageKey: 'customer_contact_field_basic_emails'
  },
  mobiles: {
    languageKey: 'customer_contact_field_basic_mobiles'
  },
  phones: {
    languageKey: 'customer_contact_field_basic_phones'
  },
  gender: {
    languageKey: 'customer_contact_field_basic_gender'
  },
  department: {
    languageKey: 'customer_contact_field_basic_department'
  },
  job: {
    languageKey: 'customer_contact_field_basic_job'
  },
  position: {
    languageKey: 'customer_contact_field_basic_position'
  },
  anniversaries: {
    languageKey: 'customer_contact_field_basic_anniversaries'
  },
  assignTo: {
    languageKey: 'customer_contact_field_basic_assignto'
  },
  mainProduct: {
    languageKey: 'customer_contact_field_basic_mainproduct'
  },
  relatedProducts: {
    languageKey: 'customer_contact_field_basic_relatedproducts'
  },
  SLA: {
    languageKey: 'customer_contact_field_basic_sla'
  },
  billAddress: {
    languageKey: 'customer_contact_field_basic_billaddress'
  },
  shipAddress: {
    languageKey: 'customer_contact_field_basic_shipaddress'
  },
  description: {
    languageKey: 'customer_contact_field_basic_description'
  },
  createdAt: {
    languageKey: 'customer_contact_field_basic_createdat'
  },
  createdBy: {
    languageKey: 'customer_contact_field_basic_createdby'
  },
  updatedAt: {
    languageKey: 'customer_contact_field_basic_updatedat'
  },
  updatedBy: {
    languageKey: 'customer_contact_field_basic_updatedby'
  }
};

export const CustomerQuickViewModal = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const { data, isLoading } = useCustomerQuickView(id, []);

  //===================================================Config=================================
  const name = data?.name ?? '';
  const isAccount = !!data?.category && data.category === CustomerCategory.account;
  const isContact = !!data?.category && data.category === CustomerCategory.contact; //CATEGORY_CONTACT
  const isEmployee = !!data?.contactType && data.contactType === CustomerContactType.employee;

  const url = `/${MENU_CUSTOMER}/${isAccount ? 'account' : 'contact'}/${id}`;

  //=============================================================================================
  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

  const buildFieldConfig = (data: any, keyName: string, languageKey: string) => {
    return {
      config: viewConfig[keyName],
      data,
      keyName,
      languageKey,
      userPermission: { isEdit: false, isShow: true }
    };
  };

  const QuickViewFields = useMemo(() => {
    //Get Field Key like customer view page
    let orderBasicField: any = [];
    if (isAccount) {
      orderBasicField = [
        keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
        keyNames.KEY_NAME_CUSTOMER_CODE,
        keyNames.KEY_NAME_CUSTOMER_TYPE,
        keyNames.KEY_NAME_CUSTOMER_RATING,
        keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
        keyNames.KEY_NAME_CUSTOMER_EMAIL,
        keyNames.KEY_NAME_CUSTOMER_PHONES,
        keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
        keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
      ];
    } else if (isContact) {
      if (isEmployee) {
        orderBasicField = [
          keyNames.KEY_NAME_CUSTOMER_CODE,
          keyNames.KEY_NAME_CUSTOMER_TYPE,
          keyNames.KEY_NAME_CUSTOMER_EMAIL,
          keyNames.KEY_NAME_CUSTOMER_MOBILE,
          keyNames.KEY_NAME_CUSTOMER_PHONES,
          keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE,
          keyNames.KEY_NAME_CUSTOMER_DEPARTMENT,
          keyNames.KEY_NAME_CUSTOMER_JOB,
          keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
        ];
      } else {
        orderBasicField = [
          keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
          keyNames.KEY_NAME_CUSTOMER_CODE,
          keyNames.KEY_NAME_CUSTOMER_TYPE,
          keyNames.KEY_NAME_CUSTOMER_RATING,
          keyNames.KEY_NAME_CUSTOMER_EMAIL,
          keyNames.KEY_NAME_CUSTOMER_MOBILE,
          keyNames.KEY_NAME_CUSTOMER_PHONES,
          keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
          keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
        ];
      }
    }
    //Build View Field
    let groupsBasicFields: any[] = [];
    if (data) {
      orderBasicField.forEach((key: string) => {
        const languageKey = viewConfig[key].languageKey ?? fieldsConfig[key]?.languageKey ?? key;
        groupsBasicFields.push(buildFieldConfig(data[key as keyof CustomerQuickView], key, languageKey));
      });
    }

    return (
      <ViewFields
        ignoreFields={[keyNames.KEY_NAME_CUSTOMER_PHOTO, keyNames.KEY_NAME_CUSTOMER_ACCOUNT]}
        fields={groupsBasicFields}
        menuSource={MENU_CUSTOMER}
        menuSourceId={id}
        divider
        column={1}
      />
    );
  }, [data]);
  //====================================================================Debug=================================
  // console.log('customer data quick view', data);
  //=========================================================================================================
  return (
    <Grid container spacing={1.75} sx={{ p: 2, width: 400 }}>
      <Grid item xs={12}>
        <Grid container sx={{ marginBottom: '1rem' }}>
          <Grid item xs={4} sx={{ paddingRight: 0 }}>
            <Box>
              <PhotoViewField menuSource={MENU_CUSTOMER} menuSourceId={id} value={data?.photo ?? null} />{' '}
            </Box>
          </Grid>
          <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', padding: '0px 15px' }}>
            <RouteName url={url} name={name} />
          </Grid>
        </Grid>
      </Grid>
      {QuickViewFields}
    </Grid>
  );
};

export default withTextAndPreviewModal(CustomerQuickViewModal, { title: 'Customer Detail' });
