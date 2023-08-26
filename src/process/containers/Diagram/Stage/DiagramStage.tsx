import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import ReactSplit from '@devbookhq/splitter';
import useStageMutation from '@process/hooks/useStageMutation';
import { stageAtom } from '@process/store/atoms/diagram';

import StageItem from './StageItem';

interface DiagramStageProps {
  processId: string;
}

function DiagramStage({ processId }: DiagramStageProps) {
  const stages = useRecoilValue(stageAtom);
  const [splitWidth, setSplitWidth] = useState(0);

  useEffect(() => {
    const stagesWidth = stages.map((stage) => stage.width);
    const sumWidth = _.sum(stagesWidth);
    setSplitWidth(sumWidth);
  }, [stages]);

  return (
    <div className="stage-wrap" style={{ width: `${splitWidth}px` }}>
      {stages.map((stage) => {
        let className = '';
        if (stage.property == 'PROPERTY_NEW') {
          className = 'stage-open';
        } else if (stage.property == 'PROPERTY_CLOSE') {
          className = 'stage-closed';
        }
        // if (stage.property == 'PROPERTY_CLOSE') {
        //   return (
        //     <React.Fragment key={stage.id}>
        //       <Stage className={className} stage={stage} processId={processId} />
        //       <div></div>
        //     </React.Fragment>
        //   );
        // } else {
        return <StageItem key={stage.id} className={className} stage={stage} processId={processId} />;
      })}
    </div>
  );
}

export default DiagramStage;
