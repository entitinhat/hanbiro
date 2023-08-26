export enum CustomerCategory {
  none = 'CATEGORY_NONE', //0
  account = 'CATEGORY_ACCOUNT', //1
  contact = 'CATEGORY_CONTACT', //2
  employee = 'CATEGORY_EMPLOYEE', //3
  subsidiary = 'CATEGORY_SUBSIDIARY' //4
}

export enum CustomerContactType {
  none = 'CONTACT_TYPE_NONE',
  employee = 'CONTACT_TYPE_EMPLOYEE',
  influencer = 'CONTACT_TYPE_INFLUENCER',
  champion = 'CONTACT_TYPE_CHAMPION',
  budget_holder = 'CONTACT_TYPE_BUDGET_HOLDER',
  decision_maker = 'CONTACT_TYPE_DECISION_MAKER',
  end_user = 'CONTACT_TYPE_END_USER'
}

export enum CustomerType {
  TYPE_NONE = 'TYPE_NONE',
  TYPE_CUSTOMER = 'TYPE_CUSTOMER',
  TYPE_POTENTIAL = 'TYPE_POTENTIAL',
  TYPE_SALES_AGENT = 'TYPE_SALES_AGENT',
  TYPE_VENDOR = 'TYPE_VENDOR',
  TYPE_PARTNER = 'TYPE_PARTNER'
}
