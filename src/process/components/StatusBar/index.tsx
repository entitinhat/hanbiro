import classNames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';

import IconButton from '@base/components/@extended/IconButton';
import HanPopper from '@base/components/@hanbiro/Popper';
import { IdName } from '@base/types/common';
import { CheckCircleRounded, RadioButtonUncheckedRounded } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack, Typography, useTheme } from '@mui/material';
import { useGetModuleProcess } from '@process/hooks/useModule';
import useModuleMutate from '@process/hooks/useModuleMutation';
import { StageBar, StageProperty } from '@process/types/diagram';
import { BusinessStatus, Checklist, ModuleStep } from '@process/types/process';

import DropdownMore from './DropdownMore';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@desk/ticket/config/queryKeys';

interface StatusBarProps {
  docId: string;
  processId?: string;
  menu: string;
}

function StatusBar(props: StatusBarProps) {
  const { docId, processId, menu } = props;
  const theme = useTheme();
  const { data: processData } = useGetModuleProcess(menu, docId, processId);

  // get viewData from queryClient
  const queryClient = useQueryClient();
  const layoutData = queryClient.getQueryData<any>([queryKeys.viewTicket, docId]);
  console.log('datahehee', layoutData);

  const {
    mUpdateModule: { mutate: mutationUpdate, isLoading }
  } = useModuleMutate();

  const onChangeStatus = useCallback(
    (status: BusinessStatus, ck?: IdName) => {
      const { id: stepId } = status.nextStep ?? { id: '' };
      if (status.direction !== 'DIRECTION_STAYING' && stepId == '') {
        alert('There is nothing next step');
      } else {
        const prev = processData?.steps.find((step) => step.step.id == status.step) as ModuleStep;
        const updateData = {
          source: {
            id: docId,
            menu: menu
          },
          processId: processId,
          prev: {
            step: prev.step.id,
            status: prev.status.id,
            sequence: prev.sequence ?? ''
          },
          next: {
            step: stepId,
            status: status.id
          }
        } as Record<string, any>;
        if (ck) {
          updateData.next.checklist = ck;
        }
        if (prev.checklist) {
          updateData.prev.checklist = { id: prev.checklist };
        }
        mutationUpdate(updateData);
      }
    },
    [processData]
  );

  const onChecklist = useCallback(
    (ck: Checklist, lastChecklist: boolean, status: BusinessStatus) => {
      if (!lastChecklist) {
        status.direction = 'DIRECTION_STAYING';
        status.nextStep.id = '';
      }
      onChangeStatus(status, { id: ck.id, name: ck.name });
    },
    [processData]
  );

  const singleButtons = useMemo(() => {
    let buttons: BusinessStatus[] = [];
    if (processData && processData.steps) {
      for (const step of processData.steps) {
        if (step.statuses) {
          buttons = _.concat(
            buttons,
            step.statuses.filter((status) => status.view !== 'VIEW_MORE_BOX')
          );
        }
      }
      const closed = processData.closed?.filter((status) => status.view !== 'VIEW_MORE_BOX');
      return _.concat(buttons, closed);
    } else {
      return buttons;
    }
  }, [processData]);

  const moreButtons = useMemo(() => {
    let buttons: BusinessStatus[] = [];
    if (processData && processData.steps) {
      for (const step of processData.steps) {
        if (step.statuses) {
          buttons = _.concat(
            buttons,
            step.statuses.filter((status) => status.view == 'VIEW_MORE_BOX')
          );
        }
      }
      const closed = processData.closed?.filter((status) => status.view == 'VIEW_MORE_BOX');
      return _.concat(buttons, closed);
    } else {
      return buttons;
    }
  }, [processData]);

  const stagesBar = useMemo(() => {
    let stages: StageBar[] = [];
    if (processData && processData.stages) {
      for (const stage of processData.stages) {
        let steps: { step: string; status: string }[] = [];
        if (processData.steps) {
          for (const step of processData.steps) {
            if (step.stageId == stage.id) {
              steps.push({
                step: step.step.name,
                status: step.status.name
              });
            }
          }
        }
        stages.push({
          id: stage.id,
          name: stage.name,
          steps: steps,
          property: stage.property as StageProperty
        });
      }
    }
    return stages;
  }, [processData]);

  /*
  const SetDirection = useCallback((val: Direction) => {
    let direction = '';
    if (val == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
      direction = 'forward';
    } else if (val == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      direction = 'backward';
    } else if (val == 'DIRECTION_FORWARD_OUTGOING_JUMP') {
      direction = 'jump';
    } else if (val == 'DIRECTION_FORWARD_OUTGOING_MIDDLE') {
      direction = 'middle';
    } else if (val == 'DIRECTION_FORWARD_OUTGOING_PROCESS') {
      direction = 'process';
    } else if (val == 'DIRECTION_BACKWARD_OUTGOING_MIDDLE') {
      direction = 'l-middle';
    } else if (val == 'DIRECTION_BACKWARD_OUTGOING_RIGHT') {
      direction = 'l-forward';
    } else if (val == 'DIRECTION_BACKWARD_OUTGOING_BOTTOM') {
      direction = 'bottom backward';
    } else if (val == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
      direction = 'bottom forward';
    } else if (val == 'DIRECTION_STAYING') {
      direction = 'staying';
    } else if (val == 'DIRECTION_NONE') {
      direction = 'none';
    }
    return direction;
  }, []);
  */

  useEffect(() => {
    if (processData && processData.steps?.[0].property == 'PROPERTY_NEW') {
      const updateData = {
        source: {
          id: docId,
          menu: menu
        },
        processId: processId,
        prev: {
          step: processData.steps[0].step.id,
          status: processData.steps[0].status.id,
          sequence: ''
        },
        next: {
          step: '',
          status: 'property_new'
        }
      };
      mutationUpdate(updateData);
    }
  }, [processData]);

  const lastStageIndex = useMemo(() => {
    return stagesBar?.map((stage) => stage.steps && stage.steps.length > 0).lastIndexOf(true);
  }, [stagesBar]);

  return (
    <Box sx={{ width: '100%', borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      {processData && (
        <>
          {(singleButtons || moreButtons) && (
            <Stack spacing={0.5} direction="row" sx={{ p: 1 }}>
              {singleButtons.map((status) => {
                // const direction = SetDirection(status.direction);
                const currentStep = processData.steps.find((step) => step.step.id == status.step);
                if (currentStep?.type == 'TYPE_CHECKLIST') {
                  let checkedId = '';
                  if (currentStep && currentStep.checklist) {
                    checkedId = currentStep.checklist;
                  }
                  const checklist: Checklist[] = JSON.parse(status.options ?? '');
                  const matchedIndex = checklist.findIndex((ck) => ck.id == checkedId);
                  const checklistCount = checklist.length;
                  return (
                    <React.Fragment key={status.id}>
                      <HanPopper sx={{ width: 150, maxWidth: 200 }} title={`Checklist:` + checklist.length} color={'yellow'}>
                        <FormGroup>
                          {checklist.map((ck, index) => {
                            let checked = false;
                            if (index <= matchedIndex) {
                              checked = true;
                            }
                            let lastChecklist = false;
                            if (checklistCount == index + 1) {
                              lastChecklist = true;
                            }
                            return (
                              <FormControlLabel
                                control={<Checkbox sx={{ '&:hover': { bgcolor: 'transparent' } }} />}
                                key={ck.id}
                                label={ck.name}
                                checked={checked}
                                disabled={checked}
                                onChange={() => onChecklist(ck, lastChecklist, status)}
                              />
                            );
                          })}
                        </FormGroup>
                      </HanPopper>
                    </React.Fragment>
                  );
                } else {
                  return (
                    status.button && (
                      <Button
                        disabled={isLoading || layoutData?.restore?.id ? true : false}
                        key={status.id}
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => onChangeStatus(status)}
                      >
                        {status.button == '' || status.button == '-' ? status.name : status.button}
                      </Button>
                    )
                  );
                }
              })}

              {moreButtons.length > 0 && !layoutData?.restore?.id && <DropdownMore items={moreButtons} onChange={onChangeStatus} />}
            </Stack>
          )}

          <Box component="ol" sx={{ px: 1, pb: 1, listStyle: 'none', whiteSpace: 'nowrap' }} className="process-wrap">
            {stagesBar?.map((stage, index) => {
              const isCurrent = index <= lastStageIndex;
              return (
                <li
                  key={stage.id}
                  className={classNames('process-item', {
                    current: isCurrent
                  })}
                >
                  <IconButton size="small" className="process-item-btn">
                    {isCurrent ? <CheckCircleRounded sx={{ fontSize: 16 }} /> : <RadioButtonUncheckedRounded sx={{ fontSize: 16 }} />}
                  </IconButton>
                  <Typography className="process-item-text" sx={{ mt: 1 }}>
                    {stage.name}
                  </Typography>
                  <Box sx={{ position: 'relative', left: '70%', top: '-26px' }}>
                    {stage.steps?.map((step, index) => {
                      return (
                        <Stack spacing={1} direction="row" alignItems="center" sx={{ mt: 0.5 }} key={index}>
                          <Typography>{step.step}</Typography>
                          <Typography> &gt; {step.status}</Typography>
                        </Stack>
                      );
                    })}
                  </Box>
                </li>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}

export default StatusBar;
