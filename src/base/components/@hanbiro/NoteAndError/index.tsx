import { InfoRounded, WarningRounded } from '@mui/icons-material';
import { Alert, Stack, Typography } from '@mui/material';
import SpanLang from '../SpanLang';

interface NoteAndErrorProps {
  errors: any;
}

function NoteAndError({ errors = {} }: NoteAndErrorProps) {
  return (
    <>
      {Object.keys(errors).length > 0 ? (
        <Alert
          color="error"
          sx={{ borderRadius: 0, py: 0.5, alignItems: 'center', '& .MuiAlert-message': { mt: 0 } }}
          icon={<WarningRounded />}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'normal', wordBreak: 'break-all' }}>
            {/* There are errors on the form. Please fix them before continuing. */}
            <SpanLang keyLang={'ncrm_common_form_error_warning'} textOnly />
          </Typography>
        </Alert>
      ) : (
        <Alert
          color="primary"
          sx={{ borderRadius: 0, py: 0.5, alignItems: 'center', '& .MuiAlert-message': { mt: 0 } }}
          icon={<InfoRounded />}
        >
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
              *
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'normal', wordBreak: 'break-all' }}>
              <SpanLang keyLang={'ncrm_common_cannot_except_required_field'} textOnly />
            </Typography>
          </Stack>
        </Alert>
      )}
    </>
  );
}

export default NoteAndError;
