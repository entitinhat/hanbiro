import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useTicketClassificationsSetting } from '@settings/preferences/hooks/desk/useTicketClassification';
import { useEffect, useState, Suspense } from 'react';

import { Autocomplete, TextField, Grid, Stack, InputLabel, useTheme, Box, Button, SelectChangeEvent, IconButton } from '@mui/material';
import { Classiffication, ClassifficationValue } from '@desk/ticket/types/classification';
import { TicketClassification } from '@settings/preferences/types/desk/ticketClassification';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import _ from 'lodash';
import ClassificationAutocomplete from './ClassificationAutocomplete';
import { DeleteOutlineOutlined } from '@mui/icons-material';
interface ClassificationProps {
  column?: number;
  value?: ClassifficationValue[];
  isPublic?: boolean;
  token?: string;
  onChange?: (val: ClassifficationValue[]) => void;
  cardMode?: boolean;
  // filterToolbarAction?: boolean; // Check if is filter toolbar checked action
}
const defaultRow: any = {
  classification: {
    id: '',
    name: ''
  },
  value: ''
};
const Classification = (props: ClassificationProps) => {
  const { column = 2, isPublic = false, token = '', value, onChange, cardMode = false } = props;

  //add row state
  const [rows, setRows] = useState<ClassifficationValue[]>(value ? value : [defaultRow]);
  const [ignoredClassFication, setIgnoredClassFication] = useState<ClassifficationValue[]>(value ? value : []);
  const [isShowAddButton, setIsShowAddButton] = useState<boolean>(true);
  const [isLastRow, setIsLastRow] = useState<boolean>(false);
  const theme = useTheme();

  //value change
  const handleValueChange = (index: number, keyName: string, keyValue: any) => {
    const newRows = [...rows];
    newRows[index] = keyValue;
    setRows(newRows);
    setIgnoredClassFication(newRows);
    onChange && onChange(newRows);
  };

  const handleAddClassfication = () => {
    const newRows = [...rows];
    newRows.push(defaultRow);
    setRows(newRows);
    if (isLastRow) setIsShowAddButton(false);
    onChange && onChange(newRows);
  };
  const handleRemoveClassfication = (rIndex: number) => {
    const newClassfications = [...rows];
    newClassfications.splice(rIndex, 1);
    setRows(newClassfications);
    setIgnoredClassFication(newClassfications);
    onChange && onChange(newClassfications);
  };

  return (
    <>
      <Grid paddingTop={1} container={true} direction={'row'}>
        {!cardMode && (
          <>
            <Grid item xs={12} lg={6}>
              <InputLabel>
                {/* Classification */}
                <SpanLang
                  sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }}
                  keyLang="Classification"
                />
              </InputLabel>
            </Grid>
            <Grid paddingLeft={1} item xs={12} lg={6}>
              <InputLabel>
                {/* Values */}
                <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }} keyLang="Value" />
              </InputLabel>
            </Grid>
          </>
        )}

        {rows?.map((row, index) => (
          <Grid key={index} item xs={12}>
            <ClassificationAutocomplete
              cardMode={cardMode}
              value={row}
              onChange={(value) => {
                handleValueChange(index, '', value);
              }}
              handleValid={(isLastRow) => {
                setIsLastRow(isLastRow);
              }}
              ignoredOption={ignoredClassFication}
              handleRemove={() => {
                handleRemoveClassfication(index);
              }}
              showRemoveButton={index == 0 ? false : true}
            />
          </Grid>
        ))}
        {isShowAddButton && (
          <Grid item xs={12}>
            <Button
              size="small"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                handleAddClassfication();
              }}
            >
              <SpanLang sx={{ fontSize: '0.75rem', fontWeight: theme.typography.fontWeightMedium }} keyLang="ncrm_common_add_new_line" />
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Classification;
