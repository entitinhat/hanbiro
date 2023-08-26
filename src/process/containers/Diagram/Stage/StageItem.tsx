import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import IconButton from '@base/components/@extended/IconButton';
import { sideBarSizeAtom } from '@base/store/atoms';
import { Add, Close, ModeEdit } from '@mui/icons-material';
import { ClickAwayListener, Stack, Typography, useTheme } from '@mui/material';
import useStageMutation from '@process/hooks/useStageMutation';
import { stepOpenAtom } from '@process/store/atoms/step';
import { Stage } from '@process/types/diagram';

interface StageItemProps {
  processId: string;
  stage: Stage;
  className: string;
}

function StageItem(props: StageItemProps) {
  const theme = useTheme();
  const [showEdit, setShowEdit] = useState(false);
  const { stage, className, processId } = props;
  const setStepOpen = useSetRecoilState(stepOpenAtom);
  const setSidebarSize = useSetRecoilState(sideBarSizeAtom);

  const onStageAdd = useCallback(() => {
    setStepOpen({
      open: true,
      edit: false,
      type: 'stage',
      sourceId: stage.id,
      data: null
    });
    setShowEdit(false);
    setSidebarSize(400);
  }, [stage]);

  const onStageEdit = useCallback(() => {
    setStepOpen({
      open: true,
      edit: true,
      type: 'stage',
      sourceId: stage.id,
      data: stage
    });
    setShowEdit(false);
    setSidebarSize(400);
  }, [stage]);

  const {
    mDeleteStage: { mutate: mutationDelete }
  } = useStageMutation(processId);

  const onDelete = useCallback(
    (stageId: string) => {
      if (confirm('Do you want to delete this stage?')) {
        mutationDelete({ id: processId, stageId: stageId });
      }
    },
    [stage]
  );

  return (
    <div className={classNames('stage-item', className)} style={{ width: stage.width }}>
      <ClickAwayListener onClickAway={() => setShowEdit(false)}>
        <Stack sx={{ height: '100%' }} direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            noWrap
            sx={{ cursor: 'pointer', fontWeight: theme.typography.fontWeightMedium }}
            onClick={() => setShowEdit((cur) => !cur)}
          >
            {stage.name}
          </Typography>
          {showEdit && (
            <Stack spacing={0} direction="row" alignItems="center">
              <IconButton size="small" color="secondary" onClick={onStageEdit}>
                <ModeEdit sx={{ fontSize: 18 }} />
              </IconButton>
              {stage.property == 'PROPERTY_LINK' && (
                <IconButton size="small" color="secondary" onClick={() => onDelete(stage.id)}>
                  <Close sx={{ fontSize: 18 }} />
                </IconButton>
              )}
              {stage.property !== 'PROPERTY_CLOSE' && (
                <IconButton sx={{ ml: 0.5 }} variant="outlined" size="small" color="primary" onClick={() => onStageAdd()}>
                  <Add sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>
      </ClickAwayListener>
    </div>
  );
}

export default StageItem;
