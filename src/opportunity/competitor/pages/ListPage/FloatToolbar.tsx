import { useEffect, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete, Download, DeleteOutlined, RestoreFromTrashRounded } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';

//menu
import { Quote } from '@quote/types/interfaces';
import useQuoteDelete from '@quote/hooks/useQuoteDelete';
import * as keyNames from '@quote/config/keyNames';
import { useQuoteEmptyRecovery, useQuoteRestore } from '@quote/hooks/useQuoteUpdate'; //TODO
import useCompetitorDelete from '@competitor/hooks/useCompetitorDelete';

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
  const [selectedItems, setSelectedItems] = useState<Quote[]>([]);

  //get current selected
  useEffect(() => {
    const nPage = itemsList.filter((o: Quote) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedItems?.concat(nPage));
    setSelectedItems(nSelected.filter((o: Quote) => checkedIds.includes(o.id)));
  }, [itemsList, checkedIds]);

  //hooks
  const mDelete = useCompetitorDelete({ onCancel, onReload });
  const mRestore = useQuoteRestore({ onCancel, onReload }); //TODO
  const mEmpty = useQuoteEmptyRecovery({ onCancel, onReload }); //TODO

  //restore deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
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
    </>
  );
};

export default FloatToolbar;
