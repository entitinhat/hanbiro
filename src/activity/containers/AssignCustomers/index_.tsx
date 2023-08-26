import _ from 'lodash';

import useAssignCustomerMutate from '@activity/hooks/useAssginCustomerMutation';
import { useAssignedCustomers } from '@activity/hooks/useAssignedCustomers';
import { UserOrCustomer } from '@activity/types/activity';
import AssignCustomersContainer from '@customer/containers/AssignCustomersContainer';

interface AssignCustomersProps {
  placement?: string;
  menuSource: string;
  menuSourceId: string;
  menuSourceName?: string;
  menuTab?: string;
  menuType?: string;
}

function AssignCustomers(props: AssignCustomersProps) {
  const { placement, menuSource, menuSourceId, menuSourceName, menuTab, menuType } = props;
  const { data, isLoading } = useAssignedCustomers(menuSourceId);
  const { mAddCustomer, mDeleteCustomer } = useAssignCustomerMutate();
  const onAssignTo = (item: any) => {
    if (_.isEmpty(item)) return;

    const is = data?.results?.findIndex((v) => v.id == item.id) != -1;
    if (is) return;

    const assignTo: UserOrCustomer = {
      type: item.category == 'CATEGORY_ACCOUNT' ? 'TYPE_ACCOUNT' : 'TYPE_CONTACT',
      id: item.id,
      name: item.name
    };

    const params = {
      assignTo: [assignTo],
      type: 'ASSIGN_TO_TYPE_TO',
      id: menuSourceId
    };
    mAddCustomer.mutate(params);
  };

  const onDeleteAssignTo = (item: any) => {
    //remove
    const params = {
      id: menuSourceId,
      type: 'ASSIGN_TO_TYPE_TO',
      assignTo: [item.id]
    };
    mDeleteCustomer.mutate(params);
  };

  return (
    <AssignCustomersContainer
      items={data?.results || []}
      placement={placement}
      isLoading={isLoading}
      menuSource={menuSource}
      menuSourceId={menuSourceId}
      menuSourceName={menuSourceName}
      menuTab={menuTab}
      menuType={menuType}
      onAssign={onAssignTo}
      onDelete={onDeleteAssignTo}
      sendMail={true}
      sendSms={true}
    />
  );
}

AssignCustomers.defaultProps = {
  placement: 'right',
  menuSource: '',
  menuSourceId: '',
  menuSourceName: '',
  menuTab: 'activity', //on url
  menuType: ''
};

export default AssignCustomers;
