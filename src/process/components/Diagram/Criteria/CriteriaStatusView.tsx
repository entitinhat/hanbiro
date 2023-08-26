import { IdName } from '@base/types/common';
import { Grid, Stack, Typography } from '@mui/material';
import { StatusForm } from '@process/types/process';
import { useTranslation } from 'react-i18next';

interface CriteriaStatusProps {
  value: StatusForm[];
}

function CriteriaStatusView({ value: statusesValue }: CriteriaStatusProps) {
  const { t } = useTranslation()
  const statusCount = statusesValue.length;

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
                  <Typography variant="subtitle1" color="secondary">
                    {status.name}
                  </Typography>
                </div>
              </div>
              <div className="direction-false">
                {isBackward && (
                  <div className="false-status">
                    <Typography variant="subtitle1" color="secondary">
                      {backward.name}
                    </Typography>
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

export default CriteriaStatusView;
