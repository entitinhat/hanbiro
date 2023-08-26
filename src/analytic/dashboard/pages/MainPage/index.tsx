import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { useLanguageByMenu } from '@base/services/i18n';
import { MENU_DASHBOARD } from '@base/config/menus';


const UserPage = React.lazy(() => import('../UserPage'));
const AdminPage = React.lazy(() => import('../AdminPage'));

const FirstPage = () => {
  useLanguageByMenu([MENU_DASHBOARD]);
  return (
    <>
      <Helmet>
        <title>Hanbiro CRM - Dashboard</title>
      </Helmet>
      <Routes>
        <Route index element={<Navigate replace to="/analytic/dashboard/user" />} />
        <Route
          path="/user"
          element={
            <React.Suspense fallback={<LoadingCircular loading />}>
              <UserPage />
            </React.Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <React.Suspense fallback={<LoadingCircular loading />}>
              <AdminPage />
            </React.Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default FirstPage;
