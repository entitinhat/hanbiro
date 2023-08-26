import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from "@base/components/@hanbiro/List/ListBottomToolbar";
import { Delete } from "@mui/icons-material";
import { LabelValueIcon } from "@base/types/app";
import { useLandingPageDelete } from '@settings/digital/landing-page/hooks/useLandingPageMutations';
import { useTranslation } from 'react-i18next';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean; 
  onReload?: () => void;
}

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;
  const { t } = useTranslation();
  const mDelete = useLandingPageDelete();

  //deleted items
  const handleDelete = () => {
    mDelete.mutate(
      { ids: checkedIds },
      {
        onSuccess() {
          onCancel && onCancel();
          onReload && onReload()
        }
      }
      );
  }

  //buttons
  let quickButtons: LabelValueIcon[] = [
    {
      label: t('ncrm_common_btn_delete'),
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete,
    }
  ];

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