import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as keyNames from '@settings/users-groups/groups/config/keyNames';
import ViewLayout from '@base/layouts/ViewLayout';

import { useOrg } from '@base/hooks/iam/useOrg';

import Center from './Center';

import Left from './Left';
import Header from './Header';
import { useGroupMutation } from '../../hooks/useGroupMutation';
import { GetGroupRequest, Group } from '../../types/group';
import { useGroup } from '../../hooks/useGroup';

interface ViewProps {}

const ViewPage = (props: ViewProps) => {
  // params

  const [layoutData, setLayoutData] = useState<Group>();

  const params = useParams();
  const menuSource = 'group';
  const menuSourceId = params?.id as string;
  const menu = 'groups';
  const { mUpdate } = useGroupMutation();
  // const { GetGroup, ListMemberships } = useGroupQuery();
  const orgID = useOrg().id;
  const req: GetGroupRequest = {
    orgId: orgID,
    id: menuSourceId
  };

  const { data, refetch } = useGroup(req);

  const handleSave = (keyName: string, isSuccess: boolean, value: any) => {
    if (keyName == keyNames.KEY_GROUPS_MEMBERSHIPS) {
      //I call api update membership inside component MembershipView and i just only need refetch to get new data from server and update UI
      refetch && refetch();
    } else {
      mUpdate.mutate({
        input: {
          ...value,
          orgId: orgID,
          id: menuSourceId
        }
      });
    }
  };

  useEffect(() => {
    if (mUpdate.isSuccess) {
      // console.log('update success');
      refetch && refetch();
    }
  }, [mUpdate.isSuccess]);

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(layoutData)) {
      setLayoutData(data);
    }
  }, [data]);

  //================================================+++Debug++=============================================
  // console.log('users-groups USER detail', layoutData);

  //===================================================Render==================================
  const HeaderMemo = useMemo(() => {
    return <Header menu={menu} menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [menu, layoutData]);
  const LeftMemo = useMemo(() => {
    return <Left handleSave={handleSave} menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={[]} />;
  }, [layoutData]);

  const CenterMemo = useMemo(() => {
    if (layoutData)
      return (
        <Center refetch={refetch} handleSave={handleSave} menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />
      );
  }, [layoutData, data]);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} />;
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
