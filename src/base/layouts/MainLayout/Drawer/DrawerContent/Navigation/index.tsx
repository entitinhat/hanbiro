import menuItem from '@base/config/menuItems';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';
import { Box } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';

import NavGroup from './NavGroup';

const Navigation = () => {
  const { mainMenu } = useRecoilValue(licenseMenuAtom);
  const navGroups = mainMenu.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return <React.Fragment key={item.id}></React.Fragment>;
    }
  });

  return <Box>{navGroups}</Box>;
};

export default Navigation;
