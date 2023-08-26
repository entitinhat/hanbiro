import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import UseMenuSiteMutation from '@settings/sites/hooks/useMenuSiteMutation';
import { FilterInput } from '@base/types/common';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  filter?: FilterInput;
}

const BottomToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, filter, ...restProps } = props;
  const { mutationDelete } = UseMenuSiteMutation(filter);

  // useEffect(() => {
  //   if (isSuccess) {
  //     onCancel();
  //   }
  // }, [isSuccess]);

  const items: LabelValueIcon[] = [
    {
      label: 'Delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {
        mutationDelete({ ids: checkedIds });
        onCancel && onCancel();
      }
    }
  ];

  return <>{!!checkedIds?.length && <BaseListBottomToolbar items={items} checkedIds={checkedIds} onCancel={onCancel} {...restProps} />}</>;
};

export default BottomToolbar;
