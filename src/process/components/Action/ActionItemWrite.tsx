import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import SelectBox from '@base/components/@hanbiro/SelectBox';
import { OptionValue } from '@base/types/common';
import { Add, CloseOutlined, Remove } from '@mui/icons-material';
import { FormControlLabel, IconButton, Radio, Stack, TableCell, TableRow, TextField } from '@mui/material';
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
import { useStatusCallback } from '@process/hooks/useStatus';
import { statusWithParallelFilter } from '@process/store/selectors';
import { StatusForm } from '@process/types/process';
import { checkParallel } from '@process/utils/helper';

interface ActionItemWriteProps {
  status: StatusForm;
  parallelIndex: number;
}

function ActionItemWrite({ status, parallelIndex }: ActionItemWriteProps) {
  const parallelCount = useRecoilValue(statusWithParallelFilter('normal')).length;
  const isParallel = checkParallel(status);
  const {
    onChangeKeyName,
    onChangeDirection,
    onChangeStatus,
    onSequenceChange,
    onSequenceAdd,
    onSequenceDelete,
    onChangeMultiplePrimary,
    onReset
  } = useStatusCallback(status);

  const sequenceOptions = useMemo<OptionValue[]>(() => {
    let options: OptionValue[] = [{ keyName: '', languageKey: '' }];
    for (let i = 1.5; i < 5.5; i = i + 0.5) {
      options.push({ keyName: '' + i, languageKey: '' + i });
    }
    return options;
  }, []);

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
        {status.view.keyName == 'VIEW_DISABLE' ||
        status.property.keyName == 'PROPERTY_TODO' ||
        status.property.keyName == 'PROPERTY_TODO_DOING' ? (
          PROCESS_STATUS_VIEWS_VIEW[status.view.keyName]
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
        status.property.keyName == 'PROPERTY_TODO' ||
        status.property.keyName == 'PROPERTY_TODO_DOING' ? (
          PROCESS_STATUS_EVENTS_VIEW[status.event.keyName]
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
        {status.property.keyName == 'PROPERTY_TODO' || status.property.keyName == 'PROPERTY_TODO_DOING' ? (
          status.sequence?.join('/')
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
      {isParallel && parallelCount > 1 ? (
        parallelIndex == 1 ? (
          <TableCell align="center" rowSpan={parallelCount}>
            {renderButton()}
          </TableCell>
        ) : (
          ''
        )
      ) : (
        <TableCell align="center">{renderButton()}</TableCell>
      )}
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
      {isParallel && parallelCount > 1 ? (
        parallelIndex == 1 ? (
          <TableCell align="center" rowSpan={parallelCount}>
            {renderEvent()}
          </TableCell>
        ) : (
          ''
        )
      ) : (
        <TableCell align="center">{renderEvent()}</TableCell>
      )}
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
          {/* {(status.multiple == 'MULTIPLE_CHOICE' || status.multiple == 'MULTIPLE_PARALLEL') && (
            <FormControlLabel
              name="multiple-primary"
              value="yes"
              control={<Radio checked={status.primary} onChange={onChangeMultiplePrimary} />}
              label="Primary"
            />
          )} */}

          {status.direction.keyName == 'DIRECTION_DISABLE' ||
          status.property.keyName == 'PROPERTY_TODO' ||
          status.property.keyName == 'PROPERTY_TODO_DOING' ? (
            PROCESS_STATUS_DIRECTIONS_VIEW[status.direction.keyName]
          ) : (
            <SelectBox
              size="small"
              value={status.direction}
              onChange={(newValue: OptionValue) => onChangeDirection(newValue)}
              options={PROCESS_STATUS_DIRECTIONS}
            />
          )}
        </Stack>
      </TableCell>
      <TableCell align="center">
        {status.property.keyName == 'PROPERTY_DISABLE' ||
        status.property.keyName == 'PROPERTY_TODO' ||
        status.property.keyName == 'PROPERTY_TODO_DOING' ? (
          PROCESS_STATUS_PROPERTIES_VIEW[status.property.keyName]
        ) : (
          <SelectBox
            size="small"
            value={status.property}
            onChange={(newValue: OptionValue) => onChangeKeyName({ property: newValue })}
            options={PROCESS_STATUS_PROPERTIES}
          />
        )}
      </TableCell>
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
      <TableCell align="center">
        <Stack direction="row" alignItems="center" justifyContent="center">
          {status.reset &&
            status.property.keyName !== 'PROPERTY_NEW' &&
            status.property.keyName !== 'PROPERTY_TODO' &&
            status.property.keyName !== 'PROPERTY_TODO_DOING' && (
              <IconButton color="error" onClick={() => onReset()} sx={{ '&:hover': { bgcolor: 'transparent', color: 'error.main' } }}>
                <CloseOutlined fontSize="inherit" />
              </IconButton>
            )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default React.memo(ActionItemWrite);
