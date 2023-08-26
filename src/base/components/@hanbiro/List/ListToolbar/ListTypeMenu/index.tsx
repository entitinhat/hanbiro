import { reduce } from 'lodash';

import Dropdown from '@base/components/@hanbiro/Dropdown';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { LabelValueIcon, ListType } from '@base/types/app';

const OPTIONS: LabelValueIcon[] = [
  {
    label: 'ncrm_common_list_mode',
    value: ListType.LIST,
    icon: <FormIcon icon="List" />
  },
  {
    label: 'ncrm_common_grid_mode',
    value: ListType.GRID,
    icon: <FormIcon icon="Grid" />
  },
  {
    label: 'ncrm_common_split_mode',
    value: ListType.SPLIT,
    icon: <FormIcon icon="Sidebar" />
  },
  {
    label: 'ncrm_common_calendar_mode',
    value: ListType.CALENDAR,
    icon: <FormIcon icon="Calendar" />
  },
  {
    label: 'ncrm_common_kaban_mode',
    value: ListType.KANBAN,
    icon: <FormIcon icon="Trello" />
  }
];

export interface ListTypeMenuProps {
  allowTypes: ListType[];
  selectedType: ListType;
  onChange: (type: ListType) => void;
}

const ListTypeMenu = (props: ListTypeMenuProps) => {
  console.log('listypemenu', props);
  const { allowTypes, selectedType = ListType.LIST, onChange } = props;

  const listTypes = OPTIONS.filter((v) => {
    return allowTypes.includes(v.value as ListType);
  });

  const listTypeRefer = reduce(
    listTypes,
    function (f: any, v: LabelValueIcon) {
      f[v.value] = v;
      return f;
    },
    {}
  );

  const handleListItemClick = (v: LabelValueIcon) => {
    onChange && onChange(v.value as ListType);
  };

  return (
    <Dropdown
      size="small"
      color="secondary"
      variant="outlined"
      icon={listTypeRefer?.[selectedType]?.icon}
      disabledValues={[selectedType]}
      items={listTypes}
      onChange={handleListItemClick}
    />
  );
};

export default ListTypeMenu;
