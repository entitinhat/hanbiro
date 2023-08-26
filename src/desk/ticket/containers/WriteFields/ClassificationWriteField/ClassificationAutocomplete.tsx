import { KEY_TICKET_ASSIGN_GROUP, KEY_TICKET_ASSIGN_USER } from '@desk/ticket/config/keyNames';
import React, { useEffect, useState } from 'react';
// import AssignGroupAutoComplete from '../AssignGroupAutocomplete';
// import AssignRepAutoComplete, { AssignRepValue } from '../AssignRepAutocomplete';
import { Autocomplete, Box, Grid, IconButton, InputLabel, TextField, Typography, useTheme } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { useTicketClassificationsSetting } from '@settings/preferences/hooks/desk/useTicketClassification';
import { Classiffication, ClassifficationValue } from '@desk/ticket/types/classification';
import MainCard from '@base/components/App/MainCard';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ClearIcon from '@mui/icons-material/Clear';
interface ClassificationAutocompleteProps {
  handleRemove?: () => void;
  showRemoveButton?: boolean;
  onChange?: (value: ClassifficationValue) => void;
  value?: ClassifficationValue;
  ignoredOption?: ClassifficationValue[];
  handleValid?: (isLastRow: boolean) => void;
  cardMode?: boolean;
}

const ClassificationAutocomplete = (props: ClassificationAutocompleteProps) => {
  const { handleRemove, showRemoveButton = false, onChange, value, ignoredOption = [], cardMode = true, handleValid } = props;
  const { t } = useTranslation();
  const { data, isLoading } = useTicketClassificationsSetting(false, '');

  //Classfication options
  const [classificationOptions, setClassificationOptions] = useState<Classiffication[] | null>(null);
  const [classifcationValue, setClassificationValue] = useState<Classiffication | null>(null);

  //Value  of Classfication
  const [classificationValueOptions, setClassificationValueOptions] = useState<string[] | null>(null);
  const [classOptionValue, setClassOptionValue] = useState<string | null>(null);

  const theme = useTheme();

  //=================================================Initial===========================================
  useEffect(() => {
    if (value) {
      const classfication = value.classification;
      const optionValue = value.value;
      if (classfication && data?.results) {
        const nClassfication = data?.results.find((option) => option.id === classfication.id) ?? null;
        if (nClassfication) {
          const nClassificationValueOptions = nClassfication.values;
          setClassificationValueOptions(nClassificationValueOptions);
          setClassificationValue(nClassfication);
        } else {
          setClassificationValue({
            id: classfication.id,
            name: classfication.name,
            values: [optionValue]
          });
        }
      }
      if (optionValue) {
        setClassOptionValue(optionValue);
      }
    }
  }, [value, data]);

  useEffect(() => {
    if (!isLoading && data?.results && ignoredOption) {
      let ignoredIds = ignoredOption.map((item: ClassifficationValue) => {
        return item.classification.id;
      });
      let classficationData = data?.results.filter((item: Classiffication) => {
        return !ignoredIds.includes(item.id);
      });

      setClassificationOptions(classficationData);

      if (classficationData.length == 1) {
        handleValid && handleValid( true);
      } else {
        handleValid && handleValid( false);
      }
    }
  }, [data, ignoredOption]);

  //============================================================================================

  const handleClassificationChange = (event: React.SyntheticEvent, selected: Classiffication | null, reason: string) => {
    const _nclassficationValue = { id: selected?.id ?? '', name: selected?.name ?? '' };

    //If Classfiation has value, we set it to classificationValueOptions
    if (selected) {
      const classficationValues = selected.values;
      if (classficationValues) {
        setClassificationValueOptions(classficationValues);
        // setClassOptionValue(null);
      } else {
        setClassificationValueOptions(null);
        // setClassOptionValue(null);
      }
    }

    setClassificationValue(selected);
    onChange &&
      onChange({
        value: '',
        classification: _nclassficationValue
      });
  };
  const handleOptionValueChange = (event: React.SyntheticEvent, selected: string | null, reason: string) => {
    if (selected) {
      const _nclassficationValue = { id: classifcationValue?.id ?? '', name: classifcationValue?.name ?? '' };
      setClassOptionValue(selected);
      onChange &&
        onChange({
          value: selected,
          classification: _nclassficationValue
        });
    }
  };
  const getType = (cardMode: boolean) => {
    if (cardMode)
      return (
        <>
          <MainCard
            title={
              <InputLabel>
                {/* Classification */}
                <SpanLang
                  sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }}
                  keyLang="Classification/Value"
                />
              </InputLabel>
            }
            secondary={
              <>
                {showRemoveButton && (
                  <IconButton size="small" color="error" onClick={handleRemove}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            }
            sx={{
              marginLeft: 2,
              marginBottom: 0.8,
              '& .MuiCardHeader-root': {
                padding: 0.8
              },
              '& .MuiCardContent-root': {
                padding: 0.8
              },
              overflow: 'visible'
            }}
          >
            <Grid container rowSpacing={1}>
              <Grid item xs={12}>
                <Autocomplete
                  id="asynchronous-item"
                  sx={{ padding: '5px 0px', minWidth: 200 }}
                  isOptionEqualToValue={(option: Classiffication, value) => {
                    return option?.id === value?.id;
                  }}
                  getOptionLabel={(option: Classiffication) => option?.name ?? ''}
                  options={classificationOptions ?? []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={'Select a classification'}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {/* {searchStatus === 'loading' ? <CircularProgress size={20} /> : null} */}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                  value={classifcationValue}
                  onChange={handleClassificationChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={classificationValueOptions ?? []}
                      sx={{ padding: '5px 0px', minWidth: 200 }}
                      renderInput={(params) => <TextField {...params} placeholder="please select classfication before" />}
                      value={classOptionValue}
                      onChange={handleOptionValueChange}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </MainCard>
        </>
      );
    else
      return (
        <>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              id="asynchronous-item"
              sx={{ padding: '5px 0px', minWidth: 200 }}
              isOptionEqualToValue={(option: Classiffication, value) => {
                return option?.id === value?.id;
              }}
              getOptionLabel={(option: Classiffication) => option?.name ?? ''}
              options={classificationOptions ?? []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={'Select a classification'}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {/* {searchStatus === 'loading' ? <CircularProgress size={20} /> : null} */}
                        {params.InputProps.endAdornment}
                      </>
                    )
                  }}
                />
              )}
              value={classifcationValue}
              onChange={handleClassificationChange}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={classificationValueOptions ?? []}
                  sx={{ padding: '5px 0px', minWidth: 200 }}
                  renderInput={(params) => <TextField {...params} placeholder="please select classfication before" />}
                  value={classOptionValue}
                  onChange={handleOptionValueChange}
                />
              </Box>
              {showRemoveButton && (
                <IconButton size="small" color="error" onClick={handleRemove}>
                  <DeleteOutlineOutlined fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Grid>
        </>
      );
  };

  //======================================================+++++Debugging+================================
  // console.log('ClassificationAutocomplete classificationValueOptions', classificationValueOptions);
  // console.log('ClassificationAutocomplete classifcationValue', classifcationValue);
  //================================================================================================================
  return (
    <Grid container columnSpacing={2}>
      {getType(cardMode)}
    </Grid>
  );
};

export default ClassificationAutocomplete;
