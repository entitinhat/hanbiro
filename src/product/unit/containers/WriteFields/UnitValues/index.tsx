import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Box,
  styled,
  TableBody,
  IconButton,
  Button,
  Grid,
  TextField,
  useMediaQuery,
  Typography
} from '@mui/material';
import { DeleteOutline, Add } from '@mui/icons-material';

import { UnitValue } from '@product/unit/types/unit';
import { KEY_UNIT_NAME, KEY_UNIT_QTY } from '@product/unit/config/keyNames';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import useDevice from '@base/hooks/useDevice';

interface UnitValuesProps {
  value: UnitValue[];
  onChange?: (nVal: UnitValue[]) => void;
}

const TableHeadCell = styled(Box)({
  fontSize: 14,
  textTransform: 'capitalize',
  whiteSpace: 'nowrap'
});

const UnitValues = (props: UnitValuesProps) => {
  const { value, onChange } = props;

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [items, setItems] = useState<UnitValue[]>(value || []);

  useEffect(() => {
    if (!_.isEqual(value, items)) {
      setItems(value);
    }
  }, [value]);

  const defaultItem: UnitValue = {
    id: '',
    [KEY_UNIT_NAME]: '',
    [KEY_UNIT_QTY]: 1
  };

  const handleAddItem = () => {
    const newItems = _.cloneDeep(items);
    newItems.push(defaultItem);
    setItems(newItems);

    onChange && onChange(newItems);
  };

  const handleRemoveItem = (rIndex: number) => {
    if (rIndex === 0) return;
    const newItems = _.cloneDeep(items);
    newItems.splice(rIndex, 1);
    setItems(newItems);

    onChange && onChange(newItems);
  };

  const handleOnChange = (index: number, key: string, val: any) => {
    const newItems: any[] = _.cloneDeep(items);
    newItems[index][key] = val;
    setItems(newItems);

    onChange && onChange(newItems as UnitValue[]);
  };

  const desktopMemo = useMemo(() => {
    return (
      <>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ borderTop: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                <TableCell>
                  <TableHeadCell>
                    <SpanLang keyLang="product_unit_field_basic_unitvalues" textOnly />
                    <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
                      *
                    </Box>
                  </TableHeadCell>
                </TableCell>
                <TableCell align="left">
                  <TableHeadCell>
                    <SpanLang keyLang="product_unit_field_basic_unitqty" textOnly />
                    <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
                      *
                    </Box>
                  </TableHeadCell>
                </TableCell>
                <TableCell align="center" sx={{ width: '50px' }}>
                  <TableHeadCell>{``}</TableHeadCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: UnitValue, index: number) => {
                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <TextField
                        fullWidth
                        value={item?.name}
                        disabled={index === 0}
                        InputProps={{
                          readOnly: index === 0
                        }}
                        sx={{
                          background: index === 0 ? theme.palette.background.default : 'none'
                        }}
                        onChange={(e: any) => {
                          handleOnChange(index, KEY_UNIT_NAME, e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="left" component="th" scope="row">
                      <TextField
                        fullWidth
                        type="number"
                        InputProps={{
                          readOnly: index === 0,
                          inputProps: {
                            min: 1
                          }
                        }}
                        value={item?.qty}
                        onChange={(e: any) => {
                          handleOnChange(index, KEY_UNIT_QTY, parseInt(e.target.value));
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {index > 0 && (
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => {
                            handleRemoveItem(index);
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              color="primary"
              size="small"
              onClick={() => {
                handleAddItem();
              }}
              variant='contained'
              startIcon={<Add />}
            >
              <SpanLang keyLang="ncrm_common_add_new_line" textOnly />
            </Button>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </>
    );
  }, [items]);

  const mobileMemo = useMemo(() => {
    return (
      <>
        {items.map((item: UnitValue, index: number) => {
          return (
            <React.Fragment key={index}>
              <Typography fontWeight={600}>{`Line ${index + 1}`}</Typography>
              <SpanLang keyLang="product_unit_field_basic_unitvalues" textOnly />
              <TextField
                fullWidth
                value={item?.name}
                disabled={index === 0}
                InputProps={{
                  readOnly: index === 0
                }}
                sx={{
                  background: index === 0 ? theme.palette.background.default : 'none'
                }}
                onChange={(e: any) => {
                  handleOnChange(index, KEY_UNIT_NAME, e.target.value);
                }}
              />
              <SpanLang keyLang="product_unit_field_basic_unitqty" textOnly />
              <TextField
                fullWidth
                type="number"
                value={item?.qty}
                onChange={(e: any) => {
                  handleOnChange(index, KEY_UNIT_QTY, parseInt(e.target.value));
                }}
              />
              {index > 0 && (
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    handleRemoveItem(index);
                  }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              )}
            </React.Fragment>
          );
        })}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              color="primary"
              size="small"
              onClick={() => {
                handleAddItem();
              }}
              startIcon={<Add />}
            >
              <SpanLang keyLang="ncrm_common_add_new_line" textOnly />
            </Button>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </>
    );
  }, [items]);

  return <>{matchesSm ? mobileMemo : desktopMemo}</>;
};

export default UnitValues;