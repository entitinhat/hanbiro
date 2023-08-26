import React from 'react';

//project
import AssignRepContainer from '@base/containers/AssignRepContainer';

//menu
import useQuoteAssignReps from '@quote/hooks/useQuoteAssignReps';
import {
  useQuoteAssignRepCreate,
  useQuoteAssignRepDelete
} from '@quote/hooks/useQuoteAssignRepMutation';

interface Props {
  menuSourceId: string;
}

const AssignRep = (props: Props) => {
  const { menuSourceId } = props;

  const { data, isLoading, refetch } = useQuoteAssignReps(menuSourceId);
  const mutationCreate = useQuoteAssignRepCreate();
  const mutationDelete = useQuoteAssignRepDelete();
  //console.log('reps data', data);

  //add new assign
  const handleCreateAssign = (item: any) => {
    //check exist before add
    const foundIdx = data?.data?.findIndex((_ele: any) => _ele.id === item?.id) || -1;
    if (foundIdx > -1) return;
    const params: any = {
      ids: [menuSourceId],
      assignTo: [
        {
          user: {
            id: item.id,
            name: item.name
          },
          group: {}
        }
      ]
    };
    mutationCreate.mutate(params);
  };

  //delete customer contact
  const handleDeleteAssign = (item: any, cb: any) => {
    let params: any = {
      ids: [menuSourceId],
      refIds: [item.id]
    };
    mutationDelete.mutate(params);
    //callback
    cb && cb();
  };

  //render
  return (
    <AssignRepContainer
      items={data?.data || []}
      onAssign={handleCreateAssign}
      onDelete={handleDeleteAssign}
      //onRefetch={refetch}
    />
  );
};

export default AssignRep;
