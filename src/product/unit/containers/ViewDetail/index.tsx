import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _, { valuesIn } from 'lodash';
import { ColumnDef } from '@tanstack/react-table';

import { Box, Button, Grid, IconButton, styled, TextField, Typography, useTheme } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { UnitValue } from '@product/unit/types/unit';
import { useUnitValuesMutation } from '@product/unit/hooks/useUnitValuesMutation';
import { KEY_UNIT_NAME, KEY_UNIT_QTY, KEY_UNIT_RELATED_PRODUCTS } from '@product/unit/config/keyNames';
import LoadingButton from '@base/components/@extended/LoadingButton';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';

interface ViewDetailProps {
  value: UnitValue[];
  menuSource: string;
  menuSourceId: string;
  canEdit?: boolean;
}

const ViewDetail = (props: ViewDetailProps) => {
  const { value, menuSource, menuSourceId, canEdit = true } = props;

  const theme = useTheme();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [items, setItems] = useState<UnitValue[]>([]);
  const [oldData, setOldData] = useState<UnitValue[]>([]);
  const { mUpdate } = useUnitValuesMutation([]);

  useEffect(() => {
    if (!_.isEqual(value, items)) {
      setItems(value);
      setOldData(value);
    }
  }, [value]);

  useEffect(() => {
    if (_.isEqual(oldData, items)) {
      setIsValid(false);
    } else if (!_.isEqual(oldData, items)) {
      items.forEach((item: UnitValue) => {
        if (item?.name == '' || Number.isNaN(item?.qty) || item?.qty <= 0 ) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      });
    }
  }, [items]);

  const defaultItem: UnitValue = {
    id: '',
    [KEY_UNIT_NAME]: '',
    [KEY_UNIT_QTY]: 1
  };

  const handleDragEnd = useCallback(
    (result: any) => {
      const { source, destination } = result;
      if (!destination || destination?.index === 0) {
        return;
      }
      // re-order the items
      const newItems = [...items];
      const [removedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removedItem);
      setItems(newItems);
    },
    [items, setItems]
  );

  const handleAddItem = () => {
    const newItems = _.cloneDeep(items);
    newItems.push(defaultItem);
    setItems(newItems);
  };

  const handleOnSave = () => {
    const newItems = _.cloneDeep(items);
    const params: any = {
      unitId: menuSourceId,
      unitValues: newItems?.map((item: UnitValue) => {
        return { id: item.id, name: item.name, qty: item.qty };
      })
    };

    mUpdate.mutate(params, {
      onMutate() {
        setIsSaving(true);
      },
      onSuccess(data: any, variables: any, context: any) {
        setIsSaving(false);
        setIsEdit(false);
      },
      onError(error: any, variables: any, context: any) {
        setIsSaving(false);
        setIsEdit(false);
      }
    });
  };

  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      const [value, setValue] = React.useState<any>(initialValue || '');

      React.useEffect(() => {
        if(initialValue === 0 && id == KEY_UNIT_QTY ){
          setValue(0)
        }else{
          setValue(initialValue || '');
        }
      }, [initialValue]);

      switch (id) {
        case KEY_UNIT_NAME:
          return isEdit ? (
            <TextField
              fullWidth
              value={value || ''}
              disabled={index === 0}
              InputProps={{
                readOnly: index === 0
              }}
              sx={{
                background: index === 0 ? theme.palette.background.default : 'none'
              }}
              onChange={(e: any) => {
                setValue(e.target.value);
                table.options.meta?.updateCellData(index, id, e.target.value);
              }}
            />
          ) : (
            <Typography sx={{ pl: 1 }} color="primary">
              {value}
            </Typography>
          );
        case KEY_UNIT_QTY:
          return isEdit ? (
            <TextField
              fullWidth
              type="number"
              value={value}
              InputProps={{
                inputProps: {
                  min: 1
                },
                readOnly: index === 0
              }}
              sx={{
                background: index === 0 ? theme.palette.background.default : 'none'
              }}
              onChange={(e: any) => {
                setValue(parseInt(e.target.value));
                table.options.meta?.updateCellData(index, id, parseInt(e.target.value));
              }}
            />
          ) : (
            <Typography sx={{ pl: 1 }}>{value}</Typography>
          );
        case 'action':
          return index === 0 ? (
            <></>
          ) : (
            <IconButton
              size="small"
              aria-label="delete"
              color="error"
              onClick={(event: any) => {
                event.stopPropagation();
                table.options.meta?.removeTableRow(index, id);
                // handleRemoveItem(index);
              }}
            >
              <DeleteOutline fontSize="small" color="error" />
            </IconButton>
          );
        case 'moveicon':
          return index === 0 ? (
            <></>
          ) : (
            <DragIndicatorIcon
              sx={{ cursor: 'move', p: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 16 }}
              fontSize="small"
            />
          );
      }
    }
  };

  //build columns
  const columns = useMemo<ColumnDef<any>[]>(() => {
    const baseCols = [
      {
        accessorKey: KEY_UNIT_NAME,
        header: () => <SpanLang keyLang={'ncrm_common_unit_name'} textOnly />,
        width: '50%'
      },
      {
        accessorKey: KEY_UNIT_QTY,
        header: () => <SpanLang keyLang={'product_unit_field_basic_unitqty'} textOnly />,
        width: 'auto'
      }
    ];
    if (isEdit) {
      baseCols.push({
        accessorKey: 'action',
        header: () => <></>,
        width: '36px'
      });
      baseCols.unshift({
        accessorKey: 'moveicon',
        header: () => <></>,
        width: '24px'
      });
    }
    return baseCols;
  }, [isEdit]);

  return (
    <Box sx={{ m: -2 }}>
      <Grid container flexDirection="row-reverse" alignItems="center" sx={{ p: 1 }}>
        <Grid item>
          {!isEdit ? (
            canEdit && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setIsEdit(true);
                }}
                size="small"
                sx={{
                  borderColor: theme.palette.secondary.light
                }}
                startIcon={<BorderColorOutlinedIcon fontSize="small" />}
              >
                <SpanLang keyLang={`ncrm_common_btn_edit`} textOnly />
              </Button>
            )
          ) : (
            <Grid container>
              <Grid item sx={{ pr: 1 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setIsEdit(false);
                    setItems(oldData);
                  }}
                  size="small"
                >
                  <SpanLang keyLang={`ncrm_common_btn_cancel`} textOnly />
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  variant="contained"
                  loading={isSaving}
                  onClick={() => {
                    handleOnSave();
                  }}
                  disabled={!isValid}
                  sx={{
                    padding: '3px 8px'
                  }}
                  size="small"
                >
                  <SpanLang keyLang={`ncrm_common_btn_save`} textOnly />
                </LoadingButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <ReactEditable8
        editableColumn={editableColumn}
        columns={columns}
        data={[...items]}
        setData={(newData: any) => {
          setItems(newData);
        }}
        isDraggable={isEdit}
        handleOnDragEnd={handleDragEnd}
      />

      <Grid container alignItems="center" sx={{ pt: 0.5, pl: 1 }}>
        {isEdit && (
          <Grid item>
            <Button
              variant="contained"
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
        )}
      </Grid>
    </Box>
  );
};

export default ViewDetail;
