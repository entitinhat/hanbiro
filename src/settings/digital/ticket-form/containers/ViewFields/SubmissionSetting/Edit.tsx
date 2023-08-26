import React, { useEffect, useState } from 'react';

import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import Icon from '@base/assets/icons/svg-icons';
import * as constants from '@settings/digital/ticket-form/config/constants';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import LangdingPageAutocomplete from '@settings/digital/landing-page/containers/LandingPageAutocomplete';
import SurveyAutocomplete from '@settings/digital/survey/containers/SurveyAutocomplete';
import { useTranslation } from 'react-i18next';
import WebsiteInput from '@settings/digital/ticket-form/components/WebsiteInput';
import SiteAutocomplete from '@settings/site/containers/SiteAutocomplete';
interface EditProps {
  value: any;
  componentProps: any;
  onChange: (val: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  const { t } = useTranslation();

  const [curValue, setCurValue] = useState<any>({
    [keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY]: value[keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY],
    [keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE]: value[keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE],
    [keyNames.KEY_TICKET_FORM_LINK_TO_PAGE]: value[keyNames.KEY_TICKET_FORM_LINK_TO_PAGE],
    [keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]: value[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]
      ? {
          name: value?.[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]?.name,
          id: value?.[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]?.id
        }
      : value[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE],
    [keyNames.KEY_TICKET_FORM_LINK_TO_TYPE]: value[keyNames.KEY_TICKET_FORM_LINK_TO_TYPE]
  });

  //open file dialog
  const handleValueChange = (keyName: string, keyValue: any) => {
    const newValue = { ...curValue };
    newValue[keyName] = keyValue;
    setCurValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  const handleLinkTypeSelectChange = (keyValue: any) => {
    const newValue = { ...curValue };
    newValue[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE] = keyValue;
    setCurValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  return (
    <Box sx={{ wiidth: '100%', pb: 1 }}>
      <RadioGroup
        value={curValue[keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY]}
        onChange={(e: any) => handleValueChange(keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY, e.target.value)}
      >
        <FormControlLabel
          value={constants.TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE}
          control={<Radio />}
          label={t('ncrm_generalsetting_ticket_form_field_basic_thank_you_message')}
        />
        <TextField
          onChange={(e: any) => handleValueChange(keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE, e.target.value)}
          multiline={true}
          rows={4}
          value={curValue[keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE]}
          fullWidth
        />
        <FormControlLabel
          value={constants.TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE}
          control={<Radio />}
          label={t('ncrm_generalsetting_ticket_form_field_basic_redirect')}
        />
        <WebsiteInput
          value={curValue[keyNames.KEY_TICKET_FORM_LINK_TO_PAGE]}
          onChange={(e: any) => handleValueChange(keyNames.KEY_TICKET_FORM_LINK_TO_PAGE, e.target.value)}
        />

        <Stack direction="row" sx={{ pt: 1, pb: 1 }}>
          <FormControlLabel
            value={constants.TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE}
            control={<Radio />}
            label={t('ncrm_generalsetting_ticket_form_field_basic_link')}
            sx={{ width: '50px' }}
          />
          <Box sx={{ width: 'calc(100% - 51px)' }}>
            <Select
              fullWidth
              value={curValue[keyNames.KEY_TICKET_FORM_LINK_TO_TYPE] ? curValue[keyNames.KEY_TICKET_FORM_LINK_TO_TYPE] : ''}
              onChange={(e: any) => handleValueChange(keyNames.KEY_TICKET_FORM_LINK_TO_TYPE, e.target.value)}
            >
              {constants.TICKET_FORM_LINK_TYPES.map((_option: any) => (
                <MenuItem key={_option.value} value={_option.value}>
                  {t(_option.label)}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
        {curValue[keyNames.KEY_TICKET_FORM_LINK_TO_TYPE] === constants.TICKET_FORM_LINK_TYPE_LANDING_PAGE && (
          <LangdingPageAutocomplete
            {...componentProps}
            value={curValue?.[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]}
            onChange={handleLinkTypeSelectChange}
          />
        )}
        {curValue[keyNames.KEY_TICKET_FORM_LINK_TO_TYPE] === constants.TICKET_FORM_LINK_TYPE_SITE && (
          <SiteAutocomplete
            {...componentProps}
            value={curValue?.[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]}
            onChange={handleLinkTypeSelectChange}
          />
        )}
        {curValue[keyNames.KEY_TICKET_FORM_LINK_TO_TYPE] === constants.TICKET_FORM_LINK_TYPE_SURVEY && (
          <SurveyAutocomplete
            {...componentProps}
            value={curValue?.[keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE]}
            onChange={handleLinkTypeSelectChange}
          />
        )}
      </RadioGroup>
    </Box>
  );
};

export default Edit;
