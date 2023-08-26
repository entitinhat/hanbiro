import React, {useMemo} from 'react';
import {CATEGORY_DASHBOARD} from "@analytic/main/config";
import {EUserType} from "@analytic/main/types/enum";
import {ListContainer} from "@base/components/@hanbiro/List";
import {
  Box,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import Section from "@analytic/main/components/Section";
import Toolbar from "@analytic/main/components/Toolbar";
import {getConfigsBySetting} from "@analytic/main/utils";
import {Link} from "react-router-dom";
import {AdminPanelSettings} from "@mui/icons-material";
import Setting from "@analytic/dashboard/components/Setting";
import {useDashboardSettings} from "@analytic/dashboard/hooks/useDashboardSettings";

const AdminPage = () => {
  const {sections, userType} = useDashboardSettings(EUserType.USER_TYPE_ADMIN);

  const sectionsConfig = getConfigsBySetting(sections, userType);

  const ToolbarMemo = useMemo(() => {
    return <Toolbar selected={CATEGORY_DASHBOARD} moreAction={() => (
      <>
        <Tooltip title="Go User Page">
          <Typography component="span">
            <Link to="/analytic/dashboard/user">
              <IconButton color="primary">
                <AdminPanelSettings/>
              </IconButton>
            </Link>
          </Typography>
        </Tooltip>
        <Setting userType={userType} />
      </>
    )}/>;
  }, []);

  return (
    <>
      <ListContainer>
        {ToolbarMemo}
        <Box className="scroll-box" sx={{
          p: '10px',
          height: 'calc(100vh - 65px)',
          '& > .MuiPaper-root': {
            '&:not(:first-of-type)': {
              mt: '10px'
            }
          }
        }}>
          {
            sectionsConfig.map((s, i) => {
              return (
                <Section {...s} key={s.key} />
              );
            })
          }
        </Box>
      </ListContainer>
    </>
  );
};

export default AdminPage;