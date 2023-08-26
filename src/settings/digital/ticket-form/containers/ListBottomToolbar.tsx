import React, { useEffect } from 'react';
//third-party
import { useQueryClient } from '@tanstack/react-query';
//material
import { Delete, Download } from '@mui/icons-material';
//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { LabelValueIcon } from '@base/types/app';
//menu
import { useTicketFormDelete } from '@settings/digital/ticket-form/hooks/useTicketFormMutation';
import { useTranslation } from 'react-i18next';
interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean; //TODO - when groupby deleted selected
  onReload?: () => void;
}

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;
  const { t } = useTranslation();

  //hooks
  const queryClient = useQueryClient();
  const mDelete = useTicketFormDelete();

  useEffect(() => {
    if (mDelete.isSuccess) {
      // setTimeout(() => {
      //   queryClient.invalidateQueries([queryKeys.surveysGet]);
      // }, 500);
      onCancel && onCancel();
      onReload && onReload();
    }
  }, [mDelete.isSuccess]);

  //restore deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];
  quickButtons = quickButtons.concat([
    {
      label: t('ncrm_common_export'),
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => console.log('Export')
    },
    {
      label: t('ncrm_common_btn_delete'),
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    }
  ]);

  return (
    <>
      <BaseListBottomToolbar
        sx={{
          top: 145,
          left: 214
        }}
        visible={!!checkedIds?.length}
        items={quickButtons}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
    </>
  );
};

export default ListBottomToolbar;
