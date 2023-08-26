import { useEffect, useMemo, useState } from 'react';

//material
import { Box, Grid, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';

//project
import TimeLine from '@base/containers/TimeLine';
import { MENU_DESK_TICKET } from '@base/config/menus';
import { LabelValue } from '@base/types/app';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import { useSitePageLayoutByMenu } from '@public-page/site/hooks/useSitePagelayout';
import { SiteParam } from '@public-page/site/types/interfaces';
//import { default as viewConfig } from '@public/site/config/desk/view-field';
import { default as viewConfig } from '@desk/ticket/config/view-field';
import { useSiteTicketView } from '@public-page/site/hooks/useSiteTicketView';

//local
import Details from './Detail';
import Tickets from './Tickets';
import Summary from './Summary';
import Toolbar from './Toolbar';
import _ from 'lodash';

const TABS = [
  {
    value: 'detail',
    label: 'Details'
  },
  {
    value: 'timeline',
    label: 'Timeline'
  },
  {
    value: 'ticket',
    label: 'All Tickets'
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`site-desk-view-tabpanel-${index}`}
      aria-labelledby={`site-desk-view-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface DeskViewProps {
  siteParams: SiteParam;
}

const DeskView = (props: DeskViewProps) => {
  const { siteParams } = props;
  const { tk } = siteParams;
  const theme = useTheme();
  //state
  const [tab, setTab] = useState(0);
  const [docId, setDocId] = useState('');
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false); //for write page

  //init
  useEffect(() => {
    const { id, token } = siteParams;
    setDocId(token.D || id);
  }, [siteParams]);

  //convert config to public config
  let newViewConfig = _.cloneDeep(viewConfig);
  Object.keys(newViewConfig).map((_key: string) => {
    if (newViewConfig[_key]?.componentProps) {
      newViewConfig[_key].componentProps = {
        ...newViewConfig[_key].componentProps,
        isPublic: true
      };
    } else {
      newViewConfig[_key].componentProps = {
        isPublic: true
      };
    }
  });
  //console.log('newViewConfig', newViewConfig);

  /** Get data */
  const { data: layoutView, isLoading: isLayoutLoading } = useSitePageLayoutByMenu(MENU_DESK_TICKET, 'view', tk);
  const viewSchema = buildViewSchema({ sections: layoutView?.data, configFields: newViewConfig });
  const { data: ticketData, isLoading: isDataLoading, refetch } = useSiteTicketView(viewSchema, { id: docId, token: tk });
  //console.log('ticketData', ticketData);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, ticketData, viewConfig),
      menuSource: MENU_DESK_TICKET,
      menuSourceId: docId,
      data: ticketData
    } as PageLayoutData;
  }, [layoutView, ticketData]);

  //tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent="space-between"
        bgcolor={theme.palette.background.paper}
        sx={{ width: '100%', p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Stack>
          <Typography variant="h2">{ticketData?.subject || <em>(none subject)</em>}</Typography>
        </Stack>
        <Toolbar
          ticketId={docId}
          token={tk}
          layoutData={layoutData}
          ticketCustomer={{ customer: ticketData?.customer, contact: ticketData?.contact }}
          onOpenWrite={() => {
            setTab(2); //all tickets
            setIsOpenWrite(true);
          }}
          onRefeshView={refetch}
        />
      </Stack>
      <Box bgcolor={theme.palette.background.paper} sx={{ maxHeight: 'calc(100vh - 120px)' }} className="scroll-box">
        <Grid container>
          <Grid item xs={12} md={4} lg={3}>
            <Summary layoutData={layoutData} />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tab} onChange={handleTabChange} aria-label="site desk view tabs">
                {TABS.map((_tab: LabelValue, index: number) => (
                  <Tab
                    key={_tab.value}
                    label={_tab.label}
                    id={`site-desk-view-tab-${index}`}
                    aria-controls={`site-desk-view-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <Details layoutData={layoutData} token={tk} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Box sx={{ p: 2 }}>
                <TimeLine menuSource={MENU_DESK_TICKET} menuSourceId={docId} />
              </Box>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Box sx={{ p: 2 }}>
                <Tickets
                  isOpenWrite={isOpenWrite}
                  token={tk}
                  menuSourceId={docId} //ticket id
                  ticketCustomer={{ customer: ticketData?.customer, contact: ticketData?.contact }}
                  onClose={() => setIsOpenWrite(false)}
                />
              </Box>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default DeskView;
