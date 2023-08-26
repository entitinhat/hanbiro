import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon } from '@base/types/app';

export const ToolbarMoreOptions: LabelValueIcon[] = [
  {
    label: 'ncrm_common_import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'ncrm_common_export',
    value: 'export',
    icon: Icon('download')
  }
];
export const DEFAULT_ROUTE = '/desk/knowledge';
