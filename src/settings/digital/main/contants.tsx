import { NavItemType } from '@base/types/menu';

export const DIGITAL_MENUS: NavItemType[] = [
  {
    id: 'digital',
    title: 'Online Digital Content',
    type: 'group',
    children: [
      {
        id: 'cta',
        title: 'CTA',
        type: 'item',
        url: '/settings/digital/cta',
        license:'admin_settings_digital_cta',
        icon: {
          icon: 'cta',
          iconType: 'main',
          color: '#673ab7'
        }
      },
      {
        id: 'landingpage',
        title: 'Landing Page',
        type: 'item',
        license:'admin_settings_digital_landing_page',
        url: '/settings/digital/landing-page',
        icon: {
          icon: 'marketing',
          iconType: 'main',
          color: '#db4437'
        }
      },
      {
        id: 'survey',
        title: 'Survey',
        type: 'item',
        license:'admin_settings_digital_survey',
        url: '/settings/digital/survey',
        icon: {
          icon: 'survey',
          iconType: 'main',
          color: '#ff9800'
        }
      },
      {
        id: 'form',
        title: 'Form',
        type: 'item',
        license:'admin_settings_digital_form',
        url: '/settings/digital/form',
        icon: {
          icon: 'form',
          iconType: 'main',
          color: '#009688'
        }
      }
    ]
  }
];
