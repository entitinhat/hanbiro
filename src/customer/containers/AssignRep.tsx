import React from 'react';

//project
import AssignRepContainer from '@base/containers/AssignRepContainer';

//menu
import { useCustomerAssignReps, useCustomerCreateAssignRep, useCustomerDeleteRep } from '@customer/hooks/useCustomerAssignReps';

interface Props {
  menuSourceId: string;
}

const AssignRep = (props: Props) => {
  const { menuSourceId } = props;

  const { data: postResult, isLoading, refetch } = useCustomerAssignReps(menuSourceId);
  const mutationCreate = useCustomerCreateAssignRep({ customerId: menuSourceId });
  const mutationDelete = useCustomerDeleteRep({ customerId: menuSourceId });
  //console.log('postResult', postResult);

  //add new assign
  const handleCreateAssign = (item: any) => {
    if (item) {
      //check exist before add
      const foundIdx = postResult?.data?.findIndex((_ele: any) => _ele.id === item.id) || -1;
      if (foundIdx > -1) return;

      // const group =
      //   item.properties.crmGroups.length > 0
      //     ? item.properties.crmGroups[0]
      //     : item.properties.crmBaseGroup;
      const params: any = {
        ids: [menuSourceId],
        assignTo: [
          {
            user: {
              id: item.id,
              name: item.name
              //group: group,
            }
          }
        ]
      };
      mutationCreate.mutate(params);
    }
  };

  //delete customer contact
  const handleDeleteAssign = (item: any, cb: any) => {
    let params: any = {
      ids: [menuSourceId],
      repIds: [item.id]
    };
    mutationDelete.mutate(params);
    //callback
    cb && cb();
  };

  //render
  return <AssignRepContainer items={postResult?.data ?? []} onAssign={handleCreateAssign} onDelete={handleDeleteAssign} onRefetch={null} />;
};

export default AssignRep;
