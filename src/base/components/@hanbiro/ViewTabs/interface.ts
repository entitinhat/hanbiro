import { ReactNode, ReactElement } from 'react';

export interface TabProps {
  default?: boolean;
  label: string | ReactNode;
  path: string;
  order: number;
  tabComponent: ReactNode;
  show?: boolean;
  icon?: ReactElement;
  iconPosition?: 'bottom' | 'top' | 'end' | 'start';
}
export interface ViewTabsProps {
  menuSource: string;
  menuSourceId: string;
  tabs: TabProps[];
  swipeView?: boolean;
  disableTabPadding?: boolean;
}

export interface HeaderProps {
  tabs: TabProps[];
  activeTab: string;
}

export interface BodyProps {
  tabs: TabProps[];
  activeTab: string;
}
