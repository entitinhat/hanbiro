import * as keyNames from '@desk/ticket/config/keyNames';
import commonConfigs from '@base/config/list-field/columns';
import { ColorNameIconConfig } from '@desk/ticket/types/comment';
import { PRIORITY_HIGH, PRIORITY_LOW, PRIORITY_MEDIUM, PRIORITY_NONE, PRIORITY_URGENT, PRIORITY_VERY_LOW } from '@base/config/constant';
import { orange, red } from '@mui/material/colors';
import {
  allTicket,
  myNewTicketColumns,
  myGroupTickets,
  myGroupTickets2,
  unassigned,
  ticketsPerCustomer,
  ticketsPerCustomer2,
  ticketsPerPriority,
  ticketsPerPriority2,
  ticketsPerChannel,
  ticketsPerChannel2,
  ticketsPerProcess,
  ticketsPerProcess2,
  myOverdueTicketColumns
} from './ticketColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  my: allTicket,
  unassigned: unassigned,
  myNew: myNewTicketColumns,
  myGroup: myGroupTickets,
  myGroup2: myGroupTickets2,
  myOverDue: myOverdueTicketColumns,
  ticketsPerCustomer: ticketsPerCustomer,
  ticketsPerCustomer2: ticketsPerCustomer2,
  ticketsPerPriority: ticketsPerPriority,
  ticketsPerPriority2: ticketsPerPriority2,
  ticketsPerChannel: ticketsPerChannel,
  ticketsPerChannel2: ticketsPerChannel2,
  ticketsPerProcess: ticketsPerProcess,
  ticketsPerProcess2: ticketsPerProcess2
};

export const configFields = {
  ...commonConfigs,
  [keyNames.KEY_TICKET_CODE]: {
    schema: `
      code
    `
  },
  [keyNames.KEY_TICKET_PRIORITY]: {
    schema: `
    priority {
      keyName
      languageKey
    }
    `
  },
  [keyNames.KEY_TICKET_STATUS]: {
    schema: `
    status {
      keyName
      languageKey
    }
    `
  },
  [keyNames.KEY_TICKET_PRODUCT]: {
    schema: `
    product {
      id
      name
    }
    `
  },
  [keyNames.KEY_TICKET_CATEGORY]: {
    schema: `
    category {
      id
      name
    }
    product {
      id
      name
    }
    `
  },
  [keyNames.KEY_TICKET_PROCESS]: {
    schema: `
    process {
      id
      name
    }
    `
  },
  [keyNames.KEY_TICKET_RESPONSE_DUE]: {
    schema: `
    firstRespondDue
    `
  },
  [keyNames.KEY_TICKET_RESOLUTION_DUE]: {
    schema: `
    resolutionDue
    `
  },
  [keyNames.KEY_TICKET_DURATION]: {
    schema: `
    duration
    durationUnit
    `
  },
  [keyNames.KEY_TICKET_ASSIGN_GROUP]: {
    schema: `
    assignedGroup {
      id
      name
      reps {
        id
        user{
          id
          name
        }
      }
    }
    `
  },
  [keyNames.KEY_TICKET_STAGE]: {
    schema: `
    
    `
  },
  [keyNames.KEY_TICKET_ASSIGN_USER]: {
    schema: `
    assignedUser {
      user {
          id
          name
      }
      group {
        id
        name
      }
    }
    `
  },
  [keyNames.KEY_TICKET_CC_USERS]: {
    schema: `
    ccUsers {
      user {
        id
        name
      }
      group {
        id
        name
      }
    }
    `
  },
  [keyNames.KEY_TICKET_CUSTOMER]: {
    schema: `
    customer {
      id
      name
      account{
        id
        name
      }
    }
    `
  },
  // [keyNames.KEY_TICKET_CONTACT]: {
  //   schema: `
  //   contact {
  //     id
  //     name
  //     category
  //     emails{
  //       id
  //     label
  //       labelValue
  //       email
  //     }
  //     phones{
  //       id
  //       label
  //       labelValue
  //       phoneNumber
  //       extension
  //     }
  //   }
  //   `
  // },
  [keyNames.KEY_TICKET_TAG]: {
    schema: `
    tags {
      id
      name
    }
    `
  },
  [keyNames.KEY_TICKET_CHANNEL]: {
    schema: `
    channel {
      id
      name
    }
    `
  },
  [keyNames.KEY_TICKET_CONTENT]: {
    schema: `
    content
    `
  },
  [keyNames.KEY_TICKET_CLOSED_AT]: {
    schema: `
    closedAt
    `
  },
  [keyNames.KEY_TICKET_CLASSIFICATION]: {
    schema: `
    classifications {
      classification {
        id
        name
      }
      value
    }
    `
  }
  // [keyNames.KEY_TICKET_CLASSIFICATION]: {
  //   schema: `
  //   classifications {
  //     classification {
  //       id
  //       name
  //     }
  //     value
  //   }
  //   `
  // }
};

// export const priorityConfigs: ColorNameIconConfig = {
//   [PRIORITY_URGENT]: {
//     color: 'error',
//     textColor: 'error.main', // text color of chip
//     backgroundColor: 'error.lighter', // background color of chip
//     name: 'ncrm_desk_ticket_urgent' // Urgent
//   },
//   [PRIORITY_HIGH]: {
//     color: 'warning',
//     textColor: 'warning.main',
//     backgroundColor: 'warning.lighter',
//     name: 'ncrm_desk_ticket_hight' // High
//   },
//   [PRIORITY_MEDIUM]: {
//     color: 'info',
//     textColor: 'success.main',
//     backgroundColor: 'success.lighter',
//     name: 'ncrm_desk_ticket_medium' // Medium
//   },
//   [PRIORITY_LOW]: {
//     color: 'secondary',
//     textColor: 'primary.dark',
//     backgroundColor: 'primary.lighter',
//     name: 'ncrm_desk_ticket_low' // Low
//   },
//   [PRIORITY_VERY_LOW]: {
//     color: 'success',
//     name: 'ncrm_desk_ticket_very_low' // Very Low
//   },
//   [PRIORITY_NONE]: {
//     color: 'lime',
//     name: 'None' // None
//   }
// };

export const categoryConfigs = {
  Error: {
    color: red[300]
  },
  Others: {
    color: orange[300]
  }
};
