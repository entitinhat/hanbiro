import React, { useEffect, useState } from 'react';
import {
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  SxProps,
  TextField,
  TextFieldProps
} from '@mui/material';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { Currency, NumberSetting } from '@base/types/common';
import { useRecoilValue } from 'recoil';
import { defaultCurrencySelector, numberSettingSelector, usedCurrenciesSelector } from '@base/store/selectors/app';
import { DIGIT_GROUPS } from '@settings/general/config/constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import _ from 'lodash';
import { currencySymbol } from '@base/utils/helpers';

const CurrencyDropdown = (props: any) => {
  const { onChange, numberValue, optionOnlyCurrency } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<string>('');

  const currencies: Currency[] = useRecoilValue(usedCurrenciesSelector);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleChangeCurrenCy = (currency: Currency) => {
    onChange(currency);
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        size="small"
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Popper
        sx={{ zIndex: 1000 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        disablePortal
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps, placement }) => (
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                {currencies?.map((item: Currency, index: number) => (
                  <MenuItem
                    onClick={() => {
                      handleChangeCurrenCy(item);
                    }}
                    key={index}
                    value={item?.code}
                  >
                    {/* {` ${item?.code} (${item?.currencySymbol})`} */}
                    {optionOnlyCurrency ? `${item?.currencySymbol}` : `${item?.currencySymbol} ${numberValue}`}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        )}
      </Popper>
    </div>
  );
};

const TextFieldWithCurrentCy = (props: any) => {
  const { onChangeCurrenCy, currencyValue, value, disabledCurrency, optionOnlyCurrency, ...rest } = props;
  const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);
  const [currency, setCurrency] = useState<string>('');
  useEffect(() => {
    if (currencyValue) {
      if (_.isString(currencyValue)) {
        if (currencyValue != currency) {
          setCurrency(currencyValue);
        }
      } else {
        if (currencyValue?.code != currency) {
          setCurrency(currencyValue?.code || '');
        }
      }
    } else {
      setCurrency(defaultCurrency?.code || '');
    }
  }, [currencyValue]);
  // moneyFormat(unitPrice?.amount ?? 0, unitPrice?.currency) : ''}
  return (
    <TextField
      id="outlined-start-adornment"
      fullWidth
      value={value}
      InputProps={{
        startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
        endAdornment: !disabledCurrency && (
          <CurrencyDropdown
            numberValue={value}
            onChange={(_c: Currency) => {
              onChangeCurrenCy(_c);
              setCurrency(_c.code ?? '');
            }}
            optionOnlyCurrency={optionOnlyCurrency}
          />
        )
      }}
      {...rest}
    />
  );
};

interface NumberFieldProps {
  thousandSeparator?: string | boolean;
  prefix?: string;
  value: number | string;
  onChange: (val: string | number) => void;
  size?: 'small' | 'medium' | undefined;
  sx?: SxProps;
  // All other props
  [x: string]: any;

  onChageCurrency: (val: Currency) => void;
  currencyValue: Currency;
  disabledCurrency?: boolean;
  optionOnlyCurrency?: boolean;
}

const NumberFieldCurrency = (props: NumberFieldProps) => {
  const {
    prefix,
    value,
    onChange,
    size = 'medium',
    sx,
    onChageCurrency,
    currencyValue,
    disabledCurrency = false,
    optionOnlyCurrency = false,
    ...others
  } = props;
  //state
  const [numberValue, setNumberValue] = useState<string | number>('');
  const [thousandsGroupStyle, setThousandsGroupStyle] = useState<'none' | 'thousand' | 'lakh' | 'wan'>('none');

  const numberFormat: NumberSetting = useRecoilValue(numberSettingSelector);
  const { decimalSymbol, noOfDecimal, digitGroupingSymbol, digitGroup, negativeNumberFormat } = numberFormat;
  //console.log('...NumberField.numberFormat...', numberFormat, thousandsGroupStyle);

  //init value
  useEffect(() => {
    //if (value) {
    if (value.toString() !== numberValue.toString()) {
      setNumberValue(value);
    }
    //}
    // else {
    //   setNumberValue('');
    // }
  }, [value]);

  useEffect(() => {
    const _thousandsGroupStyle =
      (DIGIT_GROUPS?.find((v: any) => v.value === digitGroup)?.alias as 'none' | 'thousand' | 'lakh' | 'wan') || 'none';
    setThousandsGroupStyle(_thousandsGroupStyle);
  }, [digitGroup]);

  const handleChange = (newVal: string | number) => {
    setNumberValue(newVal);
    //callback
    onChange && onChange(newVal);
  };
  const handleChangeCurrency = (newValue: Currency) => {
    onChageCurrency(newValue);
  };

  return (
    <NumericFormat
      size={size}
      autoComplete="off"
      valueIsNumericString={true}
      thousandsGroupStyle={thousandsGroupStyle}
      decimalSeparator={decimalSymbol}
      decimalScale={noOfDecimal || 0}
      fixedDecimalScale={true}
      value={numberValue}
      onValueChange={(values, sourceInfo) => {
        handleChange(values.value);
      }}
      prefix={prefix}
      autoFocus
      sx={{
        ...sx,
        width: `100%`
      }}
      //Options for Currency formatting
      onChangeCurrenCy={handleChangeCurrency}
      currencyValue={currencyValue}
      disabledCurrency={disabledCurrency}
      customInput={TextFieldWithCurrentCy}
      optionOnlyCurrency={optionOnlyCurrency}
      {...others}
      //thousandSeparator={thousandsGroupStyle != 'none' ? digitGroupingSymbol : false}
    />
    // <PatternFormat
    //   value={numberValue}
    //   format="### ###"
    // />
  );
};

export default NumberFieldCurrency;
