// material-ui
import { Theme } from '@mui/material/styles';
import { SxProps, Grid, Stack, FormHelperText } from '@mui/material';
import { CustomFile } from '@base/types/dropzone';

//project import
import UploadMultiFile from '@base/components/@hanbiro/Dropzone/MultiFile';

interface MultiFileUploadProps {
  keyName?: string;
  errors?: any; //hook form errors
  value: CustomFile[] | null;
  onChange: (value: any) => void; //field: string
  sx?: SxProps<Theme>;
}

const MultiFileUpload = ({ keyName = '', errors, value, onChange, sx, ...restProps }: MultiFileUploadProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack spacing={1.5} alignItems="center">
          <UploadMultiFile
            //simplePlaceholder={true}
            files={value}
            error={!!errors?.[keyName]}
            setFieldValue={(field: string, value: any) => onChange && onChange(value)}
            {...restProps}
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

export default MultiFileUpload;
