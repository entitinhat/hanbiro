import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

import IconButton from '@base/components/@extended/IconButton';
import LoadingButton from '@base/components/@extended/LoadingButton';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import useMutationPost from '@base/hooks/useMutationPost';
import { OptionValue } from '@base/types/common';
import { Add, CloseOutlined, Remove, Save } from '@mui/icons-material';
import { FormControlLabel, Radio, Stack, TableCell, TableRow, TextField } from '@mui/material';
import {
  PROCESS_STATUS_DIRECTIONS,
  PROCESS_STATUS_DIRECTIONS_VIEW,
  PROCESS_STATUS_EVENTS,
  PROCESS_STATUS_EVENTS_VIEW,
  PROCESS_STATUS_PROPERTIES,
  PROCESS_STATUS_PROPERTIES_VIEW,
  PROCESS_STATUS_VIEWS,
  PROCESS_STATUS_VIEWS_VIEW
} from '@process/config/constants';
import { queryKeys } from '@process/config/queryKeys';
import { useStatusCallback } from '@process/hooks/useStatus';
import { CREATE_STEP_STATUS, UPDATE_STEP_STATUS } from '@process/services/process';
import { nextStepAtom, nodeEdgesAtom } from '@process/store/atoms/diagram';
import statusAtom, { selectedStatusAtom } from '@process/store/atoms/status';
import stepTypeAtom, { stepOpenAtom } from '@process/store/atoms/step';
import { statusWithParallelFilter } from '@process/store/selectors';
import { StatusForm } from '@process/types/process';
import { checkParallel, checkSequence, checkStep } from '@process/utils/helper';
import { useQueryClient } from '@tanstack/react-query'; //v4
import { MethodType } from '@process/types/diagram';

interface StatusItemWriteProps {
  processId?: string;
  stepId?: string;
  status: StatusForm;
  parallelIndex: number;
  isView?: boolean;
  isCta?: boolean;
  actionMethod?: MethodType;
}

function StatusItemWrite(props: StatusItemWriteProps) {
  const {
    processId = '',
    stepId = '',
    status,
    parallelIndex,
    isView = false,
    isCta = false,
    actionMethod = 'ACTION_METHOD_MANUAL'
  } = props;
  console.log('item write', props);
  const parallelCount = useRecoilValue(statusWithParallelFilter(isCta ? 'cta' : 'normal')).length;
  const statusesValue = useRecoilValue(statusAtom);
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedStatusAtom);
  const [isSaving, setIsSaving] = useState(false);

  // const nodeEdges = useRecoilValue(nodeEdgesAtom);
  const stepType = useRecoilValue(stepTypeAtom);
  const nextSteps = useRecoilValue(nextStepAtom);
  const sourceStep = useRecoilValue(stepOpenAtom);
  console.log('sourceStep', sourceStep);
  const isParallel = checkParallel(status);
  const {
    onChangeKeyName,
    onChangeDirection,
    onChangeStatus,
    onSequenceChange,
    onSequenceAdd,
    onSequenceDelete,
    // onChangeMultiplePrimary,
    onReset
  } = useStatusCallback(status, isView);

  // const stepHelper = useMemo(() => {
  //   return checkStep(nodeEdges.others);
  // }, [nodeEdges.others]);

  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      console.log('leave write');
      setSelectedStatus('');
    };
  }, []);

  const queryClient = useQueryClient();
  const mutationEdit: any = useMutationPost(UPDATE_STEP_STATUS, 'process_updateStatus', {
    onMutate: () => {
      setIsSaving(true);
    },
    onSuccess: (data: any) => {
      setIsSaving(false);
      setSelectedStatus('');
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.getDiagram, processId]);
        queryClient.invalidateQueries([queryKeys.getStep, stepId]);
      }, 500);
      // console.log('success data', data);
    },
    onError: (error: any) => {
      setIsSaving(false);
      // console.log('failed', error);
    }
  });

  const mutationAdd: any = useMutationPost(CREATE_STEP_STATUS, 'process_createStatus', {
    onMutate: () => {
      setIsSaving(true);
    },
    onSuccess: (data: any) => {
      setIsSaving(false);
      setSelectedStatus('');
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.getDiagram, processId]);
        queryClient.invalidateQueries([queryKeys.getStep, stepId]);
      }, 500);
      // console.log('success data', data);
    },
    onError: (error: any) => {
      setIsSaving(false);
      // console.log('failed', error);
    }
  });

  const onSave = useCallback(() => {
    // check sequence number
    let allSequence: string[] = [];
    // let splitCount = 0;
    // let parallelId = '';
    // let addY = 250;
    // let height = 0;
    for (const st of statusesValue) {
      if (st.sequence.length > 0) {
        allSequence = _.concat(allSequence, st.sequence);
      }
      // if (st.multiple == 'MULTIPLE_CHOICE' || st.multiple == 'MULTIPLE_PARALLEL' || st.multiple == 'MULTIPLE_ANY') {
      //   if (splitCount > 0) {
      //     if (parallelId) {
      //       const yMaxAxis = stepHelper.forwardDepthMultiple(parallelId);
      //       // 250 : split height
      //       height += yMaxAxis + 250;
      //       // if (st.nextStep && st.nextStep.keyName == "") {
      //       //   updateY += height;
      //       // } else {
      //       //   const targetNode = nodeEdges.others[st.nextStep.keyName];
      //       //   updateY = _.clone(targetNode.position.y);
      //       //   // console.log('targetNode===>', targetNode, updateY)
      //       // }
      //     } else {
      //       height += 250;
      //     }
      //   }
      //   parallelId = st.nextStep.keyName;
      //   splitCount += 1;
      // }
    }
    // 3 : half of arrow thick
    // let updateY = sourceStep.position && sourceStep.position.y + height - 3;
    if (!checkSequence(_.sortBy(_.uniq(allSequence)))) {
      alert('Sequence Number has to be order');
      return;
    }

    const updateData = {
      id: processId,
      stepId: stepId,
      // updateY: updateY,
      // addY: addY, // split height
      status: {
        id: status.id,
        button: status.button,
        name: status.name,
        direction: status.direction.keyName,
        property: status.property.keyName,
        view: status.view.keyName,
        event: status.event.keyName,
        sequence: status.sequence,
        nextStep: {
          id: status.nextStep.keyName,
          name: status.nextStep.languageKey
        },
        multiple: status.multiple,
        // primary: status.primary,
        ctaId: status.ctaId ?? ''
      }
    };

    if (status.new) {
      mutationAdd.mutate(updateData);
    } else {
      mutationEdit.mutate(updateData);
    }
  }, [status]);

  const sequenceOptions = useMemo<OptionValue[]>(() => {
    let options: OptionValue[] = [{ keyName: '', languageKey: '' }];
    for (let i = 1.5; i < 5.5; i = i + 0.5) {
      options.push({ keyName: '' + i, languageKey: '' + i });
    }
    return options;
  }, []);

  const directionOptions = useMemo<OptionValue[]>(() => {
    let directions: OptionValue[] = [];
    for (const direction of PROCESS_STATUS_DIRECTIONS) {
      if (
        direction.keyName == 'DIRECTION_FORWARD_INCOMING_LEFT' ||
        direction.keyName == 'DIRECTION_BACKWARD_INCOMING_TOP' ||
        direction.keyName == 'DIRECTION_BACKWARD_INCOMING_LEFT'
      ) {
        continue;
      }
      if (direction.keyName == 'DIRECTION_STAYING') {
        directions.push(direction);
      }
      if (sourceStep.shape == 'SHAPE_FORWARD') {
        if (stepType.value == 'TYPE_ACTION') {
          if (
            direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT' ||
            direction.keyName == 'DIRECTION_FORWARD_OUTGOING_BOTTOM' ||
            direction.keyName == 'DIRECTION_FORWARD_OUTGOING_MIDDLE' ||
            direction.keyName == 'DIRECTION_FORWARD_OUTGOING_PROCESS' ||
            direction.keyName == 'DIRECTION_FORWARD_OUTGOING_JUMP'
          ) {
            directions.push(direction);
          }
        } else if (stepType.value == 'TYPE_CRITERIA') {
          if (direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT' || direction.keyName == 'DIRECTION_FORWARD_OUTGOING_BOTTOM') {
            directions.push(direction);
          }
        } else if (
          stepType.value == 'TYPE_WAIT' ||
          stepType.value == 'TYPE_CHECKLIST' ||
          stepType.value == 'TYPE_SIMPLE_ACTION' ||
          stepType.value == 'TYPE_STATUS'
        ) {
          if (direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT') {
            directions.push(direction);
          }
        }
      } else {
        if (stepType.value == 'TYPE_ACTION') {
          if (
            direction.keyName == 'DIRECTION_BACKWARD_INCOMING_RIGHT' ||
            direction.keyName == 'DIRECTION_BACKWARD_OUTGOING_BOTTOM' ||
            direction.keyName == 'DIRECTION_BACKWARD_OUTGOING_LEFT' ||
            direction.keyName == 'DIRECTION_BACKWARD_OUTGOING_MIDDLE'
          ) {
            directions.push(direction);
          }
        } else if (stepType.value == 'TYPE_CRITERIA') {
          if (direction.keyName == 'DIRECTION_BACKWARD_OUTGOING_LEFT' || direction.keyName == 'DIRECTION_BACKWARD_OUTGOING_BOTTOM') {
            directions.push(direction);
          }
        } else if (
          stepType.value == 'TYPE_WAIT' ||
          stepType.value == 'TYPE_CHECKLIST' ||
          stepType.value == 'TYPE_SIMPLE_ACTION' ||
          stepType.value == 'TYPE_STATUS'
        ) {
          if (direction.keyName == 'DIRECTION_BACKWARD_OUTGOING_LEFT') {
            directions.push(direction);
          }
        }
      }
    }
    return directions;
  }, [sourceStep.position]);

  const renderButton = useCallback(() => {
    return (
      <>
        {status.button == '-' ? (
          '-'
        ) : (
          <TextField
            size="small"
            defaultValue={status.button}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeStatus({ button: event.target.value })}
          />
        )}
      </>
    );
  }, [status]);

  const renderStatus = useCallback(() => {
    return (
      <>
        {status.name == '-' ? (
          '-'
        ) : (
          <TextField
            size="small"
            defaultValue={status.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeStatus({ name: event.target.value })}
          />
        )}
      </>
    );
  }, [status]);

  const renderView = useCallback(() => {
    return (
      <>
        {status.view.keyName == 'VIEW_DISABLE' || status.definedId != '' || stepType.value == 'TYPE_SIMPLE_ACTION' ? (
          t(PROCESS_STATUS_VIEWS_VIEW[status.view.keyName])
        ) : (
          <SelectBox
            size="small"
            value={status.view}
            onChange={(newValue: OptionValue) => onChangeKeyName({ view: newValue })}
            options={PROCESS_STATUS_VIEWS}
          />
        )}
      </>
    );
  }, [status]);

  const renderEvent = useCallback(() => {
    return (
      <>
        {status.event.keyName == 'EVENT_DISABLE' ||
        status.definedId != '' ||
        stepType.value == 'TYPE_SIMPLE_ACTION' ||
        stepType.value == 'TYPE_WAIT' ? (
          t(PROCESS_STATUS_EVENTS_VIEW[status.event.keyName])
        ) : (
          <SelectBox
            size="small"
            value={status.event}
            onChange={(newValue: OptionValue) => onChangeKeyName({ event: newValue })}
            options={PROCESS_STATUS_EVENTS}
          />
        )}
      </>
    );
  }, [status]);

  const renderSequence = useCallback(() => {
    return (
      <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
        {status.sequence[0] == '' || status.definedId != '' ? (
          status.definedId != '' ? (
            status.sequence.join('/')
          ) : (
            '-'
          )
        ) : (
          <>
            <Stack spacing={0.5}>
              {status.sequence.map((seq, index) => {
                return (
                  <SelectBox
                    size="small"
                    key={index}
                    value={{ keyName: '' + seq, languageKey: '' + seq }}
                    onChange={(newValue: OptionValue) => onSequenceChange(newValue, index)}
                    options={sequenceOptions}
                  />
                );
              })}
            </Stack>
            <>
              {status.sequence.length < 2 && (
                <IconButton
                  color="secondary"
                  onClick={() => onSequenceAdd()}
                  sx={{ '&:hover': { bgcolor: 'transparent', color: 'secondary.main' } }}
                >
                  <Add fontSize="inherit" />
                </IconButton>
              )}
              {status.sequence.length == 2 && (
                <IconButton
                  color="error"
                  onClick={() => onSequenceDelete()}
                  sx={{ '&:hover': { bgcolor: 'transparent', color: 'error.main' } }}
                >
                  <Remove fontSize="inherit" />
                </IconButton>
              )}
            </>
          </>
        )}
      </Stack>
    );
  }, [status]);

  return (
    <TableRow
      sx={{
        '&:hover': {
          bgcolor: 'transparent !important'
        }
      }}
    >
      {isCta && stepType.value == 'TYPE_SITE' && <TableCell align="center">{status?.pageName}</TableCell>}
      {actionMethod != 'ACTION_METHOD_AUTO' &&
        stepType.value != 'TYPE_WAIT' &&
        (isParallel && parallelCount > 1 ? (
          parallelIndex == 1 ? (
            <TableCell align="center" rowSpan={parallelCount}>
              {renderButton()}
            </TableCell>
          ) : (
            ''
          )
        ) : (
          <TableCell align="center">{renderButton()}</TableCell>
        ))}
      {actionMethod != 'ACTION_METHOD_AUTO' && !isCta && stepType.value != 'TYPE_WAIT' && (
        <>
          {isParallel && parallelCount > 1 ? (
            parallelIndex == 1 ? (
              <TableCell align="center" rowSpan={parallelCount}>
                {renderView()}
              </TableCell>
            ) : (
              ''
            )
          ) : (
            <TableCell align="center">{renderView()}</TableCell>
          )}
        </>
      )}
      {actionMethod != 'ACTION_METHOD_AUTO' &&
        (isParallel && parallelCount > 1 ? (
          parallelIndex == 1 ? (
            <TableCell align="center" rowSpan={parallelCount}>
              {renderEvent()}
            </TableCell>
          ) : (
            ''
          )
        ) : (
          <TableCell align="center">{renderEvent()}</TableCell>
        ))}
      {isParallel && parallelCount > 1 ? (
        parallelIndex == 1 ? (
          <TableCell align="center" rowSpan={parallelCount}>
            {renderStatus()}
          </TableCell>
        ) : (
          ''
        )
      ) : (
        <TableCell align="center">{renderStatus()}</TableCell>
      )}
      <TableCell align="center">
        <Stack spacing={0.5}>
          {/* {!isView && (status.multiple == 'MULTIPLE_CHOICE' || status.multiple == 'MULTIPLE_PARALLEL') && (
            <FormControlLabel
              name="multiple-primary"
              value="yes"
              control={<Radio checked={status.primary} onChange={onChangeMultiplePrimary} />}
              label="Primary"
            />
          )} */}
          {status.direction.keyName == 'DIRECTION_DISABLE' || status.definedId != '' ? (
            t(PROCESS_STATUS_DIRECTIONS_VIEW[status.direction.keyName])
          ) : (
            <SelectBox
              size="small"
              value={status.direction}
              onChange={(newValue: OptionValue) => onChangeDirection(newValue)}
              options={directionOptions}
            />
          )}
        </Stack>
      </TableCell>
      <TableCell align="center">
        <>
          {status.direction.keyName == 'DIRECTION_STAYING' || status.direction.keyName == 'DIRECTION_FORWARD_INCOMING_LEFT' ? (
            '-'
          ) : (
            <SelectBox
              size="small"
              value={status.nextStep}
              onChange={(newValue: OptionValue) => onChangeKeyName({ nextStep: newValue })}
              options={nextSteps}
            />
          )}
        </>
      </TableCell>
      <TableCell align="center">
        <>
          {status.property.keyName == 'PROPERTY_DISABLE' || status.definedId != '' || stepType.value == 'TYPE_SIMPLE_ACTION' ? (
            t(PROCESS_STATUS_PROPERTIES_VIEW[status.property.keyName])
          ) : (
            <SelectBox
              size="small"
              value={status.property}
              onChange={(newValue: OptionValue) => onChangeKeyName({ property: newValue })}
              options={PROCESS_STATUS_PROPERTIES}
            />
          )}
        </>
      </TableCell>
      {stepType.value !== 'TYPE_SIMPLE_ACTION' && stepType.value !== 'TYPE_WAIT' && !isCta && (
        <>
          {isParallel && parallelCount > 1 ? (
            parallelIndex == 1 ? (
              <TableCell align="center" rowSpan={parallelCount}>
                {renderSequence()}
              </TableCell>
            ) : (
              ''
            )
          ) : (
            <TableCell align="center">{renderSequence()}</TableCell>
          )}
        </>
      )}
      <TableCell align="center">
        <Stack direction="row" alignItems="center" justifyContent="center">
          {isView && selectedStatus == status.id && (
            <Stack direction="row" alignItems="center" justifyContent="center">
              <LoadingButton
                loading={isSaving}
                disabled={isSaving}
                size="small"
                color="success"
                onClick={onSave}
                sx={{ minWidth: 32, width: 32, height: 32 }}
              >
                <Save sx={{ fontSize: 18 }} />
              </LoadingButton>
              {!status.new && (
                <IconButton color="secondary" size="small" onClick={() => setSelectedStatus('')}>
                  <CloseOutlined sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Stack>
          )}
          {status.reset &&
            status.property.keyName !== 'PROPERTY_NEW' &&
            status.property.keyName !== 'PROPERTY_TODO' &&
            status.property.keyName !== 'PROPERTY_TODO_DOING' && (
              <IconButton size="small" color="error" onClick={() => onReset()}>
                <CloseOutlined sx={{ fontSize: 18 }} />
              </IconButton>
            )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default React.memo(StatusItemWrite);
