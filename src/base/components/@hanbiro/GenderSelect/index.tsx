import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GENDER_OPTIONS } from "./config";

interface GenderSelectProps {
  value: string;
  onChange: (val: string) => void;
}

const GenderSelect = (props: GenderSelectProps) => {
  const { value, onChange } = props;
  const { t } = useTranslation();
  //state
  const [selectedValue, setSelectedValue] = useState(GENDER_OPTIONS[0].label);

  //init rows
  useEffect(() => {
    if (value) {
      if (value !== selectedValue) {
        setSelectedValue(value);
      }
    } else {
      setSelectedValue(GENDER_OPTIONS[0].label);
    }
  }, [value]);

  //value change
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    //callback
    onChange && onChange(newValue);
  };

  return (
    <Select
      fullWidth
      displayEmpty
      inputProps={{ 'aria-label': 'gender select' }}
      value={selectedValue}
      onChange={(e: SelectChangeEvent) => {
        const selected = e.target.value as string;
        handleValueChange(selected);
      }}
    >
      <MenuItem value="" disabled>
        <em>Select...</em>
      </MenuItem>
      {GENDER_OPTIONS.map((_option: any) => {
        return (
          <MenuItem key={_option.label} value={_option.label}>
            {t(_option.languageKey)}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default GenderSelect;