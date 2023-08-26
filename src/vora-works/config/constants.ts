import { LabelValue } from '@base/types/app';
import { LogoLabel, PricingPlan } from '@vora-works/types';
import * as keyNames from '@vora-works/config/keyNames';
export const SignUpLogoSetting: LogoLabel[] = [
  {
    label: 'Vora Works',
    logo: ''
  },
  {
    label: 'TeamChannel',
    logo: ''
  }
];

export const FreePlans: LabelValue[] = [
  {
    label: 'Up to 2 users',
    value: '10users'
  },
  {
    label: '5 GB of storage',
    value: '5gbofstorage'
  },
  {
    label: 'Community support',
    value: 'communitysupport'
  }
];

export const ProductPlans = [
  {
    menu: keyNames.VORA_DESK,
    value: 'Vora Desk',
    label: 'Desk makes customer service better, and makes doing business with your convenient.'
  },
  // {
  //   menu: keyNames.VORA_IAM,
  //   value: 'Vora IAM',
  //   label: 'Vora IAM'
  // },
  {
    menu: keyNames.VORA_SALES,
    value: 'Vora Sales',
    label: 'Lead/Opportunity/Quote, Sales Automation, Tools Build, and easy-to-follow sales pipeline into Sales Process.'
  },
  {
    menu: keyNames.VORA_MARKETING,
    value: 'Vora Marketing',
    label: 'Email/SMS Marketing, Customer Journey Process, Grow your business with a personalized, digital experience.'
  },
  {
    menu: keyNames.VORA_TEAM_CHANNEL,
    value: 'TeamChannel',
    label: 'Bring the right member and information together in channels. Communication with your team about specific topics.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      {
        name: 'Customers',
        isOpen: true
      },
      {
        name: 'Products',
        isOpen: true
      },
      {
        name: 'Business Process',
        isOpen: true
      },
      {
        name: 'Automation Rule',
        isOpen: true
      },
      {
        name: 'Assignment Rule',
        isOpen: false
      },
      {
        name: 'Journey Process',
        isOpen: false
      },
      {
        name: 'Site',
        isOpen: false
      },
      {
        name: 'Template',
        isOpen: false
      },
      {
        name: 'Onlie Digital Content',
        isOpen: false
      }
    ]
  },
  {
    id: 'team',
    name: 'Team',
    priceMonthly: 10,
    priceYearly: 120,
    features: [
      {
        name: 'Customers',
        isOpen: true
      },
      {
        name: 'Products',
        isOpen: true
      },
      {
        name: 'Business Process',
        isOpen: true
      },
      {
        name: 'Automation Rule',
        isOpen: true
      },
      {
        name: 'Assignment Rule',
        isOpen: false
      },
      {
        name: 'Journey Process',
        isOpen: false
      },
      {
        name: 'Site',
        isOpen: false
      },
      {
        name: 'Template',
        isOpen: false
      },
      {
        name: 'Onlie Digital Content',
        isOpen: false
      }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: 20,
    priceYearly: 240,
    features: [
      {
        name: 'Customers',
        isOpen: true
      },
      {
        name: 'Products',
        isOpen: true
      },
      {
        name: 'Business Process',
        isOpen: true
      },
      {
        name: 'Automation Rule',
        isOpen: true
      },
      {
        name: 'Assignment Rule',
        isOpen: false
      },
      {
        name: 'Journey Process',
        isOpen: false
      },
      {
        name: 'Site',
        isOpen: false
      },
      {
        name: 'Template',
        isOpen: false
      },
      {
        name: 'Onlie Digital Content',
        isOpen: false
      }
    ]
  }
];

export const DOMAIN = '.jiki.me'; //'.vora.net';
export const TOOLTIP_FOR_YOUR_SITE = 'Must be at least 3 lowercase characters, numbers and letters only.';
export const TOOLTIP_FOR_URL_NAME = 'Url Name is your unique name. It has not allow white space.';
export const Free_Service_Banner = 'https://gw.hanbiro.vn/ngw/app/img/groupware.png?_t=1677675600';
