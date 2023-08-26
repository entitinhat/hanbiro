import React, { useEffect } from 'react';

//third-party
// import { useQueryClient } from '@tanstack/react-query';

//material
import { Delete, Download } from '@mui/icons-material';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { LabelValueIcon } from '@base/types/app';

//menu
import { useSatisfactionDelete } from '@settings/digital/satisfaction/hooks/useSatisfactionMutations';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean; //TODO - when groupby deleted selected
  onReload?: () => void;
}

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;

  //hooks
  //const queryClient = useQueryClient();
  const mDelete = useSatisfactionDelete({ onCancel });

  useEffect(() => {
    if (mDelete.isSuccess) {
      onCancel && onCancel();
      //onReload && onReload();
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
      label: 'Export',
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => console.log('Export')
    },
    {
      label: 'Delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    }
  ]);
  // if (isGroupByDeleted) {
  //   quickButtons.push({
  //     label: 'Restore',
  //     value: 'RESTORE',
  //     icon: <Restore fontSize="small" />,
  //     onClick: handleRestore
  //   });
  // }

  //console.log('checkedIds', checkedIds);
  return (
    <>
      <BaseListBottomToolbar
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
