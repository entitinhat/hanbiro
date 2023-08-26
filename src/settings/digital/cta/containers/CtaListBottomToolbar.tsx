import { useEffect } from 'react';

//material
import { Delete, Download } from '@mui/icons-material';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { LabelValueIcon } from '@base/types/app';

//menu
import { useCtaMutations } from '@settings/digital/cta/hooks/useCtaMutations';
import { useTranslation } from 'react-i18next';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean; //TODO - when groupby deleted selected
  onReload?: () => void;
  isSplitMode?: boolean;
}

const CtaListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { isSplitMode, category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;

  //hooks
  const { t } = useTranslation();
  const { mDelete } = useCtaMutations();

  useEffect(() => {
    if (mDelete.isSuccess) {
      onCancel && onCancel();
      onReload && onReload();
    }
  }, [mDelete.isSuccess]);

  // deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];
  quickButtons = quickButtons.concat([
    {
      label: t('ncrm_generalsetting_cta_export'),
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
  );
};

export default CtaListBottomToolbar;
