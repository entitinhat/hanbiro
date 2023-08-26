import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

import useSequenceMutation from '@activity/hooks/useSequenceMutation';

import { DeleteOutline, EditOutlined, SaveOutlined } from '@mui/icons-material';
import { Button, Checkbox, IconButton, Stack, TableCell, TextField, Typography } from '@mui/material';

import { Duration } from '@base/config/write-field/components';

import { DurationOptions, parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { convertDateTimeServerToClient } from '@base/utils/helpers';

import useSnackBar from '@base/hooks/useSnackBar';
import ModalPreview from '../ModalPreview';
import { TaskSequence } from '@settings/template/types/template';

interface SequenceItemProps {
  item: TaskSequence;
  seq: number;
  mode?: 'write' | 'view';
  sourceId?: string;
  handleValueChange?: (index: number, keyName: any, keyValue: any) => void;
  handleRemoveRow?: (index: number) => void;
}

function SequenceItem(props: SequenceItemProps) {
  const { enqueueInfoBar } = useSnackBar();
  const { item, mode = 'write', sourceId, handleValueChange, handleRemoveRow, seq } = props;

  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState<any>({ html: '', css: '' });

  const itemMode = mode == 'view' ? (item.editFlag || item.newFlag ? 'write' : 'view') : 'write';

  useEffect(() => {
    if (item?.detail !== '') {
      const htmlData = item?.detail;
      setDataPreview({
        html: htmlData?.html,
        css: htmlData?.css
      });
    }
  }, [item?.detail]);
  const handlePreviewClick = () => {
    setIsPreview(true);
  };

  const renderItemWrite = () => {
    return (
      <>
        <TableCell>
          <Typography color="secondary">#{seq + 1}</Typography>
        </TableCell>
        <TableCell>
          <TextField
            required
            size="small"
            fullWidth
            value={item.title}
            onChange={(e) => handleValueChange && handleValueChange(seq, 'title', e.currentTarget.value)}
          />
        </TableCell>
        <TableCell>
          <Duration
            size="small"
            options={_.clone(DurationOptions).splice(0, 4)}
            value={{ duration: Number(item.duration.time), durationUnit: item.duration.unit }}
            onChange={(val) => {
              const newDuration = {
                time: val.duration,
                unit: val.durationUnit
              };
              handleValueChange && handleValueChange(seq, 'duration', newDuration);
            }}
          />
        </TableCell>

        <TableCell align="center">
          <Button
            onClick={() => {
              handlePreviewClick();
            }}
            size="small"
            color="primary"
          >
            <Typography color="primary" variant="body1">
              Details
            </Typography>
          </Button>
        </TableCell>
        <TableCell align="center">
          {mode == 'view' && (
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                handleValueChange && handleValueChange(seq, 'editFlag', false);
              }}
            >
              <SaveOutlined fontSize="small" />
            </IconButton>
          )}
          <IconButton
            size="small"
            color="secondary"
            onClick={() => {
              handleRemoveRow && handleRemoveRow(seq);
            }}
          >
            <DeleteOutline fontSize="small" />
          </IconButton>
        </TableCell>
      </>
    );
  };

  const renderItemView = () => {
    return (
      <>
        <TableCell>
          <Stack spacing={0.5} direction="row" alignItems="center">
            <Checkbox
              defaultChecked={item.done}
              disabled={item.done}
              color="secondary"
              onChange={(e) => handleValueChange && handleValueChange(seq, 'done', e.currentTarget.checked)}
            />
            <Typography color="secondary">#{seq + 1}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack spacing={0.5}>
            <Typography variant="body1">{item.title}</Typography>
            {item.done && (
              <Typography variant="body2" color="textPrimary" sx={{ ml: 4 }}>
                {convertDateTimeServerToClient({
                  date: item.doneTime,
                  isTime: true,
                  humanize: true 
                })}
              </Typography>
            )}
          </Stack>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1">
            {parseDurationValueToString({
              durationUnit: item.duration.unit,
              duration: item.duration.time
            })}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => {
              handlePreviewClick();
            }}
            size="small"
            color="primary"
          >
            <Typography color="primary" variant="body1">
              Details
            </Typography>
          </Button>
        </TableCell>
        <TableCell align="center">
          <Stack spacing={0.3} direction="row">
            {mode == 'view' && (
              <IconButton size="small" color="secondary" onClick={() => handleValueChange && handleValueChange(seq, 'editFlag', true)}>
                <EditOutlined fontSize="small" />
              </IconButton>
            )}
            <IconButton
              size="small"
              color="secondary"
              onClick={() => {
                handleRemoveRow && handleRemoveRow(seq);
              }}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Stack>
        </TableCell>
      </>
    );
  };

  return (
    <React.Suspense>
      {itemMode == 'write' ? renderItemWrite() : renderItemView()}

      {isPreview && (
        <ModalPreview
          mode={itemMode ?? 'view'}
          isOpen={isPreview}
          size="xl"
          title="Inscription Details"
          value={dataPreview}
          handleClose={() => setIsPreview(false)}
          handleChange={(value) => {
            handleValueChange && handleValueChange(seq, 'detail', value);
          }}
        />
      )}
    </React.Suspense>
  );
}

export default React.memo(SequenceItem);
