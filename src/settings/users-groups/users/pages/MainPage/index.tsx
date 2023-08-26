import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import ListPage from '../ListPage';
import ViewPage from '../ViewPage';

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title> VoraWorks &gt; Users Setting</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path=":id" element={<ViewPage />} />
        {/* <Route path="/profile" element={<ViewProfilePage />} */}
      </Routes>
    </>
  );
};

export default MainPage;
