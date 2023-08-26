// material-ui
import { CustomFile } from '@base/types/dropzone';
import { FormHelperText, Grid, Stack, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

//project import
import SingleFileUpload from '@base/components/@hanbiro/Dropzone/SingleFile';

interface ImageUploadProps {
  keyName?: string;
  errors?: any; //hook form errors
  value: CustomFile[] | null;
  onChange: (value: any) => void; //field: string
  sx?: SxProps<Theme>;
}

const CtaImageUpload = ({ keyName = '', errors, value, onChange, sx }: ImageUploadProps) => {
  return (
    <Grid container sx={{ mt: '10px!important' }}>
      <Grid item xs={12}>
        <Stack spacing={1.5} alignItems="center">
          <SingleFileUpload
            file={value}
            acceptedImage
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
              Allowed 'image/*'
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

export default CtaImageUpload;
