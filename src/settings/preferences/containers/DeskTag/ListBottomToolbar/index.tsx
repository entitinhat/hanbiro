import BaseListBottomToolbar, { ListBottomToolbarProps as BaseListBottomToolbarProps } from './ListBottomToolbarBase';
import { Delete } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import { useDeskTagMutation } from '@settings/preferences/hooks/desk/useDeskTagMutation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {}

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, ...restProps } = props;
  const { t } = useTranslation();

  const { mDelete } = useDeskTagMutation();

  useEffect(() => {
    if (mDelete.isError) {
      onCancel();
    }
  }, [mDelete.isError]);

  const items: LabelValueIcon[] = [
    {
      label: t('ncrm_common_btn_delete'),
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {
        mDelete.mutate({ ids: checkedIds });
        onCancel();
      }
    }
  ];

  return <BaseListBottomToolbar visible={!!checkedIds?.length} items={items} checkedIds={checkedIds} onCancel={onCancel} {...restProps} />;
};

export default ListBottomToolbar;
