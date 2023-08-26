import {EChartType} from "@analytic/main/types/enum";
import {
  assignToMe,
  assignToMyGroup,
  groupByAssignToGroup,
  groupByAssignToUser
} from "@analytic/main/config/defaultQueryString";
import {ChartBoxProps} from "@analytic/main/components/ChartBox";
import {Theme} from "@mui/material/styles";
import chartComponents from "./chartComponents";

interface CChartBoxProps {
  [x: string]: ChartBoxProps
}

export const chartBoxes: CChartBoxProps = {
  [EChartType.CHART_CUSTOMER_TREND]: {
    key: EChartType.CHART_CUSTOMER_TREND,
    component: chartComponents[EChartType.CHART_CUSTOMER_TREND],
    title: 'ncrm_dashboard_my_customer_trends',
    adminProps: {
      title: "Customer Trends",
      wrapperProps: {
        xs: 12,
        md: 6,
        lg: 3,
        xl: 2
      }
    },
    filterProps: {
      dateProps: {
        disableCustomize: true,
        dropdownProps: {
          sx: {
            m: 0,
            width: '100%!important',
            '& .MuiButton-root': {
              width: '100%!important',
              justifyContent: "space-between",
              px: '10px'
            },
            border: (theme: Theme) => `1px solid ${theme.palette.secondary.light}`,
            borderRadius: '4px'
          }
        }
      }
    },
    wrapperProps: {
      xs: 12,
      md: 6,
      lg: 3,
      xl: 2
    }
  },
  [EChartType.CHART_CUSTOMER_PERIOD]: {
    component: chartComponents[EChartType.CHART_CUSTOMER_PERIOD],
    key: EChartType.CHART_CUSTOMER_PERIOD,
    title: 'ncrm_dashboard_customer_by_period',
    wrapperProps: {
      md: 6,
      xl: 8,
      lg: 6
    }
  },
  [EChartType.CHART_CUSTOMER_LAST_UPDATED]: {
    component: chartComponents[EChartType.CHART_CUSTOMER_LAST_UPDATED],
    key: EChartType.CHART_CUSTOMER_LAST_UPDATED,
    title: 'ncrm_dashboard_customer_updated',
    filterProps: {
      isShow: false
    },
    subContentSx: {
      height: '100%'
    },
    wrapperProps: {
      md: 6,
      xl: 2,
      lg: 3
    }
  },
  [EChartType.CHART_CUSTOMER_RATING]: {
    component: chartComponents[EChartType.CHART_CUSTOMER_RATING],
    key: EChartType.CHART_CUSTOMER_RATING,
    title: "Customer Rating",
    filterProps: {
      isDateGroup: true
    },
    wrapperProps: {
      md: 6,
      xl: 6
    }
  },
  [EChartType.CHART_CUSTOMER_INDUSTRY]: {
    component: chartComponents[EChartType.CHART_CUSTOMER_INDUSTRY],
    key: EChartType.CHART_CUSTOMER_INDUSTRY,
    title: "Customer Industry",
    filterProps: {
      isShow: false
    },
    wrapperProps: {
      md: 6,
      xl: 4
    }
  },

  [EChartType.CHART_ACTIVITY_TREND]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TREND],
    key: EChartType.CHART_ACTIVITY_TREND,
    title: 'ncrm_dashboard_my_activity_trends',
    filterProps: {
      dateProps: {
        disableCustomize: true
      }
    },
    adminProps: {
      title: 'ncrm_dashboard_activity_trends'
    },
    sx: {
      height: 'auto',
      maxHeight: '500px'
    },
    contentSx: {
      height: 'auto'
    },
    isScroll: true,
    subContentSx: {
      overflowY: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_ACTIVITY_TODO]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TODO],
    key: EChartType.CHART_ACTIVITY_TODO,
    title: 'ncrm_dashboard_my_works',
    filterProps: {
      isShow: false
    },
    sx: {
      height: 'auto',
      maxHeight: '770px'
    },
    contentSx: {
      height: 'auto'
    },
    wrapperProps: {
      /*gridCol: 12,
      gridColLandscape: 24,*/
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_ACTIVITY_GROUP_PERFORMANCE]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_GROUP_PERFORMANCE],
    key: EChartType.CHART_ACTIVITY_GROUP_PERFORMANCE,
    title: 'Group Performance',
    filterProps: {
      defaultQuery: groupByAssignToGroup
    },
    wrapperProps: {
      xs: 12
    }
  },
  [EChartType.CHART_ACTIVITY_REP_PERFORMANCE]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_REP_PERFORMANCE],
    key: EChartType.CHART_ACTIVITY_REP_PERFORMANCE,
    title: 'ncrm_dashboard_my_group_performance',
    filterProps: {
      defaultQuery: groupByAssignToUser
    },
    adminProps: {
      title: 'Rep. Performance',
      filterProps: {
        isDateGroup: true,
        defaultQuery: 'groupBy=ASSIGN_TO_USER assignToGroup=MY_GROUP'
      }
    },
    sx: {
      height: 'auto'
    },
    contentSx: {
      height: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_ACTIVITY_TYPE]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TYPE],
    key: EChartType.CHART_ACTIVITY_TYPE,
    title: 'ncrm_dashboard_my_activities',
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_DURATION]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_DURATION],
    key: EChartType.CHART_ACTIVITY_DURATION,
    title: 'ncrm_dashboard_my_duration',
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_GROUP_DURATION]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_GROUP_DURATION],
    key: EChartType.CHART_ACTIVITY_GROUP_DURATION,
    title: 'ncrm_dashboard_my_group_duration',
    filterProps: {
      dateProps: {}
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_GROUP_TOTAL]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_GROUP_TOTAL],
    key: EChartType.CHART_ACTIVITY_GROUP_TOTAL,
    title: 'ncrm_dashboard_my_group_total_activities',
    filterProps: {
      defaultQuery: 'groupBy=ASSIGN_TO_USER assignToGroup=MY_GROUP'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_GROUP_PERFORMANCE]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_GROUP_PERFORMANCE],
    key: EChartType.CHART_ACTIVITY_GROUP_PERFORMANCE,
    title: 'Group Performance',
    filterProps: {
      defaultQuery: 'groupBy=assignToGroup'
    },
    sx: {
      height: 'auto'
    },
    contentSx: {
      height: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_ACTIVITY_TOTAL_BY_GROUP]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TOTAL_BY_GROUP],
    key: EChartType.CHART_ACTIVITY_TOTAL_BY_GROUP,
    title: 'Total Activities By Group',
    filterProps: {
      isDateGroup: true
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_TOTAL_BY_REP]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TOTAL_BY_REP],
    key: EChartType.CHART_ACTIVITY_TOTAL_BY_REP,
    title: 'Total Activities By Rep',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_CALL]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_CALL],
    key: EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_CALL,
    title: 'Top Performer by Call',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_TASK]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_TASK],
    key: EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_TASK,
    title: 'Top Performer by Task',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_EMAIL]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_EMAIL],
    key: EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_EMAIL,
    title: 'Top Performer by Email',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_SMS]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_SMS],
    key: EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_SMS,
    title: 'Top Performer by Sms',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_PURPOSE]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_PURPOSE],
    key: EChartType.CHART_ACTIVITY_PURPOSE,
    title: 'Activities By Purpose',
    filterProps: {
      isDateGroup: true
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_BY_TYPE]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_BY_TYPE],
    key: EChartType.CHART_ACTIVITY_BY_TYPE,
    title: 'Activities By Type',
    filterProps: {
      isDateGroup: true
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_OVERDUE_REP_CHART]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_OVERDUE_REP_CHART],
    key: EChartType.CHART_ACTIVITY_OVERDUE_REP_CHART,
    title: 'Overdue Activities By Rep',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_BY_PRIORITY_CHART]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_BY_PRIORITY_CHART],
    key: EChartType.CHART_ACTIVITY_BY_PRIORITY_CHART,
    title: 'Activities By Priority',
    filterProps: {
      isDateGroup: true
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_ACTIVITY_COMPARISON]: {
    component: chartComponents[EChartType.CHART_ACTIVITY_COMPARISON],
    key: EChartType.CHART_ACTIVITY_COMPARISON,
    title: 'ncrm_dashboard_my_group_activity_comparison',
    sx: {
      height: 'auto'
    },
    contentSx: {
      height: 'auto'
    },
    adminProps: {
      title: 'Activity Comparison',
      filterProps: {
        isDateGroup: true
      }
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },


  [EChartType.CHART_TICKET_TREND]: {
    component: chartComponents[EChartType.CHART_TICKET_TREND],
    key: EChartType.CHART_TICKET_TREND,
    title: 'ncrm_dashboard_my_ticket_trend',
    filterProps: {
      defaultQuery: assignToMe,
      dateProps: {
        disableCustomize: true
      }
    },
    adminProps: {
      title: 'Ticket Trend',
      filterProps: {
        defaultQuery: ''
      }
    },
    sx: {
      height: 'auto'
    },
    contentSx: {
      height: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY]: {
    component: chartComponents[EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY],
    key: EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY,
    title: 'ncrm_dashboard_my_performer_by_resolve_time_efficiency',
    filterProps: {
      defaultQuery: assignToMe
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_OVERVIEW]: {
    component: chartComponents[EChartType.CHART_TICKET_OVERVIEW],
    key: EChartType.CHART_TICKET_OVERVIEW,
    title: 'ncrm_dashboard_my_tickets_overview',
    filterProps: {
      isDateGroup: true
    },
    adminProps: {
      title: 'Tickets Overview'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME]: {
    component: chartComponents[EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME],
    key: EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME,
    title: 'ncrm_dashboard_my_performer_by_resolution_time',
    filterProps: {
      defaultQuery: assignToMe
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE]: {
    component: chartComponents[EChartType.CHART_TICKET_GROUP_PERFORMANCE],
    key: EChartType.CHART_TICKET_GROUP_PERFORMANCE,
    title: 'ncrm_dashboard_group_performance',
    filterProps: {
      defaultQuery: groupByAssignToGroup,//${groupByAssignToUser} ${assignToMyGroup}`
      dateProps: {
        key: 'date'
      }
    },
    sx: {
      height: 'auto',
      maxHeight: '500px'
    },
    contentSx: {
      height: 'auto'
    },
    isScroll: true,
    subContentSx: {
      overflowY: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_ASSIGNED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_ASSIGNED_TICKET],
    key: EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_ASSIGNED_TICKET,
    title: 'ncrm_dashboard_my_group_performer_by_assigned_tickets',
    filterProps: {
      defaultQuery: `${groupByAssignToUser} ${assignToMyGroup}`
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVE_TIME_EFFICIENCY]: {
    component: chartComponents[EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVE_TIME_EFFICIENCY],
    key: EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVE_TIME_EFFICIENCY,
    title: 'ncrm_dashboard_my_group_performance_by_resolve_time_efficiency',
    filterProps: {
      defaultQuery: `${groupByAssignToUser} ${assignToMyGroup}`
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVED_TICKET],
    key: EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVED_TICKET,
    title: 'ncrm_dashboard_my_group_performer_by_resolved_tickets',
    filterProps: {
      defaultQuery: `${groupByAssignToUser} ${assignToMyGroup}`
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_UNRESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_UNRESOLVED_TICKET],
    key: EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_UNRESOLVED_TICKET,
    title: 'ncrm_dashboard_my_group_performance_by_unresolved_tickets',
    filterProps: {
      defaultQuery: `${groupByAssignToUser} ${assignToMyGroup}`
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLUTION_TIME]: {
    component: chartComponents[EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLUTION_TIME],
    key: EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLUTION_TIME,
    title: 'ncrm_dashboard_my_group_performance_by_resolution_time',
    filterProps: {
      defaultQuery: `${groupByAssignToUser} ${assignToMyGroup}`
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_PRIORITY]: {
    component: chartComponents[EChartType.CHART_TICKET_PRIORITY],
    key: EChartType.CHART_TICKET_PRIORITY,
    title: 'ncrm_dashboard_my_tickets_by_priority',
    filterProps: {
      defaultQuery: assignToMe
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_ISSUE]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_ISSUE],
    key: EChartType.CHART_TICKET_TOP_ISSUE,
    title: 'ncrm_dashboard_my_top_10_issues',
    filterProps: {
      defaultQuery: assignToMe
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },


  [EChartType.CHART_TICKET_BY_CATEGORY]: {
    component: chartComponents[EChartType.CHART_TICKET_BY_CATEGORY],
    key: EChartType.CHART_TICKET_BY_CATEGORY,
    title: 'Tickets By Category',
    filterProps: {
      isDateGroup: true,
      defaultQuery: 'typeOf=TICKET_BLOCK_BY_CATEGORY'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_AVG_SUPPORT_PERFORMER]: {
    component: chartComponents[EChartType.CHART_TICKET_AVG_SUPPORT_PERFORMER],
    key: EChartType.CHART_TICKET_AVG_SUPPORT_PERFORMER,
    title: 'Ticket Avg. Support Performance',
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_GROUP_PERFORMER]: {
    component: chartComponents[EChartType.CHART_TICKET_GROUP_PERFORMER],
    key: EChartType.CHART_TICKET_GROUP_PERFORMER,
    title: 'Group Performance',
    filterProps: {
      defaultQuery: groupByAssignToGroup,
      dateProps: {
        key: 'date'
      }
    },
    sx: {
      height: 'auto',
      maxHeight: '500px'
    },
    contentSx: {
      height: 'auto'
    },
    isScroll: true,
    subContentSx: {
      overflowY: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_TICKET_REP_PERFORMER]: {
    component: chartComponents[EChartType.CHART_TICKET_REP_PERFORMER],
    key: EChartType.CHART_TICKET_REP_PERFORMER,
    title: 'Rep Performance',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser,
      dateProps: {
        key: 'date'
      }
    },
    sx: {
      height: 'auto',
      maxHeight: '500px'
    },
    contentSx: {
      height: 'auto'
    },
    isScroll: true,
    subContentSx: {
      overflowY: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_AVG_RESOLUTION_TIME]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_PERFORMER_BY_AVG_RESOLUTION_TIME],
    key: EChartType.CHART_TICKET_TOP_PERFORMER_BY_AVG_RESOLUTION_TIME,
    title: 'Top Performer by Avg.Resolution Time',
    filterProps: {
      defaultQuery: groupByAssignToGroup
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVED_TICKET],
    key: EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVED_TICKET,
    title: 'Top Performer by Resolved Tickets',
    filterProps: {
      defaultQuery: groupByAssignToGroup
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY],
    key: EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY,
    title: 'Top Performer by Resolve Time Efficiency',
    filterProps: {
      defaultQuery: groupByAssignToGroup
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_UNRESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_PERFORMER_BY_UNRESOLVED_TICKET],
    key: EChartType.CHART_TICKET_TOP_PERFORMER_BY_UNRESOLVED_TICKET,
    title: 'Top Performer by Unresolved Tickets',
    filterProps: {
      defaultQuery: groupByAssignToGroup
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_REP_BY_AVG_RESOLUTION_TIME]: {
    component: chartComponents[EChartType.CHART_TICKET_REP_BY_AVG_RESOLUTION_TIME],
    key: EChartType.CHART_TICKET_REP_BY_AVG_RESOLUTION_TIME,
    title: 'Reps by Avg. Resolution Time',
    filterProps: {
      defaultQuery: 'typeOf=TICKET_BLOCK_REP_BY_AVG_RESOLUTION_TIME'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_REP_BY_RESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_REP_BY_RESOLVED_TICKET],
    key: EChartType.CHART_TICKET_REP_BY_RESOLVED_TICKET,
    title: 'Reps by Resolved Tickets',
    filterProps: {
      isDateUser: true,
      defaultQuery: 'typeOf=TICKET_BLOCK_REP_BY_RESOLVED_TICKETS'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_REP_BY_RESOLVE_TIME_EFFICIENCY]: {
    component: chartComponents[EChartType.CHART_TICKET_REP_BY_RESOLVE_TIME_EFFICIENCY],
    key: EChartType.CHART_TICKET_REP_BY_RESOLVE_TIME_EFFICIENCY,
    title: 'Reps by Resolve Time Efficiency',
    filterProps: {
      isDateUser: true,
      defaultQuery: 'typeOf=TICKET_BLOCK_REP_BY_RESOLVED_TIME_EFFICIENCY'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_REP_BY_UNRESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_REP_BY_UNRESOLVED_TICKET],
    key: EChartType.CHART_TICKET_REP_BY_UNRESOLVED_TICKET,
    title: 'Reps by Unresolved Tickets',
    filterProps: {
      isDateUser: true,
      defaultQuery: 'typeOf=TICKET_BLOCK_REP_BY_UNRESOLVED_TICKETS'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME],
    key: EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME,
    title: 'Top Group by Avg. Resolution Time',
    filterProps: {
      defaultQuery: 'typeOf=TICKET_BLOCK_TOP_GROUP_BY_AVG_RESOLUTION_TIME'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME_EFFICIENCY]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME_EFFICIENCY],
    key: EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME_EFFICIENCY,
    title: 'Top Group by Avg. Resolve Time Efficiency',
    filterProps: {
      defaultQuery: 'typeOf=TICKET_BLOCK_TOP_GROUP_BY_AVG_RESOLVED_TIME_EFFICIENCY'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLVED_TICKET],
    key: EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLVED_TICKET,
    title: 'Top Group by Resolved Tickets',
    filterProps: {
      defaultQuery: 'typeOf=TICKET_BLOCK_TOP_GROUP_BY_AVG_RESOLVED_TICKETS'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_UNRESOLVED_TICKET]: {
    component: chartComponents[EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_UNRESOLVED_TICKET],
    key: EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_UNRESOLVED_TICKET,
    title: 'Top Group by Unresolved Tickets',
    filterProps: {
      defaultQuery: 'typeOf=TICKET_BLOCK_TOP_GROUP_BY_AVG_UNRESOLVED_TICKETS'
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_KB_OVERVIEW]: {
    component: chartComponents[EChartType.CHART_KB_OVERVIEW],
    key: EChartType.CHART_KB_OVERVIEW,
    title: 'KB Overview',
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_KB_REP_PUBLISHED_ARTICLE]: {
    component: chartComponents[EChartType.CHART_KB_REP_PUBLISHED_ARTICLE],
    key: EChartType.CHART_KB_REP_PUBLISHED_ARTICLE,
    title: 'ncrm_dashboard_my_group_performer_by_published_articles',
    filterProps: {
      defaultQuery: `${groupByAssignToUser} ${assignToMyGroup}`
    },
    adminProps: {
      title: 'Reps by Published Articles',
      filterProps: {
        isDateUser: true,
        defaultQuery: groupByAssignToUser
      }
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_KB_REP_INSERTED_ARTICLE]: {
    component: chartComponents[EChartType.CHART_KB_REP_INSERTED_ARTICLE],
    key: EChartType.CHART_KB_REP_INSERTED_ARTICLE,
    title: 'ncrm_dashboard_my_group_performer_by_inserted_articles',
    filterProps: {
      defaultQuery: `${groupByAssignToUser} ${assignToMyGroup}`
    },
    adminProps: {
      title: 'Reps by Inserted Articles',
      filterProps: {
        isDateUser: true,
        defaultQuery: groupByAssignToUser
      }
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_KB_REP_VIEWED_ARTICLE]: {
    component: chartComponents[EChartType.CHART_KB_REP_VIEWED_ARTICLE],
    key: EChartType.CHART_KB_REP_VIEWED_ARTICLE,
    title: 'Reps by Viewed Articles',
    filterProps: {
      isDateUser: true,
      defaultQuery: groupByAssignToUser
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },


  [EChartType.CHART_SATISFACTION_AVG_CUSTOMER_SATISFACTION]: {
    component: chartComponents[EChartType.CHART_SATISFACTION_AVG_CUSTOMER_SATISFACTION],
    key: EChartType.CHART_SATISFACTION_AVG_CUSTOMER_SATISFACTION,
    title: "ncrm_dashboard_my_avg_customer_satisfaction",
    filterProps: {
      dateProps: {
        disableCustomize: true
      }
    },
    adminProps: {
      title: "Avg. Customer Satisfaction",
    },
    sx: {
      height: 'auto'
    },
    contentSx: {
      height: 'auto'
    },
    wrapperProps: {
      xs: 12,
      md: undefined
    }
  },
  [EChartType.CHART_SATISFACTION_QUESTION]: {
    component: chartComponents[EChartType.CHART_SATISFACTION_QUESTION],
    key: EChartType.CHART_SATISFACTION_QUESTION,
    title: "My Question 1",
    adminProps: {
      title: "Question 1",
      filterProps: {
        isDateGroup: true
      }
    },
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },


  [EChartType.CHART_SUS_ISSUED]: {
    component: chartComponents[EChartType.CHART_SUS_ISSUED],
    key: EChartType.CHART_SUS_ISSUED,
    title: "Issued",
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_SUS_MEDIUM]: {
    component: chartComponents[EChartType.CHART_SUS_MEDIUM],
    key: EChartType.CHART_SUS_MEDIUM,
    title: "Medium",
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_SUS_SOURCE]: {
    component: chartComponents[EChartType.CHART_SUS_SOURCE],
    key: EChartType.CHART_SUS_SOURCE,
    title: "Source",
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_SUS_CAMPAIGN]: {
    component: chartComponents[EChartType.CHART_SUS_CAMPAIGN],
    key: EChartType.CHART_SUS_CAMPAIGN,
    title: "Campaign",
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  },
  [EChartType.CHART_SUS_CLICK_TIME]: {
    component: chartComponents[EChartType.CHART_SUS_CLICK_TIME],
    key: EChartType.CHART_SUS_CLICK_TIME,
    title: "Time Clicked",
    wrapperProps: {
      xs: 12,
      lg: 6
    }
  }
};