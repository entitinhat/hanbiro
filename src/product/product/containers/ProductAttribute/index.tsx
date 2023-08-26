import React, { useState } from 'react';
import { FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';
import AttributeAutoComplete from '@product/attribute/containers/AttributeAutoComplete';
import { Attribute } from '@product/attribute/types/attribute';
import SpanLang from '@base/components/@hanbiro/SpanLang';

export interface ProductAttributeValueProps {
  useAttr: boolean;
  attributes?: Attribute[];
}

interface ProductAttributeProps {
  value: ProductAttributeValueProps;
  onChange?: (params?: ProductAttributeValueProps) => void;
}

const ProductAttribute = (props: ProductAttributeProps) => {
  const { value, onChange } = props;
  const { useAttr, attributes } = value;

  const [useAttribute, setUseAttribute] = useState<boolean>(useAttr);

  const handleChangeSwich = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseAttribute(event.target.checked);
    onChange &&
      onChange({
        ...value,
        useAttr: event.target.checked
      });
  };

  const handleChangeAttributes = (attrs: Attribute | Attribute[] | null) => {
    onChange &&
      onChange({
        ...value,
        attributes: attrs as Attribute[]
      });
  };

  return (
    <FormGroup>
      <FormControlLabel
        sx={{ m: 0 }}
        control={<Switch size="small" checked={useAttribute} onChange={handleChangeSwich} />}
        label={<SpanLang keyLang="ncrm_product_form_text_product_attributes_label" textOnly />}
      />
      {useAttribute && <AttributeAutoComplete single={false} value={attributes} onChange={handleChangeAttributes} />}
    </FormGroup>
  );
};

export default ProductAttribute;
