import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon } from '@base/types/app';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import * as keyNames from '@quote/config/keyNames';

export const COMPETITOR_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'Sales  Preferences',
    value: 'sales_setting',
    icon: Icon('sales')
  }
];

//delete groupby
export const COMPETITOR_DELTED_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'ncrm_common_btn_empty_all',
    value: 'empty',
    icon: Icon('empty')
  }
];
