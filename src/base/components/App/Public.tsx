import './i18nInit';

import ScrollTop from '@base/components/App/ScrollTop';
import { useRoutes } from 'react-router-dom';
import RestrictedRoutes from '@base/routes/RestrictedRoutes';

interface MainProps {}

function Public({}: MainProps) {
  return (
    <>
      <ScrollTop>
        <>{useRoutes([RestrictedRoutes])}</>
      </ScrollTop>
    </>
  );
}

export default Public;
