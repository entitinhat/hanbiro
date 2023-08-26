import { NavItemType } from '@base/types/menu';

export const navItems: NavItemType[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    license: 'dashboard',
    type: 'item',
    url: '/analytic',
    icon: {
      icon: 'dashboard',
      iconType: 'main',
      color: '#3ba0cf'
    }
  },
  {
    id: 'project',
    license: 'project',
    title: 'ncrm_common_menu_project',
    type: 'item',
    url: '/project/project',
    icon: {
      icon: 'activity',
      iconType: 'main',
      color: '#e69395'
    }
  },
  {
    id: 'mywork',
    license: 'my_work',
    title: 'ncrm_common_menu_my_work',
    type: 'item',
    url: '/activity/mywork',
    icon: {
      icon: 'activity',
      iconType: 'main',
      color: '#e69395'
    }
  },
  {
    id: 'desk',
    license: 'desk',
    title: 'ncrm_common_menu_desk',
    type: 'item',
    url: '/mdesk',
    icon: {
      icon: 'desk',
      iconType: 'main',
      color: '#ffb866'
    }
  },
  {
    id: 'campaign',
    license: 'campaign',
    title: 'Campaign', //ncrm_common_menu_campaign
    type: 'item',
    url: '/campaign',
    icon: {
      icon: 'campaign',
      iconType: 'main',
      color: '#ffb866'
    }
  },
  {
    id: 'customer',
    license: 'customer',
    title: 'ncrm_common_menu_customer',
    type: 'item',
    url: '/customer',
    icon: {
      icon: 'customer',
      iconType: 'main',
      color: '#93bbe7'
    }
  },
  {
    id: 'product',
    license: 'product',
    title: 'ncrm_common_menu_product',
    type: 'item',
    url: '/product',
    icon: {
      icon: 'product',
      iconType: 'main',
      color: '#bcdc97'
    }
  },
  // {
  //   id: 'quote',
  //   title: 'ncrm_common_menu_quote',
  //   type: 'item',
  //   url: '/quote',
  //   icon: {
  //     icon: 'quote',
  //     iconType: 'main',
  //     color: '#9e9e9e'
  //   }
  // },
  {
    id: 'lead',
    title: 'ncrm_common_menu_lead',
    license: 'lead',
    type: 'item',
    url: '/lead',
    icon: {
      icon: 'lead',
      iconType: 'main',
      color: '#9e9e9e'
    }
  },
  {
    id: 'opportunity',
    license: 'opportunity',
    title: 'ncrm_common_menu_opportunity',
    type: 'item',
    url: '/opportunity',
    icon: {
      icon: 'opportunity',
      iconType: 'main',
      color: '#9e9e9e'
    }
  }
];

const menuItems: { items: NavItemType[] } = {
  items: [
    {
      id: 'Main',
      title: 'Menu',
      type: 'group',
      children: [
        ...navItems,
        {
          id: 'favorite',
          title: 'Favorite',
          type: 'collapse',
          icon: {
            icon: 'Star',
            iconType: 'feather',
            color: '#fdc414'
          },
          children: [
            {
              id: 'account',
              title: 'Account',
              type: 'item',
              url: '/dashboard/default'
            },
            {
              id: 'product_list',
              title: 'Product List',
              type: 'item',
              url: '/dashboard/analytics'
            }
          ]
        }
      ]
    }
  ]
};

export default menuItems;
export const navSettingsItems: NavItemType[] = [
  {
    id: 'admin-general',
    license: 'admin_settings_general',
    title: 'ncrm_common_admin_menu_general',
    type: 'item',
    url: '/settings/general'
  },
  {
    id: 'admin-preferences',
    license: 'admin_settings_preferences',
    title: 'ncrm_common_admin_menu_preferences',
    type: 'item',
    url: '/settings/preferences'
  },
  {
    id: 'admin-templates',
    license: 'admin_settings_template',
    title: 'ncrm_common_admin_menu_templates',
    type: 'item',
    url: '/settings/template/email'
  },
  {
    id: 'admin-baselayout',
    license: 'admin_settings_pagelayout',
    title: 'ncrm_common_admin_menu_page_layout',
    type: 'item',
    url: '/customer'
  },
  {
    id: 'admin-site',
    license: 'admin_settings_sites',
    title: 'ncrm_common_admin_menu_site',
    type: 'item',
    url: '/settings/sites/desk'
  },
  {
    id: 'admin-online-digital',
    license: 'admin_settings_digital',
    title: 'ncrm_common_admin_menu_online_digital',
    type: 'item',
    url: '/settings/digital'
  },
  {
    id: 'admin-bill-license',
    license: 'admin_settings_bill_license',
    title: 'ncrm_common_admin_menu_bill_license',
    type: 'item',
    url: '/settings/billing-license'
  },
  {
    id: 'admin-users-groups',
    license: 'admin_settings_users_groups',
    title: 'ncrm_common_admin_menu_manage_users_groups',
    type: 'item',
    url: '/settings/manage-users-groups'
  },
  {
    id: 'admin-manage-access',
    license: 'admin_settings_manage_access',
    title: 'ncrm_common_admin_menu_manage_access',
    type: 'item',
    url: '/settings/assignment/rule'
  },
  {
    id: 'admin-assignment-rule',
    license: 'settings_rtp_assignment_rule',
    title: 'ncrm_common_admin_menu_assignment_rule',
    type: 'item',
    url: '/settings/assignment/rule'
  },
  {
    id: 'admin-business-process',
    license: 'settings_rtp_business_process',
    title: 'ncrm_common_admin_menu_business_process',
    type: 'item',
    url: '/process/business'
  },
  {
    id: 'admin-auto-rule',
    license: 'settings_rtp_automation_rule',
    title: 'ncrm_common_admin_menu_auto_rule',
    type: 'item',
    url: '/process/automation_rule'
  },
  {
    id: 'admin-step-trigger-attribute',
    license: 'settings_rtp_step_trigger_attribute',
    title: 'ncrm_common_admin_menu_step_trigger_attribute',
    type: 'item',
    url: '/process/setting'
  }
];
