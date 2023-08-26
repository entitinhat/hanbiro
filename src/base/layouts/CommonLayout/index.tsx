import { Outlet } from 'react-router-dom';

export interface LoaderProps {}

// ==============================|| MINIMAL LAYOUT ||============================== //

const CommonLayout = ({ layout = 'blank' }: { layout?: string }) => {
  console.log('guest common layout');
  return <>{layout === 'blank' && <Outlet />}</>;
};

export default CommonLayout;
