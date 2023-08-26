import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete, Download, DeleteOutlined, Print, RestoreFromTrashRounded, PictureAsPdf, Edit } from '@mui/icons-material';
import { LabelValueIcon, TemplateGroup } from '@base/types/app';
//import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
//import { MENU_QUOTE, MENU_SALES } from '@base/config/menus';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import SelectTemplate from '@base/containers/ViewField/SelectTemplate';
//import Switch from '@base/components/@hanbiro/Switch';
import SelectBox from '@base/components/@hanbiro/SelectBox';

//menu
import PrintPreviewList from '@quote/containers/PrintPreviewList';
import { Quote } from '@quote/types/interfaces';
import useQuoteDelete from '@quote/hooks/useQuoteDelete';
import * as keyNames from '@quote/config/keyNames';
import { useQuoteBulkUpdate, useQuoteEmptyRecovery, useQuoteRestore } from '@quote/hooks/useQuoteUpdate';

interface FloatToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean;
  onReload?: () => void;
}

const FloatToolbar = (props: FloatToolbarProps) => {
  const { category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;
  const { t } = useTranslation();
  //state
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Quote[]>([]);
  //const pageDataKey = `${MENU_SALES}_${MENU_QUOTE}`;

  //get current selected
  useEffect(() => {
    const nPage = itemsList.filter((o: Quote) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedItems?.concat(nPage));
    setSelectedItems(nSelected.filter((o: Quote) => checkedIds.includes(o.id)));
  }, [itemsList, checkedIds]);

  //hooks
  const mDelete = useQuoteDelete({ onCancel, onReload });
  const mBulkUpdate = useQuoteBulkUpdate({ onCancel, onReload });
  const mRestore = useQuoteRestore({ onCancel, onReload });
  const mEmpty = useQuoteEmptyRecovery({ onCancel, onReload });

  //restore deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
  };

  //open List Print Preview
  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  //restore deleted items
  const handleRestore = () => {
    mRestore.mutate({ ids: checkedIds });
  };

  //empty deleted items
  const handleEmpty = () => {
    mEmpty.mutate({ ids: checkedIds }); //TODO: empty all
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];
  //more
  quickButtons = quickButtons.concat([
    {
      label: 'Bulk Update',
      value: 'BULK_UPDATE',
      icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'Mark as Cancelled',
          value: keyNames.KEY_NAME_QUOTE_STATUS,
          component: SelectBox,
          componentProps: {
            options: []
          }
          // getValue: (value: any) => {
          //   return {
          //     id: '25e06922-51e2-4c4c-a802-d828c9ece592',
          //     name: 'Cancelled'
          //   };
          // }
          // setValue: (value: any) => {
          //   console.log('value to set', value);
          //   return value;
          // }
        },
        {
          label: 'Change Sales Rep',
          value: keyNames.KEY_NAME_QUOTE_SALES_REP,
          component: UserAutoComplete,
          componentProps: {
            single: true,
            showAvatar: true
          }
          // getValue: (value: any) => {
          //   return value ? { user: { id: value.id, name: value.name } } : null;
          // }
          // setValue: (value: string) => {
          //   return value ? value.split(',') : [];
          // }
        },
        {
          label: 'Change Template',
          value: keyNames.KEY_NAME_QUOTE_TEMPLATE,
          component: SelectTemplate,
          componentProps: {
            useSelectBox: true,
            useItemTable: false,
            templateGroup: TemplateGroup.EMAIL
          },
          getValue: (value: any) => {
            return value ? { id: value.id, name: value.name } : null;
          }
          // setValue: (value: string) => {
          //   return value ? value.split(',') : [];
          // }
        }
      ],
      excuteMoreAction: (value: any) => {
        //API to excute
        //console.log('Apply value Value', value);
        const params: any = {
          [keyNames.KEY_NAME_QUOTE_STATUS]: {
            id: '25e06922-51e2-4c4c-a802-d828c9ece592',
            name: 'Cancelled'
          }
        };
        if (value[keyNames.KEY_NAME_QUOTE_SALES_REP]) {
          params[keyNames.KEY_NAME_QUOTE_SALES_REP] = {
            user: {
              id: value[keyNames.KEY_NAME_QUOTE_SALES_REP].id,
              name: value[keyNames.KEY_NAME_QUOTE_SALES_REP].name
            }
          };
        }
        if (value[keyNames.KEY_NAME_QUOTE_TEMPLATE]) {
          params[keyNames.KEY_NAME_QUOTE_TEMPLATE] = {
            id: value[keyNames.KEY_NAME_QUOTE_TEMPLATE].id,
            name: value[keyNames.KEY_NAME_QUOTE_TEMPLATE].name
          };
        }
        mBulkUpdate.mutate({ ids: checkedIds, quote: params });
      }
    },
    {
      label: 'PDF',
      value: 'PDF',
      icon: <PictureAsPdf fontSize="small" />,
      onClick: () => console.log('Send sms')
    },
    {
      label: 'ncrm_common_btn_print',
      value: 'PRINT',
      icon: <Print fontSize="small" />,
      onClick: handlePrintPreview //list
    },
    {
      label: 'Delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    },
    {
      label: 'Export',
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => console.log('Export')
    }
  ]);

  //FOR DELETED groupby
  if (isGroupByDeleted) {
    quickButtons = [
      {
        label: 'ncrm_common_btn_restore',
        value: 'RESTORE',
        icon: <RestoreFromTrashRounded fontSize="small" />,
        onClick: handleRestore
      },
      {
        label: 'ncrm_common_btn_empty',
        value: 'EMPTY',
        icon: <DeleteOutlined fontSize="small" />,
        onClick: handleEmpty
      }
    ];
  }

  return (
    <>
      <BaseListBottomToolbar
        visible={!!checkedIds?.length}
        items={quickButtons.map((_button: LabelValueIcon) => ({ ..._button, label: t(_button.label) }))}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
      <PrintPreviewList onClose={() => setShowPrintPreview(false)} layoutData={selectedItems ?? []} isOpen={showPrintPreview} />
    </>
  );
};

export default FloatToolbar;
