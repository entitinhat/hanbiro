import React, { Fragment, useMemo, useState } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//material
import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@campaign/config/keyNames';
import { CAMPAIGN_CATEGORY_EMAIL, STEP_FIELDS } from '@campaign/config/constants';
import ContentEditor from '@campaign/components/ContentEditor';
import LoadingButton from '@base/components/@extended/LoadingButton';
import useCampaignUpdate from '@campaign/hooks/useCampaignUpdate';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import DateRangePicker from '@base/components/@hanbiro/Date/DateRangePicker';
import { ArrowForward, ArrowForwardIos, MailOutlined, MoreHorizOutlined, PhoneOutlined, SearchOutlined } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { ResponsiveFunnel, Funnel } from '@nivo/funnel';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ColumnDef } from '@tanstack/react-table';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';

interface OpenTimelineProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
}

const OpenTimeline = (props: OpenTimelineProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], layoutData, readOnly } = props;
  const theme = useTheme();
  const defaultValues = [
    {
      id: '111',
      timestamp: '2023-02-17 08:00',
      recipients: [
        { id: '1', name: 'Adventure works 1', email: 'ad1@works.com' },
        { id: '1', name: 'Adventure works 2', email: 'ad2@works.com' }
      ]
    },
    {
      id: '112',
      timestamp: '2023-02-17 08:00',
      recipients: [
        { id: '3', name: 'Adventure works 3', email: 'ad3@works.com' },
        { id: '4', name: 'Adventure works 4', email: 'ad4@works.com' }
      ]
    }
  ];
  const [items, setItems] = useState<any>(defaultValues);

  //render columns components
  const getMapColumns = () => {
    return {
      timestamp(col: string, data: any) {
        return <Typography>{data[col]}</Typography>;
      },
      recipients(col: string, data: any) {
        return (
          <Stack direction={'row'} spacing={0.5}>
            {data[col]?.map((_item: any, index: number) => (
              <Fragment key={index}>
                <Typography color="secondary.main">{_item.name}</Typography>
                <Typography fontWeight={'bold'}>{`<${_item.email}>`}</Typography>
                {data[col].length !== index + 1 && <Typography>, </Typography>}
              </Fragment>
            ))}
          </Stack>
        );
      }
    };
  };

  //table columns
  const fields = useMemo(() => {
    return [
      { languageKey: 'Timestamp', keyName: 'timestamp', enableSorting: false, width: 'auto' },
      { languageKey: 'Recipients', keyName: 'recipients', enableSorting: false, width: 'auto' }
    ];
  }, [menuSourceId]);

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  //chart data
  const timelineSeries = [
    {
      name: 'Open Timeline',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }
    // {
    //   name: 'Revenue',
    //   data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    // },
    // {
    //   name: 'Free Cash Flow',
    //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    // }
  ];
  const chartOptions = {
    chart: {
      //type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 05', 'Feb 06', 'Feb 07', 'Feb 08', 'Feb 09']
    },
    // yaxis: {
    //   title: {
    //     text: '$ (thousands)'
    //   }
    // },
    fill: {
      opacity: 1
    }
    // tooltip: {
    //   y: {
    //     formatter: function (val: any) {
    //       return '$ ' + val + ' thousands';
    //     }
    //   }
    // }
  };

  return (
    <Box className="detail-view scroll-box" sx={{ pr: 2 }}>
      <Box sx={{ my: 2 }}>
        <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} sx={{ mb: 1 }}>
          <Typography variant="h6">Open timeline</Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <InputLabel>Date Range</InputLabel>
            <DateRangePicker />
          </Stack>
        </Stack>
        <ReactApexChart options={chartOptions} series={timelineSeries} type="bar" height={350} />
      </Box>
      <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <ReactTable8 columns={columns} data={[...items]} paging={{ pageSize: 100 }} />
      </Box>
    </Box>
  );
};

export default OpenTimeline;
