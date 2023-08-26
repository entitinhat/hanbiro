// material-ui
import { Theme } from '@mui/material/styles';
import { SxProps, Grid, Stack, FormHelperText, Typography } from '@mui/material';
import { CustomFile } from '@base/types/dropzone';

//project import
import UploadAvatar from '@base/components/@hanbiro/Dropzone/Avatar';
import { useTranslation } from 'react-i18next';

interface ImageUploadProps {
  keyName?: string;
  errors?: any; //hook form errors
  value: CustomFile[] | null;
  onChange: (value: any) => void; //field: string
  sx?: SxProps<Theme>;
}

const ImageUpload = ({ keyName = '', errors, value, onChange, sx }: ImageUploadProps) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={1.5} alignItems="center">
          <UploadAvatar
            file={value}
            error={!!errors?.[keyName]}
            setFieldValue={(field: string, value: any) => onChange && onChange(value)}
          />
          {errors?.[keyName] && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {errors[keyName]}
            </FormHelperText>
          )}
          <Stack spacing={0}>
            <Typography align="center" variant="caption" color="secondary">
              {t('ncrm_common_allowed')} 'image/*'
            </Typography>
            <Typography align="center" variant="caption" color="secondary">
              *.png, *.jpeg, *.jpg, *.gif
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ImageUpload;
