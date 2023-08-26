import * as keyNames from '@settings/preferences/config/sales/keyNames';

export const getParams = (formData: any) => {
  const newParams: any = {};
  newParams[keyNames.KEY_SALES_TEAM_NAME] = formData[keyNames.KEY_SALES_TEAM_NAME];
  newParams[keyNames.KEY_SALES_TEAM_LEADER] = {
    user: { id: formData[keyNames.KEY_SALES_TEAM_LEADER].id, name: formData[keyNames.KEY_SALES_TEAM_LEADER].name }
  };
  newParams[keyNames.KEY_SALES_TEAM_DESCRIPTION] = formData[keyNames.KEY_SALES_TEAM_DESCRIPTION];
  newParams[keyNames.KEY_SALES_TEAM_EMAIL] = `${formData[keyNames.KEY_SALES_TEAM_EMAIL]}@vora.net`; //TODO: alias email domain
  newParams[keyNames.KEY_SALES_TEAM_ASSIGNMENT_RULE] = formData[keyNames.KEY_SALES_TEAM_ASSIGNMENT_RULE]
    ? { id: formData[keyNames.KEY_SALES_TEAM_ASSIGNMENT_RULE].id, name: formData[keyNames.KEY_SALES_TEAM_ASSIGNMENT_RULE].name }
    : null;
  newParams[keyNames.KEY_SALES_TEAM_PRODUCTS] = [];
  if (formData[keyNames.KEY_SALES_TEAM_PRODUCTS]?.length > 0) {
    newParams[keyNames.KEY_SALES_TEAM_PRODUCTS] = formData[keyNames.KEY_SALES_TEAM_PRODUCTS]
      .filter((_ele: any) => _ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT] !== null)
      .map((_ele: any) => {
        return {
          [keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT]: _ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT]
            ? { id: _ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT].id, name: _ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PRODUCT].name }
            : null,
          [keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS]: _ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS]
            ? { id: _ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS].id, name: _ele[keyNames.KEY_SALES_TEAM_PRODUCTS_PROCESS].name }
            : null
        };
      });
  }
  newParams[keyNames.KEY_SALES_TEAM_MEMBERS] = [];
  if (formData[keyNames.KEY_SALES_TEAM_MEMBERS]?.length > 0) {
    newParams[keyNames.KEY_SALES_TEAM_MEMBERS] = formData[keyNames.KEY_SALES_TEAM_MEMBERS]
      .filter((_ele: any) => _ele[keyNames.KEY_SALES_TEAM_MEMBER_USER] !== null)
      .map((_ele: any) => {
        return {
          [keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE]: _ele[keyNames.KEY_SALES_TEAM_MEMBER_ACTIVE],
          [keyNames.KEY_SALES_TEAM_MEMBER_USER]: _ele[keyNames.KEY_SALES_TEAM_MEMBER_USER]
            ? { user: { id: _ele[keyNames.KEY_SALES_TEAM_MEMBER_USER].id, name: _ele[keyNames.KEY_SALES_TEAM_MEMBER_USER].name } }
            : null,
          [keyNames.KEY_SALES_TEAM_MEMBER_ROLE]: _ele[keyNames.KEY_SALES_TEAM_MEMBER_ROLE]
            ? { id: _ele[keyNames.KEY_SALES_TEAM_MEMBER_ROLE].keyName, name: _ele[keyNames.KEY_SALES_TEAM_MEMBER_ROLE].languageKey }
            : null
        };
      });
  }

  return newParams;
};
