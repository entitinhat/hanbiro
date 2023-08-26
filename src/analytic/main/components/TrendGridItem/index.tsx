import React, {PropsWithChildren} from "react";
import {Divider, Grid, GridProps} from "@mui/material";

export interface TrendGridItemProps extends PropsWithChildren, GridProps {
  isDivider?: boolean;
}

const TrendGridItem = ({children, isDivider = true, ...restProps}: TrendGridItemProps) => {
  return (
    <Grid item xs={4} lg={2} {...restProps}>
      <Grid spacing={0} container>
        <Grid item xs>
          {children}
        </Grid>
        {isDivider && <Divider variant="middle" orientation="vertical" flexItem/>}
      </Grid>
    </Grid>
  );
};

export default TrendGridItem;