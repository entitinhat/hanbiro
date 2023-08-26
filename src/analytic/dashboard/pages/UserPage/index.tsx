import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { Box, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AdminPanelSettings } from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroller';

//project base
import { ListContainer } from '@base/components/@hanbiro/List';

//menu
import { CATEGORY_DASHBOARD } from '@analytic/main/config';
import Section from '@analytic/main/components/Section';
import Toolbar from '@analytic/main/components/Toolbar';
import Setting from '@analytic/dashboard/components/Setting';
import { useDashboardConfigs } from '@analytic/dashboard/hooks/useDashboardConfigs';
import { EUserType, ESectionType } from '@analytic/main/types/enum';

const UserPage = () => {
  const { sections, isLoading } = useDashboardConfigs();

  // Set langkey at title for SECTION_SATISFACTION
  sections.forEach((item) => {
    if (item?.key === ESectionType.SECTION_SATISFACTION) {
      item.charts.map((chart: any) => {
        if (chart?.key === 'Price') {
          chart.title = 'ncrm_generalsetting_survey_satisfaction_row_price';
        }
        if (chart?.key === 'Easy of Use') {
          chart.title = 'ncrm_generalsetting_survey_satisfaction_row_easy_of_use';
        }
        if (chart?.key === 'Customer Service') {
          chart.title = 'ncrm_generalsetting_survey_satisfaction_row_customer_service';
        }
        if (chart?.key === 'Delivery Time') {
          chart.title = 'ncrm_generalsetting_survey_satisfaction_row_delivery_time';
        }
        if (chart?.key === 'Product/Service Quality') {
          chart.title = 'ncrm_generalsetting_survey_satisfaction_row_product_service_quality';
        }
      });
    }
  });

  //const [sectionsConfig, setSectionsConfig] = useState<any[]>([]);
  const [scrollPage, setScrollPage] = useState(1);
  const [scrollSections, setScrollSections] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !!sections?.length) {
      //setSectionsConfig(sections);
      //first load section
      setScrollSections([sections[0], sections[1]]);
    }
  }, [isLoading, sections]);

  const ToolbarMemo = useMemo(() => {
    return (
      <Toolbar
        selected={CATEGORY_DASHBOARD}
        moreAction={() => (
          <>
            <Tooltip title="Go Admin Page">
              <Typography component="span">
                <Link to="/analytic/dashboard/admin">
                  <IconButton color="info">
                    <AdminPanelSettings />
                  </IconButton>
                </Link>
              </Typography>
            </Tooltip>
            <Setting userType={EUserType.USER_TYPE_USER} />
          </>
        )}
      />
    );
  }, []);

  const handleLoadMore = (page: number) => {
    const newPage = scrollPage + 1;
    setScrollPage(newPage);
    //add more section
    const newSections = [...scrollSections];
    newSections.push(sections[newPage]);
    setScrollSections(newSections);
  };

  //console.log('sections length', scrollSections.length);

  return (
    <>
      <ListContainer>
        {ToolbarMemo}
        <Box
          className="scroll-box"
          sx={{
            p: '10px',
            height: 'calc(100vh - 65px)',
            '& > .MuiPaper-root': {
              '&:not(:first-of-type)': {
                mt: '10px'
              }
            }
          }}
        >
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={scrollPage < sections.length - 1}
            useWindow={false}
            loader={
              <Box display="flex" justifyContent="center" py="10px" key={0}>
                <CircularProgress className="loader" size={20} />
              </Box>
            }
          >
            {scrollSections.length > 0 ? scrollSections.map((s: any, index: number) => <Section {...s} key={s.key} />) : <Box></Box>}
          </InfiniteScroll>
        </Box>
      </ListContainer>
    </>
  );
};

export default UserPage;
