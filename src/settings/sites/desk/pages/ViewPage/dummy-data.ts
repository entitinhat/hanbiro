interface TicketType {
  id: string;
  ticketNo: string;
  name: string;
  customer: {
    id: string;
    name: string;
  };
  contact: {
    id: string;
    name: string;
  };
  status: {
    keyName: string;
    languageKey: string;
  };
  category: {
    category: {
      id: string;
      name: string;
    };
    product: {
      id: string;
      name: string;
    };
  };
  assignRep: {
    id: string;
    name: string;
  };
  createdAt: string;
  responded1st: string;
  resolved1st: string;
  closedOn: string;
}
export const dummyData: TicketType = {
  id: '22a61004-0f03-4cbb-b087-0d76f896e073_1',
  ticketNo: '00000001',
  name: 'Ticket 01',
  customer: {
    id: '22a61004-0f03-4cbb-b087-0d76f896e073',
    name: 'Customer 1'
  },
  contact: {
    id: '22a61004-0f03-4cbb-b087-0d76f896e073',
    name: 'Customer 1'
  },
  status: {
    keyName: 'STATUS_OPEN',
    languageKey: 'Open'
  },
  category: {
    category: {
      id: '22a61004-0f03-4cbb-b087-0d76f896e073',
      name: 'Customer 1'
    },
    product: {
      id: '22a61004-0f03-4cbb-b087-0d76f896e073',
      name: 'Contact 1'
    }
  },
  assignRep: {
    id: '22a61004-0f03-4cbb-b087-0d76f896e073',
    name: 'MSR'
  },
  createdAt: '2022-12-20T09:34:44.933Z',
  responded1st: '2022-12-20T09:34:44.933Z',
  resolved1st: '2022-12-20T09:34:44.933Z',
  closedOn: '2022-12-20T09:34:44.933Z'
};
