import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';

import { useEffect } from 'react';
import { useOrg } from '@base/hooks/iam/useOrg';
import { useDeleteUsers } from '../../hooks/useDeleteUsers';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  refetch?: () => void;
}

const QuickToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, refetch, ...restProps } = props;
  const mDelete = useDeleteUsers(checkedIds.length);
  const { id:OrgId } = useOrg();

  useEffect(() => {
    if (mDelete.isSuccess) {
      refetch && refetch();
      onCancel && onCancel();
    }
  }, [mDelete.isSuccess]);

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
            orgId: OrgId,
            id
          };
        });
        mDelete.mutate(params);
      }
    }
  ];

  return (
    <>
      {!!checkedIds?.length && (
        <BaseListBottomToolbar
          sx={{
            top: 145,
            left: 214
          }}
          items={items}
          checkedIds={checkedIds}
          onCancel={onCancel}
          {...restProps}
        />
      )}
    </>
  );
};

export default QuickToolbar;
