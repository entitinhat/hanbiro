import React, { useMemo, useState } from 'react';

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

interface LinkMapProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
}

const LinkMap = (props: LinkMapProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], layoutData, readOnly } = props;
  const theme = useTheme();
  const defaultValues = [
    {
      id: '111',
      type: 'email',
      channel: {
        name: 'Email',
        total: 1000
      },
      firstLink: {
        clicked: 0.7, //%
        reached: 700
      },
      secondLink: [
        {
          clicked: 0.5, //%
          reached: 350
        },
        {
          clicked: 0.15, //%
          reached: 105
        }
      ]
    },
    {
      id: '222',
      type: 'drop',
      channel: {
        name: 'Dropped'
      },
      firstLink: {
        clicked: 0.3, //%
        reached: 400
      },
      secondLink: [
        {
          clicked: 0.2, //%
          reached: 150
        }
      ]
    }
  ];
  const [items, setItems] = useState<any>(defaultValues);

  //render columns components
  const getMapColumns = () => {
    return {
      channel(col: string, data: any) {
        return (
          <Box>
            <Typography>{data[col].name}</Typography>
            {data[col]?.total && <Typography color="warning.main">{`(Total: ${data[col].total})`}</Typography>}
          </Box>
        );
      },
      firstLink(col: string, data: any) {
        return (
          <Grid container>
            <Grid item xs={5} lg={5}>
              <Stack alignItems="center">
                <InputLabel>clicked</InputLabel>
                <Typography variant="h5" color={data.type === 'email' ? 'success.main' : 'error.main'}>
                  {data[col]?.clicked || 0}
                </Typography>
                {data.type === 'email' && (
                  <Button size="small" variant="text" color="primary" endIcon={<SearchOutlined />}>
                    MS View More Btn
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid item xs={2} lg={2}>
              <Stack alignItems="center" justifyContent={'center'} sx={{ height: '100%' }}>
                <ArrowForwardIos />
              </Stack>
            </Grid>
            <Grid item xs={5} lg={5}>
              <Stack alignItems="center">
                <InputLabel>reached</InputLabel>
                <Typography variant="h5" color={data.type === 'email' ? 'success.main' : 'error.main'}>
                  {data[col]?.reached || 0}
                </Typography>
                {data.type === 'email' && (
                  <Button size="small" variant="text" color="primary" endIcon={<SearchOutlined />}>
                    MS Landing Page
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        );
      },
      secondLink(col: string, data: any) {
        return (
          <>
            {data[col].map((_item: any, index: number) => (
              <>
                <Grid container key={index}>
                  <Grid item xs={5} lg={5}>
                    <Stack alignItems="center">
                      <InputLabel>clicked</InputLabel>
                      <Typography variant="h5" color={data.type === 'email' ? 'success.main' : 'error.main'}>
                        {_item?.clicked || 0}
                      </Typography>
                      {data.type === 'email' && (
                        <Button size="small" variant="text" color="primary" endIcon={<SearchOutlined />}>
                          MS View More Btn
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={2} lg={2}>
                    <Stack alignItems="center" justifyContent={'center'} sx={{ height: '100%' }}>
                      <ArrowForwardIos />
                    </Stack>
                  </Grid>
                  <Grid item xs={5} lg={5}>
                    <Stack alignItems="center">
                      <InputLabel>reached</InputLabel>
                      <Typography variant="h5" color={data.type === 'email' ? 'success.main' : 'error.main'}>
                        {_item?.reached || 0}
                      </Typography>
                      {data.type === 'email' && (
                        <Button size="small" variant="text" color="primary" endIcon={<SearchOutlined />}>
                          MS Landing Page
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
                {data[col].length > 0 && data[col].length !== index + 1 && (
                  <Box sx={{ py: 2 }}>
                    <Divider />
                  </Box>
                )}
              </>
            ))}
          </>
        );
      }
    };
  };

  //table columns
  const fields = useMemo(() => {
    return [
      { languageKey: 'Channel', keyName: 'channel', enableSorting: false, width: 'auto' },
      { languageKey: 'First Link', keyName: 'firstLink', enableSorting: false, width: 'auto' },
      { languageKey: 'Second Link', keyName: 'secondLink', enableSorting: false, width: 'auto' }
    ];
  }, [menuSourceId]);

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  //chart data + options
  const chartOptions = {
    legend: {
      show: false
    },
    // chart: {
    //   height: 350,
    //   type: 'treemap'
    // },
    // title: {
    //   text: 'Distibuted Treemap (different color for each cell)',
    //   align: 'center'
    // },
    colors: [
      '#3B93A5',
      '#F7B844',
      '#ADD8C7',
      '#EC3C65',
      '#CDD7B6',
      '#C1F666',
      '#D43F97',
      '#1E5D8C',
      '#421243',
      '#7F94B0',
      '#EF6537',
      '#C0ADDB'
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    }
  };

  const chartSeries = [
    {
      data: [
        {
          x: 'Link 1',
          y: 218
        },
        {
          x: 'Link 2',
          y: 149
        },
        {
          x: 'Link 3',
          y: 184
        },
        {
          x: 'Link 4',
          y: 55
        },
        {
          x: 'Link 5',
          y: 84
        },
        {
          x: 'Link 6',
          y: 31
        },
        {
          x: 'Link 7',
          y: 70
        },
        {
          x: 'Link 8',
          y: 30
        },
        {
          x: 'Link 9',
          y: 44
        },
        {
          x: 'Link 10',
          y: 68
        },
        {
          x: 'Link 11',
          y: 28
        },
        {
          x: 'Link 12',
          y: 19
        },
        {
          x: 'Link 13',
          y: 29
        }
      ]
    }
  ];

  return (
    <Box className="detail-view scroll-box" sx={{ pr: 2 }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h5">Link map</Typography>
        <ReactApexChart options={chartOptions} series={chartSeries} type="treemap" height={350} />
      </Box>
      <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <ReactTable8 columns={columns} data={[...items]} paging={{ pageSize: 100 }} />
      </Box>
    </Box>
  );
};

export default LinkMap;
