import React from 'react';
import AssignRepContainer from '@base/containers/AssignRepContainer';
import { useAssignRep } from '@product/product/hooks/useAssignRep';
import { User } from '@base/types/user';
import { useAssignRepMutation } from '@product/product/hooks/useAssignRepMutation';
import { queryKeys } from '@product/product/config/queryKeys';

interface Props {
  menuSourceId: string;
}

const AssignRep = (props: Props) => {
  const { menuSourceId } = props;

  const { data, isLoading, refetch } = useAssignRep({ prodId: menuSourceId });

  const { mAssignRep, mDeleteRep } = useAssignRepMutation(true, [menuSourceId]);

  const handleOnAssign = (user: User, callBack?: any) => {
    //check exist before add
    const foundUser = data?.results?.find((_ele: any) => {
      return _ele?.id === user.id;
    });
    if (foundUser) return;

    const params: any = {
      ids: [menuSourceId],
      assignTo: [
        {
          user: {
            id: user.id,
            name: user.name
          },
          group: {}
        }
      ]
    };
    mAssignRep.mutate(params);
  };

  const handleOnDelete = (user: User, callBack?: any) => {
    let params: any = {
      ids: [menuSourceId],
      refIds: [user?.id]
    };
    mDeleteRep.mutate(params);
    // callBack && callBack();
  };
  // console.log('Check Item Name -> Product View Page', data?.results);

  return <AssignRepContainer items={data?.results ?? []} onAssign={handleOnAssign} onDelete={handleOnDelete} onRefetch={refetch} />;
};

export default AssignRep;
