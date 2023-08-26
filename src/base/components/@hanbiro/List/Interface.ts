import { PageLayoutSectionField } from '@base/types/pagelayout';
import { ReactNode } from 'react';
import { ListPaginationProps } from './ListPagination';

export interface BaseListProps {
  checkedIds?: string[];
  onRowChecked?: (ids: string[]) => void;
  pagingProps?: ListPaginationProps;
  onPageChange?: (page: number, size: number) => void;
  rows: any[];
  primaryKey?: string;

  // need to checking use or not use
  titleKey?: string;
  titleUrlKey?: string;
  photoKey?: string;
}

export interface ListColumn extends PageLayoutSectionField {
  render?: (...parameters: any[]) => any;
}

export interface GridFieldConfig {
  keyName: string;
  label: string;
  getValue?: (value: any) => any;
  component?: (value: any) => ReactNode;
}
