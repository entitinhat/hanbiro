import { useTenant } from '@base/hooks/iam/useTenant';
import { useMe } from '@base/hooks/iam/useMe';
import { User, Tenant } from '@base/types/iam';

import _ from 'lodash';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import { AuthProps } from '@base/types/auth';
import Loader from '@base/components/App/Loader';
import { useAvailableMenusLicense } from '@base/hooks/license/useAvailableMenusLicens';
import { licenseMenuAtom } from '@base/store/atoms/licenseMenu';
import { MenuLicense } from '@base/types/license';
import { ALL_ROUTE_MENUS, ALL_SETTING_ROUTE_MENUS, MAIN_MENU, SETTING_MENU } from './config';
import { NavItemType } from '@base/types/menu';
import { navItems, navSettingsItems } from '@base/config/menuItems';

type LicenseProviderProps = {
  children: ReactNode;
};
const defaultLicenseMenu = {
  id: 'unknown',
  license: '',
  title: '',
  type: 'item',
  url: '/unknown'
};
export default function LicenseProvider({ children }: LicenseProviderProps) {
  const { data: MenuData, isLoading: isLicenseLoading } = useAvailableMenusLicense();
  const [licenseMenu, setLicenseMenu] = useRecoilState(licenseMenuAtom);

  const getMainMenu = (liceseMenudata: MenuLicense[]) => {
    //Default format Data from server
    let mainLicenseMenu = liceseMenudata?.filter((menu: MenuLicense) => {
      return MAIN_MENU.includes(menu.value);
    });
    //Convert to NavItem format
    const navItemsMainMenu = mainLicenseMenu?.map((menu: MenuLicense) => {
      const newFormatMenu = navItems.find((_m: NavItemType) => {
        return _m.license == menu.value;
      });
      if (newFormatMenu) {
        return newFormatMenu;
      }
      return {
        ...defaultLicenseMenu,
        license: menu.value,
        title: menu.label
      };
    });
    return {
      navItemsMainMenu: navItemsMainMenu,
      mainLicenseMenu: mainLicenseMenu
    };
  };

  const getSettingMenu = (liceseMenudata: MenuLicense[]) => {
    //Default format Data from server
    const settingsLicenseMenu = liceseMenudata.filter((menu: MenuLicense) => {
      return SETTING_MENU.includes(menu.value);
    });
    //Convert  to NavItem format
    const navItemsSettingMenu = settingsLicenseMenu.map((menu: MenuLicense) => {
      let newFormatChildren = menu.children.map((child: MenuLicense) => {
        const newFormatMenu = navSettingsItems.find((_m: NavItemType) => {
          return _m.license == child.value;
        });
        if (newFormatMenu) {
          return newFormatMenu;
        }
        return {
          id: child.value,
          title: child.label
        };
      });
      return {
        ...defaultLicenseMenu,
        license: menu.value,
        title: menu.label,
        children: newFormatChildren
      };
    });

    return {
      navItemsSettingMenu,
      settingsLicenseMenu
    };
  };

  const getPageRoute = (pageLicenseMenu: MenuLicense[]) => {
    let mainPageRoute = {};
    pageLicenseMenu.forEach((menu: MenuLicense) => {
      let allowMenu: string[] = [];
      if (menu?.children) {
        allowMenu = menu?.children?.map((_m) => {
          return _m.value;
        });
      } else {
        allowMenu = [menu.value];
      }
      //Get Sub menus by parent key
      const allRoute = ALL_ROUTE_MENUS[menu.value as string];
      const allowRouteMenu = allRoute?.filter((_r: { value: string; label: string; path: string; license: string }) => {
        return allowMenu?.includes(_r.license);
      });
      mainPageRoute = { ...mainPageRoute, [menu.value]: allowRouteMenu ?? [] };
      // console.log('Check All Route', mainPageRoute);
    });
    return mainPageRoute;
  };
  const getSettingRoute = (allSettingLicense: MenuLicense[]) => {
    // console.clear();
    // console.log('Check All Setting License ', allSettingLicense);
    let settingPageRoute = {};
    allSettingLicense.forEach((menu: MenuLicense) => {
      let allowMenu: string[] = [];
      if (menu?.children) {
        allowMenu = menu?.children?.map((_m) => {
          return _m.value;
        });
      } else {
        allowMenu = [menu.value];
      }
      //Get Sub menus by parent key
      const allSettingRouteMenu = ALL_SETTING_ROUTE_MENUS[menu.value as string];
      const allowSettingRouteMenu = allSettingRouteMenu?.map((_r) => {
        const allowChildMenu = _r?.children?.filter((_m) => allowMenu?.includes(_m?.license ?? ''));
        return { ..._r, children: allowChildMenu ?? [] };
      });
      settingPageRoute = { ...settingPageRoute, [menu.value]: allowSettingRouteMenu ?? [] };
      console.log('Check Setting All Route', settingPageRoute);
    });

    return settingPageRoute;
  };

  useEffect(() => {
    if (MenuData && MenuData?.data) {
      const liceseMenudata = MenuData.data;

      const { navItemsMainMenu, mainLicenseMenu } = getMainMenu(liceseMenudata);
      const { navItemsSettingMenu, settingsLicenseMenu } = getSettingMenu(liceseMenudata);

      const mainPageRoute = getPageRoute(mainLicenseMenu);

      let allSettingLicense: MenuLicense[] = [];
      settingsLicenseMenu.forEach((menu: MenuLicense) => {
        if (menu.children) {
          allSettingLicense = [...allSettingLicense, ...menu.children];
        }
      });
      const settingPageRoute = getSettingRoute(allSettingLicense);

      const result = {
        mainMenu: navItemsMainMenu,
        settingMenu: navItemsSettingMenu,
        mainPageRoute: mainPageRoute,
        settingPageRoute: settingPageRoute
      };

      //==============================Debug =======================================
      // console.clear();
      // console.log('navItemsMainMenu', navItemsMainMenu);
      // console.log('mainLicenseMenu', mainLicenseMenu);
      // console.log('navItemsSettingMenu', navItemsSettingMenu);
      // console.log('settingsLicenseMenu', settingsLicenseMenu);
      // console.log('mainPageRoute', mainPageRoute);
      //===============================================================================
      setLicenseMenu(result);
    }
  }, [JSON.stringify(MenuData)]);
  console.log('%cInitial Licens Menu Route', 'color: blue', licenseMenu);
  // console.log('Initial Licens Menu Route', licenseMenu);
  return (
    <>
      {isLicenseLoading ? <Loader /> : <></>}
      {!isLicenseLoading && children}
    </>
  );
}
