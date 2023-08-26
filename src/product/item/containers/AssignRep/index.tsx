import React from 'react';
import AssignRepContainer from '@base/containers/AssignRepContainer';
import { User } from '@base/types/user';

import { useAssignRep } from '@product/item/hooks/useAssignRep';
import { useAssignRepMutation } from '@product/item/hooks/useAssignRepMutation';

interface Props {
  menuSourceId: string;
}

const AssignRep = (props: Props) => {
  const { menuSourceId } = props;

  const { data, isLoading, refetch } = useAssignRep({ itemId: menuSourceId });

  const { mAssignRep, mDeleteRep } = useAssignRepMutation(true, [menuSourceId]);

  const handleOnAssign = (user: User, callBack?: any) => {
    //check exist before add
    const foundUser = data?.results?.find((_ele: any) => {
      return _ele.id === user.id;
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

  return <AssignRepContainer items={data?.results ?? []} onAssign={handleOnAssign} onDelete={handleOnDelete} onRefetch={refetch} />;
};

export default AssignRep;
