// material-ui
import { Theme } from '@mui/material/styles';
import { SxProps, Grid, Stack, FormHelperText } from '@mui/material';
import { CustomFile } from '@base/types/dropzone';

//project import
import UploadSingleFile from '@base/components/@hanbiro/Dropzone/SingleFile';

interface SingleFileUploadProps {
  keyName?: string;
  acceptedImage?: boolean;
  errors?: any; //hook form errors
  value: CustomFile[] | null;
  onChange: (value: any) => void; //field: string
  sx?: SxProps<Theme>;
}

const SingleFileUpload = ({ keyName = '', acceptedImage = false, errors, value, onChange, sx }: SingleFileUploadProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack spacing={1.5} alignItems="center">
          <UploadSingleFile
            file={value}
            acceptedImage={acceptedImage}
            error={!!errors?.[keyName]}
            setFieldValue={(field: string, value: any) => onChange && onChange(value)}
          />
          {errors?.[keyName] && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {errors[keyName]}
            </FormHelperText>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SingleFileUpload;
