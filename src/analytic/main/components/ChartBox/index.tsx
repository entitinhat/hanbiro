import React, {useMemo, useState} from 'react';
import MainCard from "@base/components/App/MainCard";
import ChartTest from "@analytic/main/components/ChartTest";
import { cloneDeep } from 'lodash';
import FilterBar, {
  FilterBarProps as IFilterBarProps
} from "@analytic/main/components/ChartBox/FilterBar";
import {Box, Divider} from "@mui/material";
import {SxProps} from "@mui/system";
import { useTranslation } from 'react-i18next';

export interface ToolbarProps {
  onRefetch: () => void;
}

interface FilterProps extends IFilterBarProps {
  isShow?: boolean;
  defaultQuery?: string;
}

export interface ChartBoxProps {
  key?: string;
  title: string;
  me?: boolean;
  toolbarProps?: any;
  filterProps?: FilterProps;
  adminProps?: ChartBoxProps;
  sx?: SxProps;
  contentSx?: SxProps;
  subContentSx?: SxProps;
  [x: string]: any;
}

export interface ChartComponentProps {
  me?: boolean;
  filters?: any;
  setLoading?: (is: boolean) => void;
  setToolbarProps?: (props: ToolbarProps) => void;
}

interface Props extends ChartBoxProps {}

const ChartBox = (props: Props) => {
  const {
    component: Component,
    title,
    me,
    filterProps = {},
    sx,
    contentSx,
    subContentSx
  } = props;

  const { t } = useTranslation()
  
  const {
    isShow = true,
    defaultQuery = '',
    ...restFilterProps
  } = filterProps;

  const [loading, setLoading] = useState(false);
  const [toolbarProps, setToolbarProps] = useState<ToolbarProps | null>(null);
  const [filters, setFilters] = useState<any>({
    filter: {
      query: defaultQuery
    }
  });

  const ChartComponent = useMemo(() => {
    return (props: ChartComponentProps) => {
      console.log('ChartComponent render', title);
      return Component ? <Component {...props}/> : <ChartTest {...props}/>;
    }
  }, [filters]);

  const filtersClone: any = cloneDeep(filters);
  const chartComponentProps: ChartComponentProps = {
    me,
    filters: filtersClone,
    setLoading,
    setToolbarProps: (props: any) => {
      setToolbarProps(props);
    }
  };

  const handleSetQuery = (q: string) => {
    if(q !== filters?.filter?.query){
      setFilters({
        ...filters,
        filter: {
          ...filters.filter,
          query: (!!defaultQuery ? (defaultQuery + ' ') : '') + q
        }
      });
    }
  };

  return (
    <MainCard
      title={t(title) as string}
      sx={{
        height: '500px',
        ...sx
      }}
      contentSX={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 63px)',
        p: '0px!important',
        ...contentSx
      }}
    >
      {isShow && <>
          <FilterBar {...restFilterProps} onChange={handleSetQuery} />
          <Divider orientation="horizontal" variant="middle" sx={{borderStyle: "dotted!important", m: 0}} />
      </>}
      <Box flexGrow={1} sx={subContentSx}>
        {
          (!isShow || !!filters?.filter?.query) && <ChartComponent {...chartComponentProps}/>
        }
        {
          /*loading && <Box sx={{
            position: 'absolute',
            zIndex: 10,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: (theme: Theme) => theme.palette.grey[50],
            opacity: 0.8
          }}/>*/
        }
        {
          /*loading && <LoadingCircular loading/>*/
        }
      </Box>
    </MainCard>
  );
};

export default ChartBox;