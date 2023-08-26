import React, { useState, Suspense, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useMatch, Navigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLanguageByMenu } from '@base/services/i18n'; //getLanguageByMenu
import { MENU_CUSTOMER, MENU_CUSTOMER_ALL } from '@base/config/menus';
import { customerListFilterState } from '@customer/store/atom/customer';
// import ListPage from '@customer/pages/list';
//import ViewPage from '@customer/customer/pages/view';
import { useUserSettings } from '@base/services';
import { deviceAtom, selectionFieldsAtom } from '@base/store/atoms/app';
import { ListType } from '@base/types/app';
import { Typography, Box } from '@mui/material';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { Helmet } from 'react-helmet-async';
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import { CUSTOMER_CATEGORY_ALL } from '@customer/config/constants';
import Loader from '@base/components/App/Loader';

//menu import
import ListPage from '@customer/pages/ListPage';
import ViewPage from '@customer/pages/ViewPage';
import { useSelectionFieldItems } from '@settings/general/hooks/useSelectionFieldItems';

const CustomerMainPage = () => {
  //get lang
  useLanguageByMenu([MENU_CUSTOMER]);

  //get page setting
  const params = useParams();
  const aParams = params['*'] ? params['*'].split('/') : [CUSTOMER_CATEGORY_ALL];
  const pageDataKey = `${MENU_CUSTOMER}_${aParams[0]}`;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);
  const [selectionFields, setSelectionFields] = useRecoilState(selectionFieldsAtom);

  //get selection fields for customer
  const { data: fieldData } = useSelectionFieldItems({ keyNames: ['customer_category', 'contact_type'] });

  //init states list
  useEffect(() => {
    if (fieldData?.data) {
      setSelectionFields({
        ...selectionFields,
        ['customer_category']: fieldData.data.filter((_ele: any) => _ele.keyRoot === 'customer_category'),
        ['contact_type']: fieldData.data.filter((_ele: any) => _ele.keyRoot === 'contact_type')
      });
    }
  }, [fieldData]);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>VoraDesk &gt; Customer</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path=":category"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_CUSTOMER}_${category}` : MENU_CUSTOMER)}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    <SplitView leftPane={<ListPage isSplitMode />} rightPane={<EmptySplitView />} />
                  ) : (
                    <ListPage isSplitMode={false} />
                  );
                }}
              </SplitViewContainer>
            }
          />
          <Route
            path=":category/:id/*"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_CUSTOMER}_${category}` : MENU_CUSTOMER)}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    <SplitView
                      leftPane={<ListPage isSplitMode />}
                      rightPane={
                        <Box className="pane-content" sx={{ flex: 1 }}>
                          <Suspense fallback={<></>}>
                            <ViewPage isSplitMode />
                          </Suspense>
                        </Box>
                      }
                    />
                  ) : (
                    <Suspense fallback={<></>}>
                      <ViewPage isSplitMode={false} />
                    </Suspense>
                  );
                }}
              </SplitViewContainer>
            }
          />
          <Route path="/" element={<Navigate replace to={`/${MENU_CUSTOMER}/${CUSTOMER_CATEGORY_ALL}`} />} />
        </Routes>
      )}
    </Suspense>
  );
};

export default CustomerMainPage;
