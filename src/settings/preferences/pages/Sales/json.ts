export const BuyingRoles: any[] = [
  { value: '', label: 'Decision Maker' },
  { value: '', label: 'End User' },
  { value: '', label: 'Influencer' },
  { value: '', label: 'Champion' },
  { value: '', label: 'Budget Holder' },
  { value: '', label: 'Legal & Compliance' },
  { value: '', label: 'Blocker' },
  { value: '', label: 'Other' }
];

export const CollectionMethods: any[] = [
  { value: '', label: 'Lead Capture' },
  {
    value: '',
    label: 'Manual Task',
    children: [
      { value: '', label: 'Internet Search' },
      { value: '', label: 'Social Media Search' },
      { value: '', label: 'Coroarate Website' }
    ]
  },
  { value: '', label: 'Customer in CRM' },
  { value: '', label: 'Lead in CRM' },
  {
    value: '',
    label: 'Bulk Data',
    children: [
      { value: '', label: 'Official Records' },
      { value: '', label: 'Data Base' },
      { value: '', label: 'Business Directory' }
    ]
  },
  { value: '', label: 'Other' }
];

export const IdentifyPainPoints: any[] = [
  { value: '', label: 'Reduce cost' },
  { value: '', label: 'Save time' },
  { value: '', label: 'Streamline their exisiting process' },
  { value: '', label: 'Grow their sales' }
];

export const LostReasons: any[] = [
  { value: '', label: 'Too expensive' },
  { value: '', label: 'Not enough stock' },
  { value: '', label: 'We don’t have people/skill' },
  { value: '', label: 'Not interested' }
];

export const Referrers: any[] = [
  { value: '', label: 'Agent' },
  { value: '', label: 'Customer' },
  { value: '', label: 'Internal User' },
  { value: '', label: 'Broker' },
  { value: '', label: 'Affiliate' }
];

export const WeightedSalesList: any[] = [
  { opportunityProcess: { id: '', name: 'Opportunity Process 1' }, status: 'COMPLETED' },
  { opportunityProcess: { id: '', name: 'Opportunity Process 2' }, status: 'NONE' },
  { opportunityProcess: { id: '', name: 'Opportunity Process 3' }, status: 'NONE' },
  { opportunityProcess: { id: '', name: 'Opportunity Process 4' }, status: 'COMPLETED' }
];

export const WeightedSalesPipeline: any[] = [
  {
    stage: 'Qualified',
    status: [
      {
        name: 'Assigned',
        probability: 20
      }
    ]
  },
  {
    stage: 'Open',
    status: [
      {
        name: 'Open',
        probability: 20
      }
    ]
  },
  {
    stage: 'Develop',
    status: [
      {
        name: 'Needs analysis',
        probability: 30
      },
      {
        name: 'Value proposition',
        probability: null
      },
      {
        name: 'Identify Decision M.',
        probability: null
      },
      {
        name: 'Identify Competitor',
        probability: null
      },
      {
        name: 'Perception Analysis',
        probability: 50
      }
    ]
  },
  {
    stage: 'Propose',
    status: [
      {
        name: 'Proposal',
        probability: 70
      },
      {
        name: 'Feed back',
        probability: 90
      }
    ]
  },
  {
    stage: 'Closed',
    status: [
      {
        name: 'Won',
        probability: 100
      },
      {
        name: 'Lost',
        probability: 0
      }
    ]
  }
];
export const SalesTeams: any[] = [
  {
    id: '0',
    name: 'Sales Team 1',
    leader: { id: '', name: 'Devon Lane' },
    descrition: '',
    email: '',
    assignmentRule: { id: '', name: '' },
    products: [
      { product: { id: '', name: 'Product 1' }, opportunityProcess: { id: '', name: 'Opportunity Process 1' } },
      { product: { id: '', name: 'Product 2' }, opportunityProcess: { id: '', name: 'Opportunity Process 2' } }
    ],
    members: [
      { id: 'TA0010', name: 'Member 1', role: { id: '', name: 'Marketing Rep' }, active: true },
      { id: 'TA0006', name: 'Member 2', role: { id: '', name: 'Sales Rep' }, active: true }
    ]
  },
  {
    id: '1',
    name: 'Sales Team 2',
    leader: { id: '', name: 'Jerome Bell' },
    descrition: '',
    email: '',
    assignmentRule: { id: '', name: '' },
    products: [
      { product: { id: '', name: 'Product 3' }, opportunityProcess: { id: '', name: 'Opportunity Process 3' } },
      { product: { id: '', name: 'Product 4' }, opportunityProcess: { id: '', name: 'Opportunity Process 4' } }
    ],
    members: [
      { id: 'TA0011', name: 'Member 3', role: { id: '', name: 'Marketing Rep' }, active: true },
      { id: 'TA0012', name: 'Member 4', role: { id: '', name: 'Sales Rep' }, active: true },
      { id: 'TA0013', name: 'Member 5', role: { id: '', name: 'Sales Rep' }, active: true }
    ]
  }
];
