import React, { useEffect, useMemo, useState } from 'react';

// material-ui
import { Box, Grid } from '@mui/material';

// third-party
import _ from 'lodash';
import { Control, Controller, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';

// project imports
import WriteField from '@base/containers/WriteField';

import { Product } from '@product/product/types/product';
import { KEY_PRODUCT_ATTRIBUTE } from '@product/product/config/keyNames';
import * as keyNames from '@product/item/config/keyNames';
import { default as writeConfig } from '@product/item/config/write-field';
import ItemType from './ItemType';
import { PRODUCT_ITEM_TYPE_ENUM_COMPOSITE, PRODUCT_ITEM_TYPE_ENUM_GENERAL } from '@product/main/config/constants';

interface WriteFieldsProps {
  menuApi: string;
  fields: any[]; //with write form
  watch: UseFormWatch<any>; //hook-form
  control: Control<any, any>; //hook-form
  setValue: UseFormSetValue<any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { menuApi, fields, watch, control, setValue, errors } = props;

  const [showKeys, setShowKeys] = useState<string[]>([keyNames.KEY_ITEM_PRODUCT, keyNames.KEY_ITEM_TYPE, keyNames.KEY_ITEM_INVENTORY_TYPE]);

  const prodData: Product = watch(keyNames.KEY_ITEM_PRODUCT);
  const withProd: boolean = watch('withProd');
  const fromProd: boolean = watch('fromProd');
  const itemType = watch(keyNames.KEY_ITEM_TYPE)?.value || '';

  // console.log('field-> items', fields);
  // main fields
  const MainFields = useMemo(() => {
    let baseUnitNameConfig: any = writeConfig?.[keyNames.KEY_ITEM_UNIT];
    baseUnitNameConfig.keyName = keyNames.KEY_ITEM_UNIT;
    baseUnitNameConfig.columns = baseUnitNameConfig.showFullRow ? 1 : 2;
    baseUnitNameConfig.Component = baseUnitNameConfig.component;
    baseUnitNameConfig.languageKey = 'product_item_field_basic_unit';

    let attrConfig: any = writeConfig?.[KEY_PRODUCT_ATTRIBUTE];
    attrConfig.keyName = KEY_PRODUCT_ATTRIBUTE;
    attrConfig.columns = attrConfig.showFullRow ? 1 : 2;
    attrConfig.Component = attrConfig.component;
    attrConfig.languageKey = 'product_item_field_basic_attrvalues';
    attrConfig.componentProps.attributes = prodData?.[KEY_PRODUCT_ATTRIBUTE] || [];
    attrConfig.componentProps.withProd = withProd;

    let itemTypeConfig: any = writeConfig?.[keyNames.KEY_ITEM_TYPE];
    itemTypeConfig.keyName = keyNames.KEY_ITEM_TYPE;
    itemTypeConfig.columns = itemTypeConfig.showFullRow ? 1 : 2;
    itemTypeConfig.Component = ItemType;
    itemTypeConfig.languageKey = 'product_item_field_basic_itemtype';
    itemTypeConfig.componentProps.prodData = prodData;

    let assConfig: any = writeConfig?.[keyNames.KEY_ITEM_ASSOCIATED_ITEMS];
    assConfig.keyName = keyNames.KEY_ITEM_ASSOCIATED_ITEMS;
    assConfig.columns = assConfig.showFullRow ? 1 : 2;
    assConfig.Component = assConfig.component;
    assConfig.languageKey = 'product_item_field_basic_associateditems';
    assConfig.componentProps.isWriteForm = true;

    let descriptionConfig: any = writeConfig?.[keyNames.KEY_ITEM_DESCRIPTION];
    descriptionConfig.keyName = keyNames.KEY_ITEM_DESCRIPTION;
    descriptionConfig.Component = descriptionConfig.component;
    descriptionConfig.languageKey = 'product_item_field_basic_description';

    return (
      <>
        {fields.map((_item, _index) => {
          if (showKeys.indexOf(_item?.keyName) < 0) return;

          if (_item?.keyName == keyNames.KEY_ITEM_PRODUCT && (withProd || fromProd)) {
            _item.componentProps.placeholder = prodData?.name;
            _item.componentProps.isDisabled = true;
          }

          return _item?.keyName === keyNames.KEY_ITEM_TYPE ? (
            <WriteField key={itemTypeConfig.keyName} item={itemTypeConfig} control={control} errors={errors} />
          ) : (
            <WriteField key={_item.keyName} item={_item} control={control} errors={errors} />
          );
        })}

        {/* Associated Items */}
        {itemType === PRODUCT_ITEM_TYPE_ENUM_COMPOSITE && (
          <WriteField key={assConfig.keyName} item={assConfig} control={control} errors={errors} />
        )}

        {/* Base Unit Name */}
        <WriteField key={baseUnitNameConfig.keyName} item={baseUnitNameConfig} control={control} errors={errors} />

        {/* Attributes */}
        {itemType === PRODUCT_ITEM_TYPE_ENUM_GENERAL && prodData?.useAttr && (
          <WriteField key={attrConfig.keyName} item={attrConfig} control={control} errors={errors} />
        )}

        <WriteField key={descriptionConfig.keyName} item={descriptionConfig} control={control} errors={errors} />
      </>
    );
  }, [fields, prodData, showKeys]);

  // render
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={2} alignItems="center">
        {MainFields}
      </Grid>
    </Box>
  );
};

export default WriteFields;
