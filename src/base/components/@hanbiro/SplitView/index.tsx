import React, { useMemo } from 'react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import { SPLIT_MIN_SIZE, SPLIT_MAX_SIZE } from '@base/config/config';

interface Props {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
}

const SplitView = (props: Props) => {
  const { leftPane, rightPane } = props;

  return (
    <Allotment>
      <Allotment.Pane minSize={SPLIT_MIN_SIZE} maxSize={SPLIT_MAX_SIZE}>
        {leftPane}
      </Allotment.Pane>
      <Allotment.Pane>{rightPane}</Allotment.Pane>
    </Allotment>
  );
};

export default SplitView;

export { default as EmptySplitView } from './SplitViewEmpty';
export { default as SplitViewContainer } from './SplitViewContainer';
