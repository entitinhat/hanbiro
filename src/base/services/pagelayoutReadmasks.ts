const aliasReadMasks: any = {
  currency: `{
        code
        currencyName
    }`,
  ranking: `{
        id
        languageKey
    }`,
  groups: `{
        id
        languageKey
    }`,
  leadSources: `{
        id
        languageKey
    }`,
  industries: `{
        id
        languageKey
    }`,
  emails: `{
        id
        label {
          languageKey
          label
        }
        labelValue
        email
    }`,
  phones: `{
        id
        label {
          languageKey
          label
        }
        labelValue
        country
        phoneNumber
        extension
    }`,
  addresses: `{
        id
        label {
          languageKey
          label
        }
        labelValue
        country {
          isoCode2
          country
        }
        zipcode
        state
        city
        street
    }`,
  websites: `{
        id
        label {
          languageKey
          label
        }
        labelValue
        protocol
        website
    }`,
  anniversaries: `{
        id
        label {
          languageKey
          label
        }
        labelValue
        anniversary
    }`,
  connectedIps: `{
        id
        ip
    }`,
  staffs: `{
        id
        name
        properties {
         crmGroups{
            id
            name
          }
          crmBaseGroup{
            id
            name
          }
        }
    }`,
  createdBy: `{
        id
        name
    }`,
  updatedBy: `{
        id
        name
    }`,
  gender: `{
        languageKey
        label
    }`,
  relatedEmployees: `{
        id
        code
        name
        category
        type {
            languageKey
            keyName
        }
        state {
            languageKey
            keyName
        }
        photo
    }`,
  parent: `{
        id
        code
        name
        category
        type {
            languageKey
            keyName
        }
        state {
            languageKey
            keyName
        }
        photo
    }`,
  account: `{
        id
        code
        name
        category
        type {
            languageKey
            keyName
        }
        state {
            languageKey
            keyName
        }
        photo
    }`,
  type: `{
        languageKey
        keyName
    }`,
  contactType: `{
        languageKey
        keyName
    }`,
  state: `{
        languageKey
        keyName
    }`,
  group: `{
        languageKey
        id
    }`,
  attributes: `{
        name
        id
    }`,
  employeeRole: `{
        languageKey
        keyName
    }`,
  unitValues: `{
        id
        unitId
        name
        qty
        order
    }`,
  relatedProducts: `{
        id
        name
    }`,
  deletedBy: `{
        id
        name
    }`,
  assignUser: `{
        id
        name
    }`,
};

export default aliasReadMasks;
