import { Activity } from '@activity/types/activity';

export const LEAD_ACTIVITY_DUMMY_DATA = [
  {
    id: '25cadee0-1e61-499c-b7f0-a3339d212c5b',
    subject: 'this is test',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_MAIL',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a23',
        name: 'hanbirotest1'
      }
    ],
    startTime: '2023-03-03T09:41:36.646Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_NONE',
        id: '25bc266d-5aa1-4e80-9ee5-d252c3d34dc4',
        name: 'hung'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-03-03T09:42:08.512Z'
  },
  {
    id: '25641d5c-de37-41e5-867c-6ce392c823cd',
    subject: 'quote prod 2',
    source: {
      id: '25641d58-10ce-410c-948a-08c2571d6b32',
      menu: 'MENU_QUOTE'
    },
    type: 'TYPE_PROCESS',
    priority: null,
    from: null,
    startTime: '2023-01-11T07:46:33Z',
    endTime: '2023-01-12T07:46:33Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a232',
        name: 'hanbirotest2'
      }
    ],
    direction: 'DIRECTION_IN',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-01-11T07:46:35.827Z'
  },
  {
    id: '25c6d653-52cc-4f8a-93d6-296834560138',
    subject: 'test',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_MAIL',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a23',
        name: 'hanbirotest1'
      }
    ],
    startTime: '2023-03-01T09:33:24.506Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: null,
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-03-01T09:34:55.372Z'
  },
  {
    id: '25c45733-cfab-4693-a522-1234cc06a50e',
    subject: 'Task Manual',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_TASK',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a232',
        name: 'hanbirotest2'
      }
    ],
    startTime: '2023-02-28T03:47:48.31Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '2023-02-28T03:43:04.498Z',
    to: [
      {
        type: 'TYPE_ACCOUNT',
        id: '25bc266d-5aa1-4e80-9ee5-d252c3d34dc4',
        name: 'hung'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-02-28T03:47:48.31Z'
  },
  {
    id: '2562175c-9f10-4f1f-9bd0-e09068afda4a',
    subject: 'Fwd: Re: Test CC email',
    source: {
      id: '2539bcca-7265-450d-a4c2-1b4086f7b5d0',
      menu: 'MENU_DESK'
    },
    type: 'TYPE_SMS',
    priority: null,
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a23',
        name: 'Administrator'
      }
    ],
    startTime: '2023-01-10T07:38:09.687Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_NONE',
        id: '2557ac1a-2da8-4c7b-9691-ea7739723170',
        name: 'David'
      },
      {
        type: 'TYPE_NONE',
        id: '25579a55-3b7e-45c1-94ff-22795cf8b76d',
        name: 'opt 2'
      },
      {
        type: 'TYPE_NONE',
        id: '25563489-1055-4d56-aefc-93e032c41595',
        name: 'Hanbiro'
      },
      {
        type: 'TYPE_NONE',
        id: '250548b9-cc79-4a3c-b273-0c44f11b6818',
        name: 'I am super customer'
      },
      {
        type: 'TYPE_NONE',
        id: '24ccb290-af82-46d9-b000-4051a94c7d3f',
        name: 'Minh'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-01-10T07:38:09.687Z'
  },
  {
    id: '25bc3638-fac9-454c-b074-62f5f94c38d0',
    subject: 'fdasfsa',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_MAIL',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a23',
        name: 'hanbirotest1'
      }
    ],
    startTime: '2023-02-24T02:42:55.414Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_ACCOUNT',
        id: '25bc266d-5aa1-4e80-9ee5-d252c3d34dc4',
        name: 'hung'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-02-24T02:48:57.832Z'
  },
  {
    id: '25bc343a-870e-4156-b811-5523f00b58ef',
    subject: 'test',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_MAIL',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a23',
        name: 'hanbirotest1'
      }
    ],
    startTime: '2023-02-24T02:42:55.414Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_ACCOUNT',
        id: '25bc266d-5aa1-4e80-9ee5-d252c3d34dc4',
        name: 'hung'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-02-24T02:43:23.302Z'
  },
  {
    id: '25bc32d1-f562-4824-873f-36127a1f9a62',
    subject: 'fdsafsda',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_MAIL',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a23',
        name: 'hanbirotest1'
      }
    ],
    startTime: '2023-02-24T02:36:05.737Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_ACCOUNT',
        id: '25bc266d-5aa1-4e80-9ee5-d252c3d34dc4',
        name: 'hung'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-02-24T02:39:27Z'
  },
  {
    id: '25bc31c7-928a-4c31-acaa-a68093b8cef3',
    subject: 'test',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_MAIL',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: [
      {
        type: 'TYPE_USER',
        id: '22779486-f43a-4530-b77f-31a932dd0a23',
        name: 'hanbirotest1'
      }
    ],
    startTime: '2023-02-24T02:36:05.737Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_ACCOUNT',
        id: '25bc266d-5aa1-4e80-9ee5-d252c3d34dc4',
        name: 'hung'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-02-24T02:36:32.421Z'
  },
  {
    id: '25bc2e79-d143-4788-a103-56e063ae3d11',
    subject: 'This is Email content template',
    source: {
      id: '',
      menu: 'MENU_NONE'
    },
    type: 'TYPE_MAIL',
    priority: {
      id: '2592024a-045a-4f04-817d-d7935d1fccb3',
      keyName: 'PRIORITY_MEDIUM',
      languageKey: 'options_items__priority_medium'
    },
    from: null,
    startTime: '2023-02-24T02:25:56.65Z',
    endTime: '0001-01-01T00:00:00Z',
    dueDate: '0001-01-01T00:00:00Z',
    to: [
      {
        type: 'TYPE_ACCOUNT',
        id: '25bc266d-5aa1-4e80-9ee5-d252c3d34dc4',
        name: 'hung'
      }
    ],
    direction: 'DIRECTION_OUT',
    status: 'STATUS_TODO',
    createdBy: {
      id: '22779486-f43a-4530-b77f-31a932dd0a23',
      name: 'Hanbiro Test - '
    },
    createdAt: '2023-02-24T02:27:18.147Z'
  }
];
