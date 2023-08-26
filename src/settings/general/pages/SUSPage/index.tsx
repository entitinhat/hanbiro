import { useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';

//project
import LoadingButton from '@base/components/@extended/LoadingButton';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import SingleFileUpload from '@base/components/@hanbiro/Dropzone/SingleFile';

//material
import { ArrowBack, ArrowForward, HelpOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

//menu
import Section from '@settings/preferences/components/Section';
import CustomDomain from './CustomDomain';
import { SUS_DOMAIN, SUS_PATH_PREFIX } from './constants';

const STEPS = ['Requirements', 'Select your own domain', 'Adding an SSL/TLS certificate', 'Select number of characters'];

const SUSPage = () => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const [formStep, setFormStep] = useState(0);
  const { t } = useTranslation();

  //step tabs
  const renderFormSteps = () => {
    return (
      <Grid container>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <Stepper activeStep={formStep} sx={{ mt: 2 }}>
            {STEPS.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
              // }
              // if (isStepSkipped(index)) {
              //   stepProps.completed = false;
              // }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>
    );
  };

  const renderRequirement = () => {
    return (
      <Box sx={{ p: 2 }}>
        <FormControl sx={{ mr: 'auto' }}>
          <RadioGroup
            value={1}
            // onChange={(e: any, v: any) => {
            //   setAssignmentGroupType(v);
            // }}
            //sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <FormControlLabel control={<Radio />} value={1} label={'Root Domain or Sub Domain'} />
            <FormControlLabel control={<Radio />} value={2} label={'SSL or TLS'} />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const renderOwnDomain = () => {
    return (
      <Box sx={{ p: 2 }}>
        <FormControl sx={{ mr: 'auto' }}>
          <RadioGroup
            value={1}
            // onChange={(e: any, v: any) => {
            //   setAssignmentGroupType(v);
            // }}
            //sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <FormControlLabel control={<Radio />} value={1} label={'Root Domain (example.com)'} />
            <FormControlLabel control={<Radio />} value={2} label={'Sub Domain (subdomain.example.com)'} />
          </RadioGroup>
        </FormControl>
        <Stack spacing={1}>
          <InputLabel>
            <SpanLang keyLang={'DNS a record pointing your domain to our SUS server IP'} />
          </InputLabel>
          <Stack direction={'row'} spacing={2}>
            <TextField placeholder="write your domain" />
            <Select value={'A'}>
              <MenuItem value={'A'}>A</MenuItem>
              <MenuItem value={'CNAME'}>CNAME</MenuItem>
            </Select>
            <TextField placeholder="IP" />
            <Button size="small" variant="outlined" color="secondary">
              Check
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <InputLabel>
            <SpanLang keyLang={'A subdomain'} />
          </InputLabel>
          <Stack direction={'row'} spacing={2}>
            <TextField placeholder="write your subdomain" />
            <Select value={'CNAME'}>
              <MenuItem value={'A'}>A</MenuItem>
              <MenuItem value={'CNAME'}>CNAME</MenuItem>
            </Select>
            <TextField placeholder="v.sus.so" />
            <Button size="small" variant="outlined" color="secondary">
              Check
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const renderCertificate = () => {
    return (
      <Box sx={{ p: 2 }}>
        <FormControl sx={{ mr: 'auto' }}>
          <FormControlLabel control={<Checkbox />} value={false} label={'Sending email to Vora Works'} />
        </FormControl>
        <SingleFileUpload
          sx={{ padding: 0, borderColor: theme.palette.secondary.light, minWidth: '150px' }}
          //simplePlaceholder={true}
          file={null}
          setFieldValue={(field: string, file: any) => {
            //setValue(file);
          }}
        />
      </Box>
    );
  };

  const renderNumberChar = () => {
    return (
      <Stack sx={{ p: 2 }} spacing={1.5}>
        <Stack direction={'row'} spacing={1.5} alignItems="center">
          <Typography>https://</Typography>
          <TextField placeholder="domain registered" />
          <Select value={4}>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
          </Select>
        </Stack>
        <Stack spacing={1}>
          <InputLabel>
            <SpanLang keyLang={'Starting sample'} />
          </InputLabel>
          <Stack direction={'row'} spacing={1.5} alignItems="center">
            <Typography>https://</Typography>
            <TextField placeholder="domain" />
            <Typography>a | Q3</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={1.5} alignItems="center">
          <TextField placeholder="14,776.336" />
          <Typography>of personalized URLs are available</Typography>
        </Stack>
      </Stack>
    );
  };

  //render footer
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {/* <Button color="error" onClick={onClose}>
            Skip
          </Button> */}
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            {formStep + 1 > 1 && (
              <Button
                size="small"
                variant="contained"
                color="warning"
                startIcon={<ArrowBack />}
                onClick={() => setFormStep((cur) => cur - 1)}
              >
                Previous
              </Button>
            )}
            {formStep + 1 < 4 && (
              <Button
                size="small"
                variant="contained"
                color="warning"
                endIcon={<ArrowForward />}
                onClick={() => setFormStep((cur) => cur + 1)}
              >
                Next
              </Button>
            )}
            {formStep + 1 === 4 && (
              <LoadingButton
                variant="contained"
                color="success"
                //onClick={handleMerge}
                //loading={mMerge.isLoading}
                //disabled={mMerge.isLoading || mergeItems.length <= 1}
              >
                Finish
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    );
  }, [formStep]);

  return (
    <MainCard
      border={false}
      sx={{
        px: 2,
        '& .MuiCardContent-root': {
          bgcolor: theme.palette.background.paper
        }
      }}
      title={'Custom Domain'}
      headerSX={{
        bgcolor: theme.palette.background.paper
      }}
    >
      <Section header={t('Default Domain for PURL')}>
        <Stack sx={{ p: 2 }} spacing={1.5}>
          <Stack direction={'row'} spacing={1} alignItems="center">
            <InputLabel>
              <SpanLang keyLang={'PURLs (Personalized URLs)'} sx={{ fontWeight: 'bold' }} />
            </InputLabel>
            <Tooltip title="PURLs are dynamic websites where web address and content are personalized for each member of a campaign. Since each PURL is a unique webpage, make it easy to track online response and engagement.">
              <HelpOutline fontSize="small" />
            </Tooltip>
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems="center">
            <Typography>{`https://${SUS_DOMAIN}/${SUS_PATH_PREFIX}/8chars`}</Typography>
            {/* <TextField
              placeholder="domain registered"
              disabled`
              value={`${SUS_DOMAIN}/${SUS_PATH_PREFIX}`}
              sx={{ width: matchesMd ? '100%' : '50%' }}
            />
            <Typography>/8chars</Typography> */}
            {/* <Select value={4}>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select> */}
          </Stack>
        </Stack>
      </Section>
      <CustomDomain />
    </MainCard>
  );
};

export default SUSPage;
