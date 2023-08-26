import { LabelValueIcon } from '@base/types/app';
import { SxProps } from '@mui/system';

export interface ViewHeaderProps {
  menus?: any[];
  menu?: string;
  isSplitMode?: boolean;
  onMenuChange?: (menu: string) => void;
  title: React.ReactNode;
  // componentRight?: any;
  // componentLeft?: any;
  // onExportToPDF?: any;
  // onPrint?: any;
  // onDelete?: any;
  // onSendEmail?: any;
  onMore?: any;
  onNew?: (mode?: string) => void;
  addOptions?: any;
  // addOptionType?: string;
  // onClone?: any;
  // isDeleting?: any;
  moreActions?: LabelValueIcon[];
  newTitle?: string;
  listTitle?: LabelValueIcon;
  hideChangeMenu?: boolean;
  hideBackButton?: boolean;
  // newActions?: any;
  // newActionDefault?: () => {};
  // stages?: any;
  // onStageChange?: any;
  // useNewFilter?: boolean;
  // moreButtons?: any;
  // onBeforeGoList?: () => void;
}

export interface ViewLeftProps {}

export interface ViewCenterProps {}

export interface ViewRightProps {}

export interface ViewLayoutProps {
  componentHeader?: React.ReactNode;
  componentTop?: React.ReactNode;
  componentLeft?: React.ReactNode;
  componentCenter?: React.ReactNode;
  componentRight?: React.ReactNode;
  containerSx?: SxProps;
  disableCollapseLeft?: boolean;
  extraHeight?: number;
}

export interface MenuFilterProps {
  value: string;
  listFilter: {
    [key: string]: any;
  };
  label?: string;
  onChange?: (selected: string) => void;
}
