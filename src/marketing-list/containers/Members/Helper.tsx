import * as keyNames from '@marketing-list/config/keyNames';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';

export const getMapColumns = (category: string) => {
  return {
    [keyNames.KEY_NAME_CUSTOMER_NAME](column: string, data: any) {
      return data[keyNames.KEY_NAME_CUSTOMER_CUSTOMER][keyNames.KEY_NAME_CUSTOMER_NAME];
    },
    [keyNames.KEY_NAME_CUSTOMER_COMPANY](column: string, data: any) {
      return data[keyNames.KEY_NAME_CUSTOMER_CUSTOMER]['account'] ? (
        data[keyNames.KEY_NAME_CUSTOMER_CUSTOMER]['account'].name
      ) : (
        <em>(none)</em>
      );
    },
    [keyNames.KEY_NAME_CUSTOMER_EMAIL](column: string, data: any) {
      return data[keyNames.KEY_NAME_CUSTOMER_CUSTOMER]['emails']?.[0][keyNames.KEY_NAME_CUSTOMER_EMAIL] || <em>(none)</em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_MOBILES](column: string, data: any) {
      return data[keyNames.KEY_NAME_CUSTOMER_CUSTOMER]?.[keyNames.KEY_NAME_CUSTOMER_MOBILES]?.['mobileNumber'] || <em>(none)</em>;
    },
    [keyNames.KEY_NAME_CUSTOMER_DELETE](column: string, data: any, extra: any) {
      // console.log('item data: ', data);
      // console.log('extra: ', extra);
      return (
        <IconButton
          onClick={() => {
            // handleDelete(item.id);
            extra.handleDelete([data.id]);
          }}
        >
          <DeleteOutline fontSize="small" color="error" />
        </IconButton>
      );
    }
  };
};
