import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import IconButton from '@base/components/@extended/IconButton';
import LoadingButton from '@base/components/@extended/LoadingButton';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OptionValue } from '@base/types/common';
import { Add } from '@mui/icons-material';
import { Button, Divider, Popover, Stack, Typography } from '@mui/material';
import { useGetModuleProcesses } from '@process/hooks/useModule';
import useStepMutation from '@process/hooks/useStepMutation';
import { stageAtom } from '@process/store/atoms/diagram';
import { Edge, NodeType, ShapeType } from '@process/types/diagram';

interface ProcessAddProps {
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
  className?: string;
}

function ProcessAdd(props: ProcessAddProps) {
  const {
    style,
    sourceId,
    edge: { sourceDirection: direction, id: edgeId, position, shape },
    processId,
    className
  } = props;
  const stages = useRecoilValue(stageAtom);
  const [processOptions, setProcessOptions] = useState<OptionValue[]>([]);
  const [selectedProcess, setSelectedProcess] = useState<OptionValue>({ keyName: '', languageKey: '' });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log('closed');
    setAnchorEl(null);
  };

  const { data: processData } = useGetModuleProcesses({ module: 'MODULE_NONE' });

  useEffect(() => {
    if (processData?.results) {
      const options = processData.results.map((process) => {
        return {
          keyName: process.id,
          languageKey: process.name
        };
      });
      setProcessOptions(options);
    }
  }, [processData]);

  const onChangeProcess = useCallback((newVal: OptionValue) => {
    console.log('newVal', newVal);
    setSelectedProcess(newVal);
  }, []);

  const {
    mAddStep: { mutate: mutationAdd, isLoading }
  } = useStepMutation(processId, handleClose);

  const onSave = useCallback(() => {
    const addData = {
      id: processId,
      step: {
        name: selectedProcess.languageKey,
        otherProcess: {
          id: selectedProcess.keyName,
          name: selectedProcess.languageKey
        },
        meta: {
          axis: position
        },
        shape: shape,
        type: 'TYPE_PROCESS',
        description: ''
      },
      link: {
        step: sourceId,
        status: edgeId,
        direction: direction,
        multiple: 'MULTIPLE_NONE',
        addY: 0
      }
    } as Record<string, any>;

    const checkStage = stages.find((stage) => stage.axisX > position.x);
    if (checkStage) {
      addData.step.stage = {
        id: checkStage.id,
        name: checkStage.name
      };
    }
    mutationAdd(addData);
  }, [selectedProcess]);

  const id = open ? 'step-edge-popover' + sourceId : undefined;

  return (
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
        <Stack spacing={1} sx={{ p: 1, width: 200, height: 160, overflow: 'hidden' }}>
          <Typography variant="subtitle1">Other Process</Typography>
          <Divider />
          <SelectBox value={selectedProcess} options={processOptions} onChange={onChangeProcess} disablePortal={true} />
          <Divider />
          <Stack spacing={1} direction="row" sx={{ m: 0, p: 1 }} justifyContent="center" alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <LoadingButton
              size="small"
              color="primary"
              onClick={() => {
                onSave();
              }}
              disabled={isLoading}
              loading={isLoading}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
}

export default ProcessAdd;
