import { gql } from 'graphql-request';

export const pageLayoutSchema = `
    id
    keyName
    languageKey
    sections {
      id
      keyName
      languageKey
      dataType
      showInList
      showInView
      showInWrite
      orderInList
      orderInView
      orderInWrite
      defaultViewInList
      permissionType
      attributes{
          keyName
          languageKey
          value
          defaultValue
      }
      children {
        id
        keyName
        languageKey
        dataType
        showInList
        showInView
        showInWrite
        orderInList
        orderInView
        orderInWrite
        defaultViewInList
        icon{
          icon
          iconType
        }
        options {
            id
            keyName
            languageKey
            dataType
            attributes{
              keyName
              languageKey
              value
              defaultValue
            }
        }
        attributes {
          keyName
          languageKey
          value
          defaultValue
        }
        permissionType
        permission {
          canMarkRequired
          canSetShowInList
          canSetShowInView
          canSetShowInWrite
          canMoveUnused
          canDelete
          canEditProperty
          canShowSettingButton
          settingButtonTooltip
          canMovePosition
          canChangeFieldName
        }
        userPermission {
            isEdit
            isShow
            isSortable
        }
        children {
            id
            keyName
            languageKey
            dataType
            showInList
            showInView
            showInWrite
            orderInList
            orderInView
            orderInWrite
            defaultViewInList
            icon{
              icon
              iconType
            }
            options {
                id
                keyName
                languageKey
                dataType
                attributes{
                  keyName
                  languageKey
                  value
                  defaultValue
                }
            }
            attributes {
              keyName
              languageKey
              value
              defaultValue
            }
            permissionType
            permission {
              canMarkRequired
              canSetShowInList
              canSetShowInView
              canSetShowInWrite
              canMoveUnused
              canDelete
              canEditProperty
              canShowSettingButton
              settingButtonTooltip
              canMovePosition
              canChangeFieldName
            }
            userPermission {
                isEdit
                isShow
                isSortable
            }
        }
      }  
    }
`;

export const GET_MENU_PAGELAYOUT = gql`
  query GetPageLayout($menu: String!) {
    setting_menuPagelayout(layoutKey: $menu, device: "desktop") {
      list {
        ${pageLayoutSchema}
      }
      write {
        ${pageLayoutSchema}
      }
      view {
        ${pageLayoutSchema}
      }
    }
  }
`;

export const getUpdateCommonViewField = (
  queryKey: string,
  variableKey: string,
  sectionId?: string,
) => {
  const parentId = sectionId ? 'id: $id' : '';
  return gql`
      mutation m($data: UpdateData!) {
        ${queryKey} (
          ${parentId}
          ${variableKey}: $${variableKey}
        ) {
          id
        }
      }
    `;
};
