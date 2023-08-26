import {KeyedObject} from "@base/types/root";
import {ESectionType, ERepeatUnit, EWeekDayEnum, EPackageEnum, EMediumEnum} from '@analytic/main/types/enum';
import { EDisplayModeType } from '@analytic/main/types/enum';

export const repeatUnitOptions: any = {
  [ERepeatUnit.REPEAT_UNIT_DAILY]: 'ncrm_common_daily',
  [ERepeatUnit.REPEAT_UNIT_WEEKLY]: 'ncrm_common_weekly',
  [ERepeatUnit.REPEAT_UNIT_MONTHLY]: 'ncrm_common_monthly',
  [ERepeatUnit.REPEAT_UNIT_YEARLY]: 'ncrm_common_yearly'
};

export const weekDayOptions: any = {
  [EWeekDayEnum.WEEK_DAY_SUNDAY]: 'ncrm_common_sun',
  [EWeekDayEnum.WEEK_DAY_MONDAY]: 'ncrm_common_mon',
  [EWeekDayEnum.WEEK_DAY_TUESDAY]: 'ncrm_common_tue',
  [EWeekDayEnum.WEEK_DAY_WEDNESDAY]: 'ncrm_generalsetting_wed',
  [EWeekDayEnum.WEEK_DAY_THURSDAY]: 'ncrm_common_thu',
  [EWeekDayEnum.WEEK_DAY_FRIDAY]: 'ncrm_common_fri',
  [EWeekDayEnum.WEEK_DAY_SATURDAY]: 'ncrm_common_sat'
};

export const sectionOptions: any = {
  [ESectionType.SECTION_CUSTOMER]: 'ncrm_common_customer_analysis',
  [ESectionType.SECTION_ACTIVITY]: 'ncrm_common_customer_activity_analysis',
  [ESectionType.SECTION_DESK]: 'ncrm_common_customer_ticket_analysis',
  [ESectionType.SECTION_SATISFACTION]: 'ncrm_common_customer_satisfaction_analysis'
};

export const displayModeOptions: any = {
  [EDisplayModeType.DISPLAY_MODE_PORTRAIT]: 'ncrm_dashboard_report_displaymode_portrait',
  [EDisplayModeType.DISPLAY_MODE_LANDSCAPE]: 'ncrm_dashboard_report_displaymode_landscape'
};

export const sourceOptions: KeyedObject = {
  [EPackageEnum.PACKAGE_NONE]: 'ncrm_common_none',
  [EPackageEnum.PACKAGE_DESK]: 'ncrm_common_package_desk',
  [EPackageEnum.PACKAGE_SALES]: 'ncrm_common_package_sales'
};

export const mediumOptions: KeyedObject = {
  [EMediumEnum.MEDIUM_NONE]: 'ncrm_common_none',
  [EMediumEnum.MEDIUM_EMAIL]: 'ncrm_common_email',
  [EMediumEnum.MEDIUM_SMS]: 'ncrm_common_sms'
};

export const susStatusOptions: KeyedObject = {
  clicked: 'ncrm_sus_status_clicked',
  noClicked: 'ncrm_sus_status_no_clicked',
};