import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import IconButton from '@base/components/@extended/IconButton';
import { Add } from '@mui/icons-material';
import { Button, MenuItem, Popover, Select, SelectChangeEvent, Typography } from '@mui/material';
import useStatusMutation from '@process/hooks/useStatusMutation';
import { nextStepAtom } from '@process/store/atoms/diagram';
import { stepOpenAtom } from '@process/store/atoms/step';
import { Edge, Node, NodeType, ShapeType } from '@process/types/diagram';

interface EdgeAddProps {
  style: {
    left: string;
    top?: string;
    bottom?: string;
    marginLeft: string;
    marginTop?: string;
    marginBottom?: string;
  };
  processId: string;
  sourceId: string;
  sourceType: NodeType;
  shape: ShapeType;
  edge: Edge;
  addType?: string;
  stepHelper?: any;
  className?: string;
}

function EdgeAdd(props: EdgeAddProps) {
  const {
    style,
    sourceId,
    edge: { sourceDirection: direction, id: edgeId, primary, multiple, position, shape },
    sourceType,
    addType = 'default',
    stepHelper,
    processId,
    className
  } = props;
  const setStepOpen = useSetRecoilState(stepOpenAtom);
  const nextSteps = useRecoilValue(nextStepAtom);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'step-edge-popover' + sourceId : undefined;

  const onStepOpen = () => {
    setStepOpen({
      open: true,
      edit: false,
      type: 'step',
      sourceId: sourceId,
      directionId: edgeId,
      direction: direction,
      sourceType: sourceType,
      multiple: multiple ?? 'MULTIPLE_NONE',
      primary: primary,
      position: position,
      shape: shape
    });
    handleClose();
  };

  const {
    mUpdateStatus: { mutate: updateStatus }
  } = useStatusMutation(processId, handleClose);

  let hasMultiple = false;
  let nextStepOptions = nextSteps;
  if (direction == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
    if (multiple == 'MULTIPLE_NONE') {
      const backwardNodes = useMemo(() => stepHelper.backwardMultiple(sourceId), [sourceId]);
      const lastOne = backwardNodes[backwardNodes.length - 1];
      if (lastOne && lastOne.property !== 'PROPERTY_START') {
        const lastEdge = stepHelper.findPrimary(lastOne);
        if (lastEdge) {
          if (lastEdge.target) {
            const targetId = lastEdge.target;
            const forwardNodes = useMemo(() => stepHelper.forwardMultiple(targetId), [targetId]);
            // exclude first step
            if (forwardNodes.length > 1) {
              hasMultiple = true;
              nextStepOptions = forwardNodes.slice(1, forwardNodes.length - 1).map((node: Node) => {
                return { keyName: node.id, languageKey: node.data.label };
              });
            }
          }
        }
      }
    } else {
      // get steps with multiple
      // step position >= edge position
      const multipleSteps = useMemo(() => stepHelper.steps(sourceId), [sourceId]);
    }
  }

  const onChangeNextStep = useCallback(
    (event: SelectChangeEvent) => {
      const v = event.target.value;
      const split = direction == 'DIRECTION_BACKWARD_OUTGOING_RIGHT' ? 'MULTIPLE_LINK' : 'MULTIPLE_NONE';
      const nextStep = nextStepOptions.find((f) => f.keyName == v)!!;
      updateStatus({
        id: processId,
        stepId: sourceId,
        status: {
          id: edgeId,
          nextStep: {
            id: nextStep.keyName,
            name: nextStep.languageKey
          },
          multiple: split
        }
      });
    },
    [processId, sourceId, edgeId, direction, nextStepOptions]
  );

  return (
    <>
      {addType == 'default' && !hasMultiple && (
        <IconButton className={classNames('btn-add', className)} sx={{ ...style }} onClick={onStepOpen}>
          <Add sx={{ fontSize: 18 }} />
        </IconButton>
      )}
      {(addType == 'more' || hasMultiple) && (
        <>
          <IconButton aria-describedby={id} className={classNames('btn-add', className)} sx={{ ...style }} onClick={handleClick}>
            <Add sx={{ fontSize: 18 }} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            PaperProps={{
              elevation: 0
            }}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <Button size="small" sx={{ my: 1 }} onClick={onStepOpen}>
              <Typography variant="subtitle2">New Step</Typography>
            </Button>
            <Select value={''} onChange={onChangeNextStep} size="small">
              {nextStepOptions.map((item) => (
                <MenuItem key={item.keyName} value={item.keyName}>
                  {item.languageKey}
                </MenuItem>
              ))}
            </Select>
          </Popover>
        </>
      )}
    </>
  );
}

export default EdgeAdd;
