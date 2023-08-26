import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box, InputLabel, Stack, Switch, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import {
  TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE,
  TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE,
  TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE
} from '@settings/digital/ticket-form/config/constants';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MuiCheckbox from '@base/components/@hanbiro/MuiCheckbox';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';

interface ViewProps extends CommonViewProps {
  value: any;
}

const View = (props: ViewProps) => {
  const { value } = props;

  const theme = useTheme();

  let title = '';
  let displayValue = '';
  if (value.submissionDisplay === TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE) {
    title = 'ncrm_generalsetting_ticket_form_field_basic_thank_you_message';
    displayValue = value?.displayMessage;
  } else if (value.submissionDisplay === TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE) {
    title = 'ncrm_generalsetting_ticket_form_field_basic_redirect';
    displayValue = value?.linkToPage;
  } else if (value.submissionDisplay === TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE) {
    title = 'ncrm_generalsetting_ticket_form_field_basic_link';
    displayValue = value?.linkToResource?.name;
  }

  return (
    <Stack spacing={2}>
      <InputLabel sx={{ display: 'flex', alignItems: 'center', color: theme.palette.secondary.main }}>
        <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={title ?? ''} />
      </InputLabel>
      <Typography>{displayValue}</Typography>
    </Stack>
  );
};

export default View;
