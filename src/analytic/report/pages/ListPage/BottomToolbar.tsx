import { useEffect } from 'react';
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_ANALYTIC_REPORT } from '@base/config/menus';
import useReportMutation from '@analytic/report/hooks/useReportMutation';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {}

const BottomToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, ...restProps } = props;
  const { listQueryKey } = useListQueryKeys(MENU_ANALYTIC_REPORT);
  const { mDeleteReport } = useReportMutation(listQueryKey);

  useEffect(() => {
    if (mDeleteReport.isSuccess) {
      onCancel();
    }
  }, [mDeleteReport.isSuccess]);

  const items: LabelValueIcon[] = [
    {
      label: 'Delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {
        mDeleteReport.mutate({ ids: checkedIds });
      }
    }
  ];

  return (
    <>
      {!!checkedIds?.length && (
        <BaseListBottomToolbar items={items} checkedIds={checkedIds} onCancel={onCancel} {...restProps} visible={checkedIds.length > 0} />
      )}
    </>
  );
};

export default BottomToolbar;
