import {ChipProps} from "@mui/material";

interface ColorNameIcon {
  color: ChipProps['color'];
  name: string;
  icon?: string;
}

export interface ColorNameIconConfig {
  [x: string]: ColorNameIcon;
}