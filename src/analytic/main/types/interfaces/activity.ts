// import { IdNameLanguageKey } from '@analytic/dashboard/types/interfaces';

export interface ActivityCounting {
  total: number;
  overdue: number;
  dueToday: number;
  customerSatisfaction: number;
  email: number;
  call: number;
  task: number;
  sms: number;
  duration: number;
  avgDuration: number;
  avgDurationString: string;
}

export interface GeneralCounting {
  key: any;
  value: any;
  counting: any;
}

export interface Activity {
  id: string;
  type: string;
  subject: string;
  priority: string;
  status: string;
  customers: {
    id: string;
    name: string;
  }[];
}

export interface ActivityResultsResponse {
  results: any[];
}

export interface ActivityPerformanceCounting {
  group: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
  };
  counting: ActivityCounting;
}

export interface ActivityDateCountingResponse {
  period: {
    startTime: string;
    endTime: string;
  };
  results: {
    date: {
      key: string;
      name: string;
      period: {
        startTime: string;
        endTime: string;
      };
    };
    counting: ActivityCounting;
  }[];
}

export interface ActivityPurposeCounting {
  // purpose: IdNameLanguageKey;
  total: number;
}

export interface ActivityPriorityCounting {
  priority: string;
  total: number;
}
export interface ActivityTrendCountingResponse {
  firstCounting: any;
  lastCounting: any;
}
