import React from 'react';
import {Grid} from "@mui/material";
import ChartBox, {ChartBoxProps} from "@analytic/main/components/ChartBox";

interface ChartGridProps {
  chartBoxes: ChartBoxProps[];
  [x: string]: any;
}

const ChartGrid = (props: ChartGridProps) => {
  const {chartBoxes} = props;

  return (
    <Grid container spacing={2}>
      {
        chartBoxes.map((props, i) => {
          const {wrapperProps = {}, ...restProps} = props ?? {};
          return <Grid key={props.key} item xs={12} md={6} {...wrapperProps}>
            <ChartBox {...restProps}/>
          </Grid>;
        })
      }
    </Grid>
  );
};

export default ChartGrid;