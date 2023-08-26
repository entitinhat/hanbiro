import SelectBoxCustom from '@base/components/@hanbiro/SelectBoxCustom';
import Switch from '@base/components/@hanbiro/Switch';
import * as keyNames from '@desk/knowledge-base/config/keyNames';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { t } from 'i18next';
import { KBPublishOptions } from '../constants';
import { Tags } from '../write-field/components';

export const groupByOptions = [
  { label: 'ncrm_desk_knowledge_base_group_by_all_articles', value: 'all' },
  // { label: 'ncrm_desk_knowledge_base_group_by_my_articles', value: 'my' },
  // { label: 'ncrm_desk_knowledge_base_group_by_my_group_articles', value: 'myGroup' },
  { label: 'ncrm_desk_knowledge_base_group_by_all_published', value: 'allPublished' },
  { label: 'ncrm_desk_knowledge_base_group_by_all_drafts', value: 'allDrafts' },
  { label: 'ncrm_desk_knowledge_base_group_by_my_published', value: 'myPublished' },
  { label: 'ncrm_desk_knowledge_base_group_by_my_drafts', value: 'myDrafts' },
  // { label: 'ncrm_desk_knowledge_base_group_by_my_group_drafts', value: 'myGroupDrafts' },
  // { label: 'ncrm_desk_knowledge_base_group_by_my_group_published', value: 'myGroupPublished' },
  { label: 'ncrm_desk_knowledge_base_group_by_deleted_knowledge', value: 'deletedKB' }
];

export const dateByOptions = [
  { label: 'ncrm_desk_knowledge_base_sort_by_created_on', value: 'createdAt' },
  { label: 'ncrm_desk_knowledge_base_sort_by_updated_on', value: 'updatedAt' }
];

export const filterByOptions = [
  {
    label: 'ncrm_desk_knowledge_base_filter_owner',
    value: keyNames.KEY_KNOWLEDGE_CREATED_BY,
    component: UserAutoComplete,
    componentProps: {
      showAvartar: true
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: any) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_desk_knowledge_base_filter_publish',
    value: keyNames.KEY_KNOWLEDGE_BASE_ISPUBLISH,
    component: SelectBoxCustom,
    componentProps: {
      options: KBPublishOptions,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    getValue: (value: any) => {
      return value?.value;
    },
    setValue: (value: any) => {
      return value?.value;
    },
    parseExtra: (value: any) => {
      return value?.value ? t(`Published`) : t(`Draft`);
    }
  },
  {
    label: 'ncrm_desk_knowledge_base_filter_tag',
    value: keyNames.KEY_KNOWLEDGE_BASE_TAG,
    component: Tags,
    componentProps: {
      // fetchList: useKnowledgeBaseTags,
      fieldValue: 'id',
      fieldLabel: 'name'
      // not used
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: any) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_desk_knowledge_base_filter_updated_by',
    value: keyNames.KEY_KNOWLEDGE_UPDATED_BY,
    component: UserAutoComplete,
    componentProps: {
      showAvartar: true
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: any) => {
      return value ? value.split(',') : [];
    }
  }
];

export const dateByFields: string[] = [keyNames.KEY_KNOWLEDGE_UPDATED_AT, keyNames.KEY_KNOWLEDGE_CREATED_AT];
export const searchFields: string[] = [keyNames.KEY_KNOWLEDGE_BASE_SUBJECT];
