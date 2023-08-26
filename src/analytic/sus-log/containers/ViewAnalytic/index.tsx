import React from 'react';
import SusClickTime from "@analytic/main/containers/SusClickTime";
import {Box} from "@mui/material";

interface ViewAnalyticProps {
  menuSourceId?: string;
  data?: {
    createdAt?: string;
  };
}

const ViewAnalytic = (props: ViewAnalyticProps) => {
  const {menuSourceId, data} = props;

  return (
    <Box sx={{height: '500px'}}>
      <SusClickTime filters={{
        filter: {
          query: `logId=${menuSourceId}${data?.createdAt ? ` createdAt>="${data?.createdAt}"` : ''}`
        }
      }}/>
    </Box>
  );
};

export default ViewAnalytic;