import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { GroupQuickView, UserQuickView } from '@base/containers/QuickView';
import { IdName } from '@base/types/common';

interface props {
  assignedRep?: IdName[];
  assignType: string;
}

function AssignRepMenu(props: props) {
  const { assignedRep, assignType } = props;

  return (
    <ListTableCellDroplist
      showAvatar={false}
      values={assignedRep ?? []}
      cellComponent={(item: any) => (
        <>
          {assignType === 'ATYPE_USER' && <UserQuickView value={{ id: item?.id, name: item?.name }} />}
          {assignType === 'ATYPE_GROUP' && <GroupQuickView value={{ id: item?.id, name: item?.name }} />}
        </>
      )}
    />
  );
}

export default AssignRepMenu;
