import { useEffect } from 'react';
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import { useAssignRulesDelete } from '@settings/assignment-rule/rule/hooks/useAssignRulesDelete';
import { useTranslation } from 'react-i18next';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps { }

const BottomToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, isSplitMode, ...restProps } = props;
  const { mutationDelete, isSuccess } = useAssignRulesDelete();
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess) {
      onCancel();
    }
  }, [isSuccess]);

  const items: LabelValueIcon[] = [
    {
      label: t('ncrm_common_btn_delete'),
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {
        mutationDelete({ ids: checkedIds });
      }
    }
  ];

  return <>{!!checkedIds?.length && <BaseListBottomToolbar sx={{ height: '55px', padding: '10px' }} items={items} checkedIds={checkedIds} onCancel={onCancel} {...restProps} />}</>;
};

export default BottomToolbar;
