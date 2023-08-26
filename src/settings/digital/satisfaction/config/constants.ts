import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon } from '@base/types/app';

//constant
export const Q_SAT_MULTI_CHOICES_GRID = 1;
export const Q_SAT_TICK_BOX_GRID = 2;

export const TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: 'export',
    icon: Icon('download')
  }
];
