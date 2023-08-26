import React, { useEffect, useState } from 'react';

import { Box, Button, Grid, InputLabel, Stack, TextField, useTheme } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';

import { IdName } from '@base/types/common';
import IconButton from '@base/components/@extended/IconButton';
import MainCard from '@base/components/App/MainCard';
import { Attribute, AttributeValue } from '@product/attribute/types/attribute';
import AttributeAutoComplete from '@product/attribute/containers/AttributeAutoComplete';
import AttributeValueAutoComplete from '@product/attribute/containers/AttributeValueAutoComplete';
import { Typography } from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import AddIcon from '@mui/icons-material/Add';
interface AttributeValueProps {
  value: Attribute[];
  onChange?: (val?: any) => void;
  attributes?: Attribute[];
  withProd?: boolean;
}

const AttributeValue = (props: AttributeValueProps) => {
  const { value, onChange, attributes, withProd } = props;

  const theme = useTheme();

  // state
  const [attrs, setAttrs] = useState<Attribute[]>(value || []);
  const [ignoredAttrs, setIgnoredAttrs] = useState<Attribute[]>(value || []);

  useEffect(() => {
    setAttrs(value);
    setIgnoredAttrs(value);
  }, [value]);

  const handleAttrChange = (cIndex: number, val: Attribute | Attribute[] | null) => {
    // TODO: check exists

    const newAttrs = [...attrs];

    newAttrs[cIndex] = val as Attribute;
    setAttrs(newAttrs);
    setIgnoredAttrs(newAttrs);
    // callback
    onChange && onChange(newAttrs);
  };

  const handleValuesChange = (cIndex: number, vals: AttributeValue | AttributeValue[] | null) => {
    const newAttrs = [...attrs];

    const cAttr = newAttrs[cIndex];
    newAttrs[cIndex] = { ...cAttr, values: vals as AttributeValue[] };

    // setAttrs(newAttrs);
    onChange && onChange(newAttrs);
  };

  const handleAttrRemove = (rIndex: number) => {
    const newAttrs = [...attrs];
    newAttrs.splice(rIndex, 1);
    setAttrs(newAttrs);
    setIgnoredAttrs(newAttrs);
    onChange && onChange(newAttrs);
  };

  const handleAttrAdd = () => {
    const newAttrs = [...attrs];
    // newAttrs.push(attributes?.[0] as Attribute);
    newAttrs.push({} as Attribute);
    setAttrs(newAttrs);
    setIgnoredAttrs(newAttrs);
    onChange && onChange(newAttrs);
  };

  return (
    <Grid container={true} spacing={2} sx={{}} direction={'row'}>
      <Grid item xs={12} lg={6}>
        <InputLabel>
          {/* Attribute */}
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang="ncrm_product_item_write_attribute_item" />
          <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
            *
          </Box>
        </InputLabel>
      </Grid>
      <Grid item xs={12} lg={6}>
        <InputLabel>
          {/* Values */}
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang="ncrm_product_item_write_attribute_values" />
        </InputLabel>
      </Grid>
      {attrs &&
        attrs?.map((attr: Attribute, index: number) => {
          // const isDisable = Boolean(attrs.indexOf(attr) && attr?.id);
          // TODO: add UI disable Attribute by set isDisable
          const isDisable = withProd ? false : true;
          return (
            <React.Suspense key={index} fallback={<></>}>
              <Grid item xs={12} lg={6}>
                <AttributeAutoComplete
                  isDisabled={isDisable}
                  // options={attributes}
                  ignoredOption={ignoredAttrs}
                  value={attr}
                  onChange={(attrVal: Attribute | Attribute[] | null) => {
                    handleAttrChange(index, attrVal as Attribute);
                  }}
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
                    <AttributeValueAutoComplete
                      attr={attr as IdName}
                      single={false}
                      // disabled={isDisable}
                      // value={isDisable ? [] : attr?.values}
                      value={attr?.values}
                      onChange={(vals) => {
                        handleValuesChange(index, vals);
                      }}
                    />
                  </Box>
                  {withProd && (
                    <IconButton
                      size="medium"
                      color="error"
                      onClick={() => {
                        handleAttrRemove(index);
                      }}
                    >
                      <DeleteOutlineOutlined />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </React.Suspense>
          );
        })}
      {withProd && (
        <Grid item xs={12}>
          <Button
            size="small"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              handleAttrAdd();
            }}
          >
            {/* {`Add a attribute`} */}
            <SpanLang sx={{ fontSize: '0.75rem', fontWeight: theme.typography.fontWeightMedium }} keyLang="ncrm_common_add_new_line" />
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default AttributeValue;
