import { useEffect, useMemo, useState } from 'react';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import * as baseComponents from '@base/config/write-field/components';
import {
  TextField,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Box,
  Stack,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button
} from '@mui/material';
import WriteField from '@base/containers/WriteField';
import LinkTypeSelectLandingPage from '@settings/digital/landing-page/containers/LandingPageAutocomplete';
import LinkTypeSelectSurvey from '@settings/digital/survey/containers/SurveyAutocomplete';
import LinkTypeSelectSite from '@settings/site/containers/SiteAutocomplete';
import * as constants from '@settings/digital/ticket-form/config/constants';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import WebsiteInput from './WebsiteInput';
import BehaviorCheck from '../containers/BehavirorCheck';
interface FormSubmissionSetting {
  getValues: any;
  setValue: any;
  watch: any;
  errors: any;
  control: any;
}

function FormSubmissionSetting(props: FormSubmissionSetting) {
  const { getValues, watch, errors, control, setValue } = props;
  const { t } = useTranslation();

  const linkTypeWatch = watch(keyNames.KEY_TICKET_FORM_LINK_TO_TYPE);
  const submissionDisplayWatch = watch(keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY);
  const displayMessageWatch = watch(keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE);
  const linkToPageWatch = watch(keyNames.KEY_TICKET_FORM_LINK_TO_PAGE);
  const linkToResourceWatch = watch(keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE);

  const [isBehaviorCheck, setIsBehaviorCheck] = useState(false);
  useEffect(() => {
    if (linkTypeWatch) {
      setValue(keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE, null);
    }
  }, [linkTypeWatch]);
  const settingSection = useMemo(() => {
    const children = (
      <Stack spacing={1}>
        <FormControlLabel
          value={constants.TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE}
          control={<Radio />}
          label={<SpanLang keyLang="ncrm_generalsetting_ticket_form_field_basic_thank_you_message" />}
        />
        <WriteField
          item={{
            hideTitle: true,
            keyName: keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE,
            Component: TextField,
            componentProps: {
              multiline: true,
              rows: 4,
              value: ''
            }
          }}
          control={control}
          errors={errors}
        />
        <FormControlLabel
          sx={{ ml: '-11px !important', pt: 1, mr: 2 }}
          value={constants.TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE}
          control={<Radio />}
          label={<SpanLang keyLang="ncrm_generalsetting_ticket_form_field_basic_redirect" />}
        />
        <WriteField
          item={{
            hideTitle: true,
            keyName: keyNames.KEY_TICKET_FORM_LINK_TO_PAGE,
            Component: WebsiteInput,
            componentProps: {
              value: ''
            }
          }}
          control={control}
          errors={errors}
        />
        <Stack direction="row" sx={{ pb: 1, pt: 1 }}>
          <FormControlLabel
            value={constants.TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE}
            control={<Radio />}
            label={<SpanLang keyLang="ncrm_generalsetting_ticket_form_field_basic_link" />}
          />
          <WriteField
            item={{
              hideTitle: true,
              keyName: keyNames.KEY_TICKET_FORM_LINK_TO_TYPE,
              Component: Select,
              componentProps: {
                value: constants.TICKET_FORM_LINK_TYPES[0].value,
                children: constants.TICKET_FORM_LINK_TYPES.map((_option: any) => (
                  <MenuItem key={_option.value} value={_option.value}>
                    {t(_option.label)}
                  </MenuItem>
                ))
              }
            }}
            control={control}
            errors={errors}
          />
        </Stack>
        {linkTypeWatch === constants.TICKET_FORM_LINK_TYPE_LANDING_PAGE && (
          <WriteField
            item={{
              hideTitle: true,
              keyName: keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE,
              Component: LinkTypeSelectLandingPage,
              componentProps: {
                linkType: constants.TICKET_FORM_LINK_TYPE_LANDING_PAGE
              }
            }}
            control={control}
            errors={errors}
          />
        )}
        {linkTypeWatch === constants.TICKET_FORM_LINK_TYPE_SURVEY && (
          <WriteField
            item={{
              hideTitle: true,
              keyName: keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE,
              Component: LinkTypeSelectSurvey,
              componentProps: {
                linkType: constants.TICKET_FORM_LINK_TYPE_SURVEY
              }
            }}
            control={control}
            errors={errors}
          />
        )}
        {linkTypeWatch === constants.TICKET_FORM_LINK_TYPE_SITE && (
          <WriteField
            item={{
              hideTitle: true,
              keyName: keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE,
              Component: LinkTypeSelectSite,
              componentProps: {
                linkType: constants.TICKET_FORM_LINK_TYPE_SITE
              }
            }}
            control={control}
            errors={errors}
          />
        )}
      </Stack>
    );

    return (
      <WriteField
        item={{
          Component: RadioGroup,
          keyName: keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY,
          componentProps: {
            children
          }
        }}
        control={control}
        errors={errors}
      />
    );
  }, [linkTypeWatch]);

  return (
    <Grid sx={{ ml: 2, mt: 2 }} container spacing={1}>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography textAlign="left" variant="subtitle1" color={'secondary'}>
            <SpanLang keyLang="ncrm_generalsetting_ticket_form_field_basic_submissiondisplay" />
          </Typography>
          {settingSection}
          <Typography textAlign="left" variant="subtitle1" color={'secondary'} sx={{ pt: 3 }}>
            <SpanLang keyLang="ncrm_generalsetting_ticket_form_field_basic_submissionbehavior" />
          </Typography>
          <WriteField
            item={{
              hideTitle: true,
              keyName: keyNames.KEY_TICKET_FORM_CREATE_TICKET,
              Component: baseComponents.MuiCheckbox,
              componentProps: {
                label: 'ncrm_generalsetting_ticket_form_new_ticket',
                labelPlacement: 'end'
              }
            }}
            control={control}
            errors={errors}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={1}>
          <Button
            onClick={() => {
              setIsBehaviorCheck(true);
            }}
            size="small"
            variant="outlined"
            color="secondary"
          >
            {t('ncrm_generalsetting_ticket_form_behavior_check')}
          </Button>
          <BehaviorCheck
            isChecking={isBehaviorCheck}
            onBehaviorCheck={(value: boolean) => {
              setIsBehaviorCheck(false);
            }}
            linkToType={linkTypeWatch}
            linkToPage={linkToPageWatch}
            linkToResource={linkToResourceWatch}
            displayMessage={displayMessageWatch}
            submissionDisplay={submissionDisplayWatch}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default FormSubmissionSetting;
