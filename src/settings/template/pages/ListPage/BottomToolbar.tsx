import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import useMenuTemplateMutation from '@settings/template/hooks/useMenuTemplateMutation';
import { useListQueryKeyTemplate } from '@settings/template/hooks/useListQueryKeyTemplate';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  groupTemplate: string;
}

const BottomToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, category, groupTemplate, ...restProps } = props;
  const filter = useListQueryKeyTemplate(category, groupTemplate);
  const { mutationDelete } = useMenuTemplateMutation(filter);

  const items: LabelValueIcon[] = [
    {
      label: 'ncrm_setting_template_delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {
        mutationDelete({ ids: checkedIds });
        onCancel && onCancel();
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

export default BottomToolbar;
