interface Object {
  label: string;
  name: string;
}

export const DUMMY_VIEW_DATA = {
  id: '1',
  title: 'Sample Titles',
  code: 'ACCO-000001',
  type: 'Existing Customer',
  customer: {
    label: 'nhat',
    id: 'nhat',
    name: 'Jenny Willson'
  },
  priority: {
    keyName: 'PRIORITY_HIGH',
    languageKey: 'High'
  },
  product: {
    id: '1',
    name: 'Nutella'
  },
  category: {
    id: '1',
    name: 'Food'
  },
  classifications: [
    {
      classification: {
        id: '1',
        name: 'Language'
      },
      value: 'English',
      label: 'Language'
    },
    {
      classification: {
        id: '2',
        name: 'Region'
      },
      value: 'Europe',
      label: 'Region'
    }
  ],
  description:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  process: {
    id: '2527b713-d05d-48d6-84bb-ec6a336b003f'
  },
  subject: 'Item Nhật',
  // Entiti 4.4
  reply: [
    {
      name: 'Nhat Dev',
      createdAt: '2020-04-01 13:01:22',
      replyContent:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat enim duis... '
    },
    {
      name: 'Jun HR',
      createdAt: '2020-04-01 13:01:22',
      replyContent:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat enim duis... '
    }
  ],
  content:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
  sms: 'sample sms',
  email: 'sample@example.com',
  comment: 'sample comment',
  assignedGroup: 'Sample assigned group',
  assignedUser: 'Jenny Wilson',
  stage: 'stage',
  status: {
    keyName: 'key',
    languageKey: 'langkey'
  },
  ccUsers: 'John Hawkins',
  channel: 'Desk Email',
  // process: 'Process 1',
  createdBy: {
    id: '2527b713-d05d-48d6-84',
    label: 'Actual Revenue',
    name: 'ntt'
  }
  // firstRespondDue: '2020-04-03 13:00:00',
  // resolutionDue: '2020-04-09 13:00:00',
  // createdAt: '2020-04-06 12:00:00',
  // closedAt: '2020-04-04 13:00:00',
  // duration: '1d 1h 30m'
};
