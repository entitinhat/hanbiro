import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete, Mail, Sms, Download, DeleteOutlined, Print, RestoreFromTrashRounded } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_CAMPAIGN } from '@base/config/menus';

//menu
import useCampaignDelete from '@campaign/hooks/useCampaign';
import PrintPreviewList from '@campaign/containers/PrintPreviewList';
import { Campaign } from '@campaign/types/interface';

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
  const [selectedItems, setSelectedItems] = useState<Campaign[]>([]);
  const pageDataKey = `${MENU_CAMPAIGN}_${category}`;

  //get current selected
  useEffect(() => {
    const nPage = itemsList.filter((o: Campaign) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedItems?.concat(nPage));
    setSelectedItems(nSelected.filter((o: Campaign) => checkedIds.includes(o.id)));
  }, [itemsList, checkedIds]);

  //hooks
  const mDelete = useCampaignDelete({ category, onCancel, onReload });
  const { listQueryKey } = useListQueryKeys(pageDataKey);
  //const { mRestore, mEmpty } = useCusomerRestoreMutation(listQueryKey);

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
    // mRestore.mutate(
    //   { ids: checkedIds },
    //   {
    //     onSuccess() {
    //       onCancel && onCancel();
    //       onReload && onReload();
    //     }
    //   }
    // );
  };

  //Empty deleted items
  const handleEmpty = () => {
    // mEmpty.mutate(
    //   { ids: checkedIds },
    //   {
    //     onSuccess() {
    //       onCancel && onCancel();
    //       onReload && onReload();
    //     }
    //   }
    // );
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];
  //more
  quickButtons = quickButtons.concat([
    {
      label: 'ncrm_common_sendemail',
      value: 'MAIL',
      icon: <Mail fontSize="small" />,
      onClick: () => console.log('Send mail')
    },
    {
      label: 'ncrm_customer_sendsms',
      value: 'SMS',
      icon: <Sms fontSize="small" />,
      onClick: () => console.log('Send sms')
    },
    {
      label: 'ncrm_customer_export',
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => console.log('Export')
    },
    {
      label: 'ncrm_customer_delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    },
    {
      label: 'ncrm_common_btn_print',
      value: 'PRINT',
      icon: <Print fontSize="small" />,
      onClick: handlePrintPreview
    }
  ]);
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
