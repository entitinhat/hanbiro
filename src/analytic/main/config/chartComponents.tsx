import {EChartType} from "@analytic/main/types/enum";

import CustomerByPeriod from "@analytic/main/containers/CustomerByPeriod";
import CustomerTrend from "@analytic/main/containers/CustomerTrend";
import CustomerUpdated from "@analytic/main/containers/CustomerUpdated";
import CustomerRating from "@analytic/main/containers/CustomerRating";
import CustomerIndustry from "@analytic/main/containers/CustomerIndustry";

import ActivityTrend from "@analytic/main/containers/ActivityTrend";
import ActivityByType from "@analytic/main/containers/ActivityByType";
import ActivityDuration from "@analytic/main/containers/ActivityDuration";
import ActivityGroupDuration from "@analytic/main/containers/ActivityGroupDuration";
import ActivityGroupTotal from "@analytic/main/containers/ActivityGroupTotal";
import ActivityGroupPerformance from "@analytic/main/containers/ActivityGroupPerformance";
import ActivityRepPerformance from "@analytic/main/containers/ActivityRepPerformance";
import ActivityTodo from "@analytic/main/containers/ActivityTodo";
import ActivityOverdueRepChart from "@analytic/main/containers/ActivityOverdueRepChart";
import ActivityTotalByRep from "@analytic/main/containers/ActivityTotalByRep";
import ActivityTotalByGroup from "@analytic/main/containers/ActivityTotalByGroup";
import ActivityTopPerformerByTask from "@analytic/main/containers/ActivityTopPerformerByTask";
import ActivityPurpose from "@analytic/main/containers/ActivityPurpose";
import ActivityTopPerformerByCall from "@analytic/main/containers/ActivityTopPerformerByCall";
import ActivityTopPerformerByEmail from "@analytic/main/containers/ActivityTopPerformerByEmail";
import ActivityPriority from "@analytic/main/containers/ActivityPriority";
import ActivityTopPerformerBySms from "@analytic/main/containers/ActivityTopPerformerBySms";
import ActivityComparison from "@analytic/main/containers/ActivityComparison";

import TicketTrend from "@analytic/main/containers/TicketTrend";
import TicketPerformerByResolveTimeEfficiency from "@analytic/main/containers/TicketPerformerByResolveTimeEfficiency";
import TicketOverview from "@analytic/main/containers/TicketOverview";
import TicketPerformerByResolveTime from "@analytic/main/containers/TicketPerformerByResolveTime";
import TicketGroupPerformance from "@analytic/main/containers/TicketGroupPerformance";
import TicketGroupPerformanceByAssignedTicket from "@analytic/main/containers/TicketGroupPerformanceByAssignedTicket";
import TicketGroupPerformanceByResolveTimeEfficiency
  from "@analytic/main/containers/TicketGroupPerformanceByResolveTimeEfficiency";
import TicketGroupPerformanceByResolvedTicket from "@analytic/main/containers/TicketGroupPerformanceByResolvedTicket";
import TicketGroupPerformanceByUnresolvedTicket
  from "@analytic/main/containers/TicketGroupPerformanceByUnresolvedTicket";
import TicketGroupPerformanceByResolutionTime from "@analytic/main/containers/TicketGroupPerformanceByResolutionTime";
import TicketPriority from "@analytic/main/containers/TicketPriority";
import TicketTopIssue from "@analytic/main/containers/TicketTopIssue";
import TicketByCategory from "@analytic/main/containers/TicketByCategory";
import TicketRepPerformance from "@analytic/main/containers/TicketRepPerformance";
import TicketAvgSupportPerformance from "@analytic/main/containers/TicketAvgSupportPerformance";
import TicketTopPerformerByAvgResolutionTime from "@analytic/main/containers/TicketTopPerformerByAvgResolutionTime";
import TicketTopPerformerByResolvedTicket from "@analytic/main/containers/TicketTopPerformerByResolvedTicket";
import TicketTopPerformerByResolveTimeEfficiency
  from "@analytic/main/containers/TicketTopPerformerByResolveTimeEfficiency";
import TicketTopPerformerByUnresolvedTicket from "@analytic/main/containers/TicketTopPerformerByUnresolvedTicket";
import TicketRepByAvgResolutionTime from "@analytic/main/containers/TicketRepByAvgResolutionTime";
import TicketRepByResolvedTicket from "@analytic/main/containers/TicketRepByResolvedTicket";
import TicketRepByResolveTimeEfficiency from "@analytic/main/containers/TicketRepByResolveTimeEfficiency";
import TicketRepByUnresolvedTicket from "@analytic/main/containers/TicketRepByUnresolvedTicket";
import TicketTopGroupByAvgResolutionTime from "@analytic/main/containers/TicketTopGroupByAvgResolutionTime";
import TicketTopGroupByAvgResolveTimeEfficiency
  from "@analytic/main/containers/TicketTopGroupByAvgResolveTimeEfficiency";
import TicketTopGroupByResolvedTicket from "@analytic/main/containers/TicketTopGroupByResolvedTicket";
import TicketTopGroupByUnresolvedTicket from "@analytic/main/containers/TicketTopGroupByUnresolvedTicket";

import KbOverview from "@analytic/main/containers/KbOverview";
import KbRepPublishedArticle from "@analytic/main/containers/KbRepPublishedArticle";
import KbRepInsertedArticle from "@analytic/main/containers/KbRepInsertedArticle";
import KbRepViewedArticle from "@analytic/main/containers/KbRepViewedArticle";

import SatisfactionAvgCustomerSatisfaction from "@analytic/main/containers/SatisfactionAvgCustomerSatisfaction";
import SatisfactionQuestion from "@analytic/main/containers/SatisfactionQuestion";

import SusClickTime from "@analytic/main/containers/SusClickTime";
import SusIssued from "@analytic/main/containers/SusIssued";
import SusMedium from "@analytic/main/containers/SusMedium";
import SusSource from "@analytic/main/containers/SusSource";
import SusCampaign from "@analytic/main/containers/SusCampaign";

const chartComponents = {
  [EChartType.CHART_CUSTOMER_PERIOD]: CustomerByPeriod,
  [EChartType.CHART_CUSTOMER_TREND]: CustomerTrend,
  [EChartType.CHART_CUSTOMER_LAST_UPDATED]: CustomerUpdated,
  [EChartType.CHART_CUSTOMER_RATING]: CustomerRating,
  [EChartType.CHART_CUSTOMER_INDUSTRY]: CustomerIndustry,


  [EChartType.CHART_ACTIVITY_TREND]: ActivityTrend,
  [EChartType.CHART_ACTIVITY_TODO]: ActivityTodo,
  [EChartType.CHART_ACTIVITY_REP_PERFORMANCE]: ActivityRepPerformance,
  [EChartType.CHART_ACTIVITY_TYPE]: ActivityByType,
  [EChartType.CHART_ACTIVITY_GROUP_TOTAL]: ActivityGroupTotal,
  [EChartType.CHART_ACTIVITY_DURATION]: ActivityDuration,
  [EChartType.CHART_ACTIVITY_GROUP_DURATION]: ActivityGroupDuration,
  [EChartType.CHART_ACTIVITY_GROUP_PERFORMANCE]: ActivityGroupPerformance,
  [EChartType.CHART_ACTIVITY_TOTAL_BY_GROUP]: ActivityTotalByGroup,
  [EChartType.CHART_ACTIVITY_TOTAL_BY_REP]: ActivityTotalByRep,
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_CALL]: ActivityTopPerformerByCall,
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_TASK]: ActivityTopPerformerByTask,
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_EMAIL]: ActivityTopPerformerByEmail,
  [EChartType.CHART_ACTIVITY_TOP_PERFORMER_BY_SMS]: ActivityTopPerformerBySms,
  [EChartType.CHART_ACTIVITY_PURPOSE]: ActivityPurpose,
  [EChartType.CHART_ACTIVITY_BY_TYPE]: ActivityByType,
  [EChartType.CHART_ACTIVITY_OVERDUE_REP_CHART]: ActivityOverdueRepChart,
  [EChartType.CHART_ACTIVITY_BY_PRIORITY_CHART]: ActivityPriority,
  [EChartType.CHART_ACTIVITY_COMPARISON]: ActivityComparison,


  [EChartType.CHART_TICKET_TREND]: TicketTrend,
  [EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY]: TicketPerformerByResolveTimeEfficiency,
  [EChartType.CHART_TICKET_OVERVIEW]: TicketOverview,
  [EChartType.CHART_TICKET_PERFORMER_BY_RESOLVE_TIME]: TicketPerformerByResolveTime,
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE]: TicketGroupPerformance,
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_ASSIGNED_TICKET]: TicketGroupPerformanceByAssignedTicket,
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVE_TIME_EFFICIENCY]: TicketGroupPerformanceByResolveTimeEfficiency,
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLVED_TICKET]: TicketGroupPerformanceByResolvedTicket,
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_UNRESOLVED_TICKET]: TicketGroupPerformanceByUnresolvedTicket,
  [EChartType.CHART_TICKET_GROUP_PERFORMANCE_BY_RESOLUTION_TIME]: TicketGroupPerformanceByResolutionTime,
  [EChartType.CHART_TICKET_PRIORITY]: TicketPriority,
  [EChartType.CHART_TICKET_TOP_ISSUE]: TicketTopIssue,
  [EChartType.CHART_KB_REP_PUBLISHED_ARTICLE]: KbRepPublishedArticle,
  [EChartType.CHART_KB_REP_INSERTED_ARTICLE]: KbRepInsertedArticle,
  [EChartType.CHART_TICKET_BY_CATEGORY]: TicketByCategory,
  [EChartType.CHART_TICKET_GROUP_PERFORMER]: TicketGroupPerformance,
  [EChartType.CHART_TICKET_REP_PERFORMER]: TicketRepPerformance,
  [EChartType.CHART_TICKET_AVG_SUPPORT_PERFORMER]: TicketAvgSupportPerformance,
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_AVG_RESOLUTION_TIME]: TicketTopPerformerByAvgResolutionTime,
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVED_TICKET]: TicketTopPerformerByResolvedTicket,
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_RESOLVE_TIME_EFFICIENCY]: TicketTopPerformerByResolveTimeEfficiency,
  [EChartType.CHART_TICKET_TOP_PERFORMER_BY_UNRESOLVED_TICKET]: TicketTopPerformerByUnresolvedTicket,
  [EChartType.CHART_TICKET_REP_BY_AVG_RESOLUTION_TIME]: TicketRepByAvgResolutionTime,
  [EChartType.CHART_TICKET_REP_BY_RESOLVED_TICKET]: TicketRepByResolvedTicket,
  [EChartType.CHART_TICKET_REP_BY_RESOLVE_TIME_EFFICIENCY]: TicketRepByResolveTimeEfficiency,
  [EChartType.CHART_TICKET_REP_BY_UNRESOLVED_TICKET]: TicketRepByUnresolvedTicket,
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME]: TicketTopGroupByAvgResolutionTime,
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLUTION_TIME_EFFICIENCY]: TicketTopGroupByAvgResolveTimeEfficiency,
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_RESOLVED_TICKET]: TicketTopGroupByResolvedTicket,
  [EChartType.CHART_TICKET_TOP_GROUP_BY_AVG_UNRESOLVED_TICKET]: TicketTopGroupByUnresolvedTicket,
  [EChartType.CHART_KB_OVERVIEW]: KbOverview,
  [EChartType.CHART_KB_REP_VIEWED_ARTICLE]: KbRepViewedArticle,


  [EChartType.CHART_SATISFACTION_AVG_CUSTOMER_SATISFACTION]: SatisfactionAvgCustomerSatisfaction,
  [EChartType.CHART_SATISFACTION_QUESTION]: SatisfactionQuestion,

  [EChartType.CHART_SUS_ISSUED]: SusIssued,
  [EChartType.CHART_SUS_MEDIUM]: SusMedium,
  [EChartType.CHART_SUS_SOURCE]: SusSource,
  [EChartType.CHART_SUS_CAMPAIGN]: SusCampaign,
  [EChartType.CHART_SUS_CLICK_TIME]: SusClickTime,
};

export default chartComponents;