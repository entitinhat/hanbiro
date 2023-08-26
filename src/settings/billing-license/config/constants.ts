import { NavItemType } from '@base/types/menu';

export const BILLING_LICENSE_MENUS: NavItemType[] = [
  {
    id: 'billing-license',
    title: 'Bill & License',
    type: 'group',
    children: [
      // {
      //   id: 'billing-license-billing-information',
      //   title: 'Billing Information',
      //   type: 'item',
      //   url: '/settings/billing-license/billing-information',
      //   license: 'admin_settings_bill_license_billing_info',
      //   icon: {
      //     icon: 'Receipt',
      //     iconType: 'material',
      //     color: '#e69395'
      //   }
      // },
      // {
      //   id: 'billing-license-license',
      //   title: 'License',
      //   type: 'item',
      //   url: '/settings/billing-license/license',
      //   license: 'admin_settings_bill_license_licenses',
      //   icon: {
      //     icon: 'Gavel',
      //     iconType: 'material',
      //     color: '#93bbe7'
      //   }
      // },
      // {
      //   id: 'billing-license-bill-payment',
      //   title: 'Bill & Payment',
      //   type: 'item',
      //   url: '/settings/billing-license/bill-payment',
      //   license: 'admin_settings_bill_license_bill_payment',
      //   icon: {
      //     icon: 'Payment',
      //     iconType: 'material',
      //     color: '#bcdc97'
      //   }
      // },
      // {
      //   id: 'billing-license-history',
      //   title: 'History',
      //   type: 'item',
      //   url: '/settings/billing-license/history',
      //   license: 'admin_settings_bill_license_history',
      //   icon: {
      //     icon: 'AccessTime',
      //     iconType: 'material',
      //     color: '#4cdc97'
      //   }
      // },
      {
        id: 'billing-license-products',
        title: 'Products',
        type: 'item',
        url: '/settings/billing-license/products',
        license: 'admin_settings_bill_license_products',
        icon: {
          icon: 'AccessTime',
          iconType: 'material',
          color: '#4582bf'
        }
      },
      {
        id: 'billing-license-product-urls',
        title: 'Product URLs',
        type: 'item',
        url: '/settings/billing-license/product-urls',
        license: 'admin_settings_bill_license_product_urls',
        icon: {
          icon: 'AccessTime',
          iconType: 'material',
          color: '#d4819f'
        }
      }
    ]
  }
];
