import Icon from '@base/assets/icons/svg-icons';
import { LabelValue, LabelValueIcon } from '@base/types/app';

export const KnowledgeBaseToolbarMoreOptions: LabelValueIcon[] = [
  {
    label: 'ncrm_desk_knowledge_base_import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'ncrm_desk_knowledge_base_export',
    value: 'export',
    icon: Icon('download')
  }
];
export const KBPublishOptions = [
  {
    label: 'Published',
    value: true
  },
  {
    label: 'Draft',
    value: false
  }
];
export const DEFAULT_ROUTE = '/mdesk/knowledge';
