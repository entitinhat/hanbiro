import React, { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ViewLayout from '@base/layouts/ViewLayout';

import { useOrg } from '@base/hooks/iam/useOrg';
import { useUser } from '../../hooks/useUser';
import Center from './Center';
import { useUserMutation } from '../../hooks/useUserMutation';
import Left from './Left';
import Header from './Header';

interface ViewProps {}

const ViewPage = (props: ViewProps) => {
  // params

  const params = useParams();
  const menuSource = 'user';
  const menu = 'users';
  const menuSourceId = params.id as string;

  //=================================================+Get Data================================================
  const { id: orgId } = useOrg();
  //get QueryData
  const req = {
    orgId: orgId,
    id: menuSourceId
  };
  const { data, refetch } = useUser(req);
  const { mUpdate } = useUserMutation();
  const layoutData = useMemo(() => {
    if (data) return data;
  }, [data]);
  //=========================================================================================================
  useEffect(() => {
    if (mUpdate.isSuccess) {
      // console.log('update success');
      refetch && refetch();
    }
  }, [mUpdate.isSuccess]);

  const handleSave = (keyName: string, isSuccess: boolean, value: any) => {
    // console.log(' submit value', keyName, value);
    // delete value
    let nValue: any = value;
    let nkeyName: string = keyName;
    if (keyName == 'contact') {
      nValue = value.contact;
      if (typeof nValue === 'object') {
        nkeyName = Object.keys(nValue).join(',');
      }
    }

    mUpdate.mutate({
      input: { ...nValue, orgId: orgId, id: menuSourceId }
    });
  };

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
