import { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { IdName } from '@base/types/common';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import statusAtom from '@process/store/atoms/status';
import { useTranslation } from 'react-i18next';

interface CriteriaStatusWriteProps {}

function CriteriaStatusWrite(props: CriteriaStatusWriteProps) {
  const { t } = useTranslation()
  const [statusesValue, setStatusesValue] = useRecoilState(statusAtom);
  const statusCount = statusesValue.length;

  const onChangeName = useCallback(
    (newValue: string, id: string) => {
      setStatusesValue((old) => {
        const targetIndex = old.findIndex((status) => status.id === id);
        const targetValue = { ...old[targetIndex], name: newValue };
        return [...old.slice(0, targetIndex), targetValue, ...old.slice(targetIndex + 1)];
      });
    },
    [statusesValue]
  );

  return (
    <Grid item xs={12}>
      <Stack spacing={1} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" color="secondary">
        {t('ncrm_process_step_set_status_for_process')}
        </Typography>
        {statusesValue.map((status, index) => {
          if (statusCount == index + 1) return;
          const isBackward = statusCount - 2 == index;
          let backward: IdName = { id: '', name: '' };
          if (isBackward) {
            const nextStatus = statusesValue[index + 1];
            backward = {
              id: nextStatus.id,
              name: nextStatus.name
            };
          }
          return (
            <div key={status.id} className="diagram-item diagram-criteria with-boolean-direction">
              <div className="criteria-shape"></div>
              <div className="diagram-item-name">{status.button}</div>
              <div className="direction-true">
                <div className="true-status">
                  <TextField
                    fullWidth
                    size="small"
                    color="secondary"
                    value={status.name}
                    placeholder={'Status name'}
                    sx={{ width: 150 }}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeName(event.target.value, status.id)}
                  />
                </div>
              </div>
              <div className="direction-false">
                {isBackward && (
                  <div className="false-status">
                    <TextField
                      fullWidth
                      size="small"
                      value={backward.name}
                      sx={{ width: 150 }}
                      placeholder={'Status name'}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeName(event.target.value, backward.id)}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Stack>
    </Grid>
  );
}

export default CriteriaStatusWrite;
