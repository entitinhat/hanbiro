import React from 'react';
import CommonViewField from '@base/containers/ViewField/Common';
import { useRecoilValue } from 'recoil';
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus';
// import { viewDataByMenuAtom } from '@base/recoil/atoms';
import { viewDataByMenuAtom } from '@base/store/atoms';
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import { LANDING_PAGE_PUBLISH_LATER } from '@settings/digital/landing-page/config/constants';

import View from './View';
import Edit from './Edit';

const PublishDateViewField: React.FC = (props: any) => {
  const { keyName, value, menuSource, menuSourceId } = props;

  const viewData = useRecoilValue(viewDataByMenuAtom(MENU_SETTING_LANDINGPAGE));

  const basicFields = viewData?.layout?.data?.[0]?.children ?? [];
  const publishData = basicFields?.find(
    (_field: any) => _field?.keyName === keyNames.KEY_NAME_LANDING_PAGE_PUBLISH,
  );

  const userPermission =
    publishData?.data === LANDING_PAGE_PUBLISH_LATER
      ? { isShow: true, isEdit: true }
      : { isShow: true, isEdit: false };

  return (
    <CommonViewField
      keyName={keyName}
      value={value}
      menuSource={menuSource}
      menuSourceId={menuSourceId}
      userPermission={userPermission}
      componentView={View}
      componentEdit={Edit}
    />
  );
};

export default PublishDateViewField;