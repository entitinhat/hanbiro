import { MENU_DESK_TICKET, MENU_SETTING_LANDINGPAGE } from '@base/config/menus';

interface MenuAPI {
  /** mutationKey for update field */
  mutationKey: string;
  /** variableKey will set value for update */
  variableKey: string;
}

interface ViewFieldAPI {
  [key: string]: MenuAPI;
}

const VIEW_FIELD_API_CONFIG_PUBLIC: ViewFieldAPI = {
  [MENU_DESK_TICKET]: {
    mutationKey: 'site_updateTicket',
    variableKey: 'ticket'
  },
  [MENU_SETTING_LANDINGPAGE]: {
    mutationKey: 'setting_updateLandingPage',
    variableKey: 'landingPage'
  }
};

export default VIEW_FIELD_API_CONFIG_PUBLIC;
