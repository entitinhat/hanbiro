import { NavItemType } from '@base/types/menu';

export const TEMPLATE_MENU: NavItemType[] = [
  {
    id: 'template',
    title: 'Template',
    type: 'group',
    children: [
      {
        id: 'email',
        title: 'ncrm_setting_template_email',
        type: 'item',
        url: '/settings/template/email',
        license: 'admin_settings_template_email',
        icon: {
          icon: 'email',
          iconType: 'main',
          color: '#673ab7'
        }
      },
      {
        id: 'sms',
        title: 'ncrm_setting_template_sms',
        license: 'admin_settings_template_sms',
        type: 'item',
        url: '/settings/template/sms',
        icon: {
          icon: 'sms',
          iconType: 'main',
          color: '#db4437'
        }
      },
      {
        id: 'task',
        title: 'ncrm_setting_template_task',
        license: 'admin_settings_template_task',
        type: 'item',
        url: '/settings/template/task',
        icon: {
          icon: 'task',
          iconType: 'main',
          color: '#607d8b'
        }
      },
      {
        id: 'call',
        title: 'ncrm_setting_template_call',
        license: 'admin_settings_template_call',
        type: 'item',
        url: '/settings/template/call',
        icon: {
          icon: 'call',
          iconType: 'main',
          color: '#ff9800'
        }
      },
      {
        id: 'knowledgebase',
        title: 'ncrm_setting_template_knowledgebase',
        license: 'admin_settings_template_kb',
        type: 'item',
        url: '/settings/template/knowledgebase',
        icon: {
          icon: 'desk',
          iconType: 'main',
          color: '#009688'
        }
      },
      {
        id: 'quote',
        title: 'ncrm_setting_template_quote',
        license: 'admin_settings_template_quote',
        type: 'item',
        url: '/settings/template/quote',
        icon: {
          icon: 'quotes',
          iconType: 'main',
          color: '#fa8c16'
        }
      },
      {
        id: 'dev_task_group',
        title: 'Dev Task Group',
        license: 'admin_settings_template_dev_task_group',
        type: 'item',
        url: '/settings/template/project/task_group',
        icon: {
          icon: 'quotes',
          iconType: 'main',
          color: '#fa8c16'
        }
      },
      {
        id: 'dev_task',
        title: 'Dev Task',
        type: 'item',
        url: '/settings/template/project/task',
        license: 'admin_settings_template_dev_task',
        icon: {
          icon: 'quotes',
          iconType: 'main',
          color: '#fa8c16'
        }
      }
    ]
  }
];
