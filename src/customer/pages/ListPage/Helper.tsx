//third-party
import _ from 'lodash';
import { t } from 'i18next';

// material-ui
import { Stack, Typography } from '@mui/material';

//project
import { MENU_CUSTOMER } from '@base/config/menus';
import { convertDateTimeServerToClient, formatAddress, moneyFormat } from '@base/utils/helpers';
import { LABEL_VALUE_CUSTOM_ANNI, LABEL_VALUE_PRIMARY } from '@base/config/constant';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import RouteName from '@base/components/@hanbiro/RouteName';
import { Currency } from '@base/types/common';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

//menu
import * as keyNames from '@customer/config/keyNames';
import { CUSTOMER_GROUP_BY_DELETED } from '@customer/config/list-field';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';

//render columns components
export const getMapColumns = (category: string, selectionFields?: any, currency?: Currency) => {
  //console.log('selectionFields', selectionFields);
  return {
    [keyNames.KEY_NAME_CUSTOMER_PHOTO](col: string, data: any) {
      let photo = { key: '', bucket: '' };
      try {
        photo = JSON.parse(data[col]);
      } catch (e) {
        //console.log('parse photo error.');
      }
      return (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconAvatar id={photo.key} url={photo.bucket} alt={data[keyNames.KEY_NAME_CUSTOMER_NAME]} size="sm" />
        </Stack>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_CODE](col: string, data: any) {
      return <Typography variant="h6">{data[col] || <em></em>}</Typography>;
    },
    [keyNames.KEY_NAME_CUSTOMER_NAME](col: string, data: any) {
      //{t('ncrm_common_none')}
      let custName = data[col] ? data[col] : <em></em>;
      let custCategory = CUSTOMER_CATEGORY_ACCOUNT;
      switch (data[keyNames.KEY_NAME_CUSTOMER_CATEGORY]) {
        case 'CATEGORY_ACCOUNT':
          custCategory = CUSTOMER_CATEGORY_ACCOUNT;
          break;
        case 'CATEGORY_CONTACT':
          custCategory = CUSTOMER_CATEGORY_CONTACT;
          break;
      }
      let sourceId = data[keyNames.KEY_NAME_CUSTOMER_ID] ? data[keyNames.KEY_NAME_CUSTOMER_ID] : '';
      let url =
        category === CUSTOMER_CATEGORY_ALL
          ? `/${MENU_CUSTOMER}/${category}/${sourceId}/${custCategory}`
          : `/${MENU_CUSTOMER}/${category}/${sourceId}`;
      const isRead = data?.isRead ?? true;

      return <RouteName name={custName} url={url} variant="h6" isRead={isRead} />;
    },
    [keyNames.KEY_NAME_CUSTOMER_TYPE](col: string, data: any) {
      let label: any = <em></em>;
      if (data?.[col]?.languageKey) {
        label = t(data?.[col]?.languageKey);
      } else if (data?.[col]) {
        //data?.[col] = keyName "TYPE_CUSTOMER"
        const typesData = selectionFields['customer_category'];
        if (typesData?.length) {
          const keyItem = typesData.find((_ele: any) => _ele.keyName === data[col]);
          if (keyItem) {
            label = t(keyItem.languageKey);
          }
        }
      }
      return label;
    },
    [keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE](col: string, data: any) {
      let label: any = <em></em>;
      if (data?.[col]?.languageKey) {
        label = t(data?.[col]?.languageKey);
      } else if (data?.[col]) {
        //data?.[col] = keyName "CONTACT_TYPE_EMPLOYEE"
        const typesData = selectionFields['contact_type'];
        if (typesData?.length) {
          const keyItem = typesData.find((_ele: any) => _ele.keyName === data[col]);
          if (keyItem) {
            label = t(keyItem.languageKey);
          }
        }
      }
      return label;
    },
    [keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE](col: string, data: any) {
      let label: any = <em></em>;
      if (data?.[col]?.languageKey) {
        label = t(data?.[col]?.languageKey);
      } else if (data?.[col]) {
        //data?.[col] = keyName "employee_role_new_role"
        const typesData = selectionFields['employee_role'];
        if (typesData?.length) {
          const keyItem = typesData.find((_ele: any) => _ele.keyName === data[col]);
          if (keyItem) {
            label = t(keyItem.languageKey);
          }
        }
      }
      return label;
    },
    [keyNames.KEY_NAME_CUSTOMER_EMAIL](col: string, data: any) {
      let emails: any = [];
      data[col]?.map((_ele: any) => {
        if (_ele.label === LABEL_VALUE_PRIMARY) {
          emails.unshift({ ..._ele, name: _ele.email });
        } else {
          emails.push({ ..._ele, name: _ele.email });
        }
      });

      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={emails} />
          {emails.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_PHONES](col: string, data: any) {
      let phones: any = [];
      data[col]?.map((_ele: any) => {
        if (_ele.label === LABEL_VALUE_PRIMARY) {
          phones.unshift({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.phoneNumber}` });
        } else {
          phones.push({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.phoneNumber}` });
        }
      });

      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={phones} />
          {phones.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_MOBILE](col: string, data: any) {
      let mobiles: any = [];
      data[col]?.map((_ele: any) => {
        if (_ele.label === LABEL_VALUE_PRIMARY) {
          mobiles.unshift({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.mobileNumber}` });
        } else {
          mobiles.push({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.mobileNumber}` });
        }
      });

      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={mobiles} />
          {mobiles.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_GENDER](col: string, data: any) {
      return t(data?.[col]?.languageKey) || <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_INDUSTRIES](col: string, data: any) {
      let industries: any = [];
      data[col]?.map((_ele: any) => {
        if (_ele !== null) {
          industries.push({ ..._ele, name: _ele?.languageKey ? t(_ele.languageKey) : _ele?.name });
        }
      });

      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={industries} />
          {industries.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_RATING](col: string, data: any) {
      return data[col]?.languageKey ? t(data[col].languageKey) : <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO](col: string, data: any) {
      let staffs: any = [];
      Array.isArray(data?.[col]) &&
        data?.[col]?.map((_ele: any) => {
          if (_ele.user) {
            staffs.push({ ..._ele, id: _ele.user.id, name: _ele.user.name });
          }
        });

      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={staffs} />
          {staffs.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_WEBSITES](col: string, data: any) {
      // let websites: any = [];
      // data[col]?.map((_ele: any) => {
      //   if (_ele !== null) {
      //     websites.push({ ..._ele, name: _ele?.website });
      //   }
      // });
      // return (
      //   <>
      //     <ListTableCellDroplist showAvatar={false} values={websites} />
      //     {websites.length === 0 && <em></em>}
      //   </>
      // );
      return data[col] ? data[col]?.website : '';
    },
    [keyNames.KEY_NAME_CUSTOMER_BUSINESS_NUMBER](col: string, data: any) {
      return data?.[col] || <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_FAX](col: string, data: any) {
      let faxes: any = [];
      data[col]?.map((_ele: any) => {
        if (_ele.label === LABEL_VALUE_PRIMARY) {
          faxes.unshift({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.faxNumber}` });
        } else {
          faxes.push({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.faxNumber}` });
        }
      });

      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={faxes} />
          {faxes.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES](col: string, data: any) {
      return <Typography variant="inherit">{data[col] ? formatAddress(data[col]) : <em></em>}</Typography>;

      // const rows: any = [];
      // data[col]?.map((_ele: any) => {
      //   rows.push({ ..._ele, name: formatAddress(_ele) });
      // });
      // return (
      //   <>
      //     <ListTableCellDroplist showAvatar={false} values={rows} />
      //     {rows.length === 0 && <em></em>}
      //   </>
      // );
    },
    [keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES](col: string, data: any) {
      return <Typography variant="inherit">{data[col] ? formatAddress(data[col]) : <em></em>}</Typography>;

      // const rows: any = [];
      // data[col]?.map((_ele: any) => {
      //   rows.push({ ..._ele, name: formatAddress(_ele) });
      // });
      // return (
      //   <>
      //     <ListTableCellDroplist showAvatar={false} values={rows} />
      //     {rows.length === 0 && <em></em>}
      //   </>
      // );
    },
    [keyNames.KEY_NAME_CUSTOMER_PARENT_ACCOUNT](col: string, data: any) {
      return data?.[col]?.name || <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_MAIN_PRODUCT](col: string, data: any) {
      return data?.[col] || <em></em>; //<TextView value={data?.[col] || ''} />;
    },
    [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT](col: string, data: any) {
      const rows = data[col] || [];
      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={rows} />
          {rows.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_ANNUAL_REVENUE](col: string, data: any) {
      return `${currency?.currencySymbol || currency?.code} ${moneyFormat(data?.[col] || '0')}`;
    },
    [keyNames.KEY_NAME_CUSTOMER_EMPLOYEES_NUMBER](col: string, data: any) {
      return moneyFormat(data?.[col] || 0);
    },
    [keyNames.KEY_NAME_CUSTOMER_SLA](col: string, data: any) {
      return data?.[col] || <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_ACCOUNT](col: string, data: any) {
      const account = data?.[col];
      return account?.name || <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_DEPARTMENT](col: string, data: any) {
      return data?.[col] || <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_POSITION](col: string, data: any) {
      return data?.[col] || <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_JOB](col: string, data: any) {
      return data[col]?.languageKey ? t(data[col].languageKey) : <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES](col: string, data: any) {
      let rows: any = [];
      data[col]?.map((_ele: any) => {
        let labelTitle = _ele?.label?.label == LABEL_VALUE_CUSTOM_ANNI ? _ele?.labelValue : t(_ele?.label?.languageKey);
        rows.push({ ..._ele, name: `${labelTitle}: ${_ele.anniversary?.slice(0, 10)}` });
      });

      return (
        <>
          <ListTableCellDroplist showAvatar={false} values={rows} />
          {rows.length === 0 && <em></em>}
        </>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_DELETED_BY](col: string, data: any) {
      return data?.restore && data.restore?.[col] ? data.restore[col].name : <em></em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_DELETED_AT](col: string, data: any) {
      return data?.restore ? convertDateTimeServerToClient({ date: data.restore[col] }) : <em></em>;
    },

    // ------------------------------marketing List---------------------------------
    [keyNames.KEY_NAME_CUSTOMER_MARKETING_TARGET_SOURCE](col: string, data: any) {
      switch (data[col]) {
        case 'MARKETING_MEMBER_SOURCE_ACCOUNT':
          return t('Account');
        case 'MARKETING_MEMBER_SOURCE_CONTACT':
          return t('Contact');
        case 'MARKETING_MEMBER_SOURCE_MARKETING':
          return t('Marketing List');
        default:
          return <em></em>;
      }
    },
    [keyNames.KEY_NAME_CUSTOMER_MARKETING_TARGET_CREATED_AT](col: string, data: any) {
      return data?.[col] ? convertDateTimeServerToClient({ date: data?.[col], humanize: true }) : '';
    }
  };
};

export const isDeleteList = (groupBy: string): boolean => {
  return [CUSTOMER_GROUP_BY_DELETED].indexOf(groupBy) >= 0;
};
