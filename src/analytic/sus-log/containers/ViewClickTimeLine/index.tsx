import React from 'react';
import {Box} from "@mui/material";
import SusClickTimeLine from "@analytic/main/containers/SusClickTimeLine";

interface ViewClickTimeLineProps {
  menuSourceId?: string;
}

const ViewClickTimeLine = (props: ViewClickTimeLineProps) => {
  const { menuSourceId } = props;

  return (
    <Box sx={{height: 'calc(100vh-300px)'}}>
      <SusClickTimeLine filters={{
        filter: {
          query: `logId=${menuSourceId}`
        }
      }}/>
    </Box>
  );
};

export default ViewClickTimeLine;