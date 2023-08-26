import { Grid, Box, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import fieldsConfig from './config';
import WriteField from '@base/containers/WriteField';
import YourLogo from '@settings/billing-license/components/YourLogo';

// import components custom
// import YourLogo from '@settings/billing-license/components/YourLogo';

const BusinessRegistration = () => {
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      등록: '',
      법인: '',
      대표: '',
      업태: '',
      종목: ''
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const MainFields = useMemo(() => {
    return (
      <>
        {fieldsConfig?.map((_item: any) => {
          return <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />;
        })}
      </>
    );
  }, [fieldsConfig, errors, control]);

  return (
    <Box border={border}>
      <Box p={2} borderBottom={border}>
        <Typography fontWeight={500}>사업자 등록증</Typography>
      </Box>
      {/* <Box className="content">
        <StackItem>
          <label className="text" style={{ marginBottom: '8px' }}>
            등록번호
          </label>
          <InputStyle fullWidth sx={{ color: '#323338' }} />
        </StackItem>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <StackItem>
              <label className="text" style={{ marginBottom: '8px' }}>
                법인명
              </label>
              <InputStyle fullWidth sx={{ color: '#323338' }} />
            </StackItem>
          </Grid>
          <Grid item xs={6}>
            <StackItem>
              <label className="text" style={{ marginBottom: '8px' }}>
                대표자
              </label>
              <InputStyle fullWidth sx={{ color: '#323338' }} />
            </StackItem>
          </Grid>
        </Grid>
        <StackItem>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="사업장 소재지" />
          </FormGroup>
        </StackItem>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <StackItem>
              <label className="text" style={{ marginBottom: '8px' }}>
                업태
              </label>
              <InputStyle fullWidth sx={{ color: '#323338' }} />
            </StackItem>
          </Grid>
          <Grid item xs={6}>
            <StackItem>
              <label className="text" style={{ marginBottom: '8px' }}>
                종목
              </label>
              <InputStyle fullWidth sx={{ color: '#323338' }} />
            </StackItem>
          </Grid>
        </Grid>
        <StackItem><YourLogo />
        </StackItem>
      </Box> */}
      <form>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            {MainFields}
          </Grid>
        </Box>
      </form>
      <Box p={2}>
        <YourLogo />
      </Box>
    </Box>
  );
};

export default BusinessRegistration;
