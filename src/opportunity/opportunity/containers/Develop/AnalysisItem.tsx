import React from 'react';
import { Box, Button, Chip, Divider, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { OptionValue } from '@base/types/common';
import { ANALYSIS_TYPE_ACCOUNT, ANALYSIS_TYPE_CONTACT, ANALYSIS_TYPE_OPTIONS, ANALYSIS_TYPE_USER } from '@opportunity/config/constants';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import { DeleteOutline } from '@mui/icons-material';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';

interface AnalysisItemProps {
  value: any;
  onChange?: (nVal: any) => void;
  onDelete?: (id: string) => void;
}

const AnalysisItem = (props: AnalysisItemProps) => {
  const { value, onChange, onDelete } = props;
  const { id, type, reviewer, isAddItem } = value;
  const theme = useTheme();

  const handleOnChange = (nVal: any, field: string) => {
    onChange &&
      onChange({
        ...value,
        [field]: nVal
      });
  };

  const handleDeleteItem = (id: string) => {
    onDelete && onDelete(id);
  };

  return (
    <Box>
      {isAddItem ? (
        <Stack direction={'row'} alignItems={'center'} spacing={1} width={'100%'}>
          <Typography color={'secondary'}>Reviewer</Typography>
          <SelectBox
            options={ANALYSIS_TYPE_OPTIONS}
            value={ANALYSIS_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === type)}
            onChange={(nVal: OptionValue) => handleOnChange(nVal.keyName, 'type')}
          />
          <Box width={'160%'}>
            {type == ANALYSIS_TYPE_USER && (
              <UserAutoComplete single value={reviewer} onChange={(nVal: any) => handleOnChange(nVal, 'reviewer')} />
            )}
            {type == ANALYSIS_TYPE_ACCOUNT && (
              <CustomerAutoComplete
                category={CUSTOMER_CATEGORY_ACCOUNT}
                single
                value={reviewer}
                onChange={(nVal: any) => handleOnChange(nVal, 'reviewer')}
              />
            )}
            {type == ANALYSIS_TYPE_CONTACT && (
              <CustomerAutoComplete
                category={CUSTOMER_CATEGORY_CONTACT}
                single
                value={reviewer}
                onChange={(nVal: any) => handleOnChange(nVal, 'reviewer')}
              />
            )}
          </Box>
        </Stack>
      ) : (
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack direction={'row'} spacing={1}>
            <Typography color={'secondary'}>Reviewer</Typography>
            <Typography color={theme.palette.primary.main}>{reviewer?.name}</Typography>
            <Chip
              label={
                <SpanLang
                  sx={{ fontSize: 12 }}
                  keyLang={ANALYSIS_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === type)?.languageKey || ''}
                />
              }
              size="small"
            />
          </Stack>

          <IconButton color="error" size="small" sx={{ marginLeft: 'auto' }} onClick={() => handleDeleteItem(id)}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Stack>
      )}
      {/* <Typography>2020-04-01</Typography>
      <TextField
        sx={{ background: theme.palette.grey[200] }}
        fullWidth
        multiline
        rows={2}
        value={`Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.`}
      /> */}
    </Box>
  );
};

export default AnalysisItem;
