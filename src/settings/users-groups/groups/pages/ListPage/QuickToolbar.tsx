import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import { useEffect } from 'react';
import { useDeleteGroups } from '../../hooks/useDeleteGroups';
import { useOrg } from '@base/hooks/iam/useOrg';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  refetch?: () => void;
}

const QuickToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, refetch, ...restProps } = props;
  const mDeleteGroups = useDeleteGroups(checkedIds.length);
  const orgId = useOrg().id;
  const items: LabelValueIcon[] = [
    {
      label: 'Delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {
        const params: any = {};
        checkedIds.map((id, idx) => {
          const num = idx + 1;
          params[`input${num}`] = {
            orgId: orgId,
            id
          };
        });
        mDeleteGroups.mutate(params);
      }
    }
  ];
  useEffect(() => {
    if (mDeleteGroups.isSuccess) {
      refetch && refetch();
      onCancel && onCancel();
    }
  }, [mDeleteGroups.isSuccess]);

  return <>{!!checkedIds?.length && <BaseListBottomToolbar items={items} checkedIds={checkedIds} onCancel={onCancel} {...restProps} />}</>;
};

export default QuickToolbar;
