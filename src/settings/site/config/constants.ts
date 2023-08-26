import { SiteGroup } from '@settings/site/types/site';

export const SITE_GROUP_NUMBER: { [index: string]: number } = {
  [SiteGroup.DESK]: 5,
  [SiteGroup.SALES]: 9,
  [SiteGroup.MARKETING]: 10
};

export const SITE_GROUP_KEY: { [index: string]: string } = {
  [SiteGroup.DESK]: 'desk',
  [SiteGroup.SALES]: 'sales',
  [SiteGroup.MARKETING]: 'marketing'
};

export const SITE_GROUP_OPTION: { [index: string]: SiteGroup } = {
  desk: SiteGroup.DESK,
  sales: SiteGroup.SALES,
  marketing: SiteGroup.MARKETING
};

export const SITE_GROUP_OPTION_NUMBER: { [index: string]: number } = {
  desk: SITE_GROUP_NUMBER[SiteGroup.DESK],
  sales: SITE_GROUP_NUMBER[SiteGroup.SALES],
  marketing: SITE_GROUP_NUMBER[SiteGroup.MARKETING]
};

export const PREVENT_DELETE_SITES = ['desk'];

export const SITE_TYPE_OPTIONS = [
  {
    label: 'ncrm_common_site_type_desk',
    value: 'desk'
  },
  {
    label: 'ncrm_common_site_type_sales',
    value: 'sales'
  },
  {
    label: 'ncrm_common_site_type_marketing',
    value: 'marketing'
  }
];
