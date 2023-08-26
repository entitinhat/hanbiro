import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import _ from 'lodash';

import RawHTML from '@base/components/@hanbiro/RawHTML';
import { Timeline } from '@base/types/timeLine';
import { removeTags } from '@base/utils/helpers/stringUtils';
import * as keyNames from '@project/config/keyNames';

const createTpl = _.template('<label class="tx-primary"><%= to%></label> Created.');
const updateTpl = _.template(
  '<label class="tx-primary"><%= lang%></label> was updated from <label class="tx-gray-500"><%= from%></label> to <label class="tx-gray-500"><%= to%></label>'
);
const deleteTpl = _.template('<%= to%> deleted');

export const makeContent = (t: TFunction, item: Timeline) => {
  return item.content?.map((content, index) => {
    let [from, to]: string[] = content.value.split('|->|');
    const [fromId, fromName] = from.split('|<->|');
    const [toId, toName] = to.split('|<->|');
    let lang = '';

    if (item.menu == 'MENU_PROJECT') {
      if (item.tab == 'TAB_SELF') {
        if (item.section == 'SECTION_FIELD') {
          if (keyNames.KEY_NAME_PROJECT_NAME == content.field) {
            lang = 'ncrm_project_project_name';
          } else if (keyNames.KEY_NAME_PROJECT_PARENT == content.field) {
            lang = 'ncrm_project_project_parent';
          } else if (keyNames.KEY_NAME_PROJECT_TYPE == content.field) {
            lang = 'ncrm_project_project_type';
          } else if (keyNames.KEY_NAME_PROJECT_DESCRIPTION == content.field) {
            lang = 'ncrm_project_project_description';
          } else if (keyNames.KEY_NAME_PROJECT_START_DATE == content.field) {
            lang = 'ncrm_project_project_start_date';
          } else if (keyNames.KEY_NAME_PROJECT_DUE_DATE == content.field) {
            from = dayjs(from).format('YYYY-MM-DD');
            to = dayjs(to).format('YYYY-MM-DD');
            lang = 'ncrm_project_project_due_date';
          } else if (keyNames.KEY_NAME_PROJECT_ACCOUNT == content.field) {
            lang = 'ncrm_project_project_account';
          } else if (keyNames.KEY_NAME_PROJECT_ESTIMATE_DURATION == content.field) {
            lang = 'ncrm_project_project_estimate_duration';
          } else if (keyNames.KEY_NAME_PROJECT_PROCESS == content.field) {
            lang = 'ncrm_project_project_process';
          } else if (keyNames.KEY_NAME_PROJECT_MEMBERS == content.field) {
            lang = 'ncrm_project_project_member';
          } else {
            lang = '';
          }
        }
      }
    }
    const tplData = {
      field: content.field,
      lang: t(lang),
      from: fromName ? fromName : removeTags(from),
      to: toName ? toName : removeTags(to)
    };
    let returnTpl;
    if (item.action == 'created') {
      returnTpl = createTpl(tplData);
    } else if (item.action == 'updated') {
      returnTpl = updateTpl(tplData);
    } else {
      returnTpl = deleteTpl(tplData);
    }
    return <RawHTML key={index}>{returnTpl}</RawHTML>;
  });
};
