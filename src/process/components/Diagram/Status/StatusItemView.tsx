import _ from 'lodash';
import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import IconButton from '@base/components/@extended/IconButton';
import useMutationPost from '@base/hooks/useMutationPost';
import { CloseOutlined, ModeEdit } from '@mui/icons-material';
import { Stack, TableCell, TableRow } from '@mui/material';
import {
  PROCESS_STATUS_DIRECTIONS_VIEW,
  PROCESS_STATUS_EVENTS_VIEW,
  PROCESS_STATUS_PROPERTIES_VIEW,
  PROCESS_STATUS_VIEWS_VIEW
} from '@process/config/constants';
import { queryKeys } from '@process/config/queryKeys';
import { DELETE_STEP_STATUS } from '@process/services/process';
import { selectedStatusAtom } from '@process/store/atoms/status';
import stepTypeAtom from '@process/store/atoms/step';
import { statusWithParallelFilter } from '@process/store/selectors';
import { MethodType } from '@process/types/diagram';
import { StatusForm } from '@process/types/process';
import { checkParallel } from '@process/utils/helper';
import { useQueryClient } from '@tanstack/react-query'; //v4

interface StatusItemViewProps {
  processId?: string;
  stepId?: string;
  status: StatusForm;
  parallelIndex: number;
  isCta?: boolean;
  actionMethod?: MethodType;
  mode?: 'edit' | 'view';
}

function StatusItemView(props: StatusItemViewProps) {
  const { processId = '', stepId = '', status, parallelIndex, isCta = false, actionMethod = 'ACTION_METHOD_MANUAL', mode = 'view' } = props;
  const stepType = useRecoilValue(stepTypeAtom);
  const setSelectedStatus = useSetRecoilState(selectedStatusAtom);
  const parallelCount = useRecoilValue(statusWithParallelFilter(isCta ? 'cta' : 'normal')).length;
  const isParallel = checkParallel(status);
  const { t } = useTranslation()
  const onEdit = useCallback((id: string) => {
    setSelectedStatus(id);
  }, []);

  console.log('status', status)

  const queryClient = useQueryClient();
  const mutationDelete: any = useMutationPost(DELETE_STEP_STATUS, queryKeys.deleteStatus, {
    onSuccess: (data: any) => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.getDiagram, processId]);
        queryClient.invalidateQueries([queryKeys.getStep, stepId]);
      }, 500);
      // console.log('success data', data);
    },
    onError: (error: any) => {
      // console.log('failed', error);
    }
  });

  const onDelete = useCallback((id: string) => {
    alert('Are you sure to delete status => ' + id);
    mutationDelete.mutate({ id: processId, stepId: stepId, statusId: id });
  }, []);

  const renderButton = useCallback(() => {
    return <>{status.button}</>;
  }, [status]);

  const renderView = useCallback(() => {
    return <>{t(PROCESS_STATUS_VIEWS_VIEW[status.view.keyName])}</>;
  }, [status]);

  const renderEvent = useCallback(() => {
    return <>{t(PROCESS_STATUS_EVENTS_VIEW[status.event.keyName])}</>;
  }, [status]);

  const renderSequence = useCallback(() => {
    return <>{status.sequence[0] != '' && status.sequence.join('/')}</>;
  }, [status]);

  return (
    <TableRow>
      {isCta && stepType.value === 'TYPE_SITE' && <TableCell align="center">{status?.pageName}</TableCell>}
      {actionMethod != 'ACTION_METHOD_AUTO' &&
        stepType.value !== 'TYPE_WAIT' &&
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
      {actionMethod != 'ACTION_METHOD_AUTO' && stepType.value !== 'TYPE_WAIT' && !isCta && (
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
            {status.name}
          </TableCell>
        ) : (
          ''
        )
      ) : (
        <TableCell align="center">{status.name}</TableCell>
      )}
      <TableCell align="center">{t(PROCESS_STATUS_DIRECTIONS_VIEW[status.direction.keyName])}</TableCell>
      {processId && <TableCell align="center">{t(status.nextStep?.languageKey)}</TableCell>}
      <TableCell align="center">{t(PROCESS_STATUS_PROPERTIES_VIEW[status.property.keyName])}</TableCell>
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
      {mode == 'edit' && processId && (
        <TableCell align="center">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <IconButton size="small" color="primary" onClick={() => onEdit(status.id)}>
              <ModeEdit sx={{ fontSize: 18 }} />
            </IconButton>
            {status.property.keyName !== 'PROPERTY_NEW' &&
              status.property.keyName !== 'PROPERTY_TODO' &&
              status.property.keyName !== 'PROPERTY_TODO_DOING' && (
                <IconButton size="small" color="error" onClick={() => onDelete(status.id)}>
                  <CloseOutlined sx={{ fontSize: 18 }} />
                </IconButton>
              )}
          </Stack>
        </TableCell>
      )}
    </TableRow>
  );
}

export default React.memo(StatusItemView);
