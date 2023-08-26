import { ChipProps } from '@mui/material';

interface ColorNameIcon {
  color: ChipProps['color'];
  textColor?: string;
  backgroundColor?: string;
  name: string;
  icon?: string;
}

export interface ColorNameIconConfig {
  [x: string]: ColorNameIcon;
}
