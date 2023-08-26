import SpanLang from '@base/components/@hanbiro/SpanLang';
import WriteField from '@base/containers/WriteField';
import * as keyNames from '@desk/ticket/config/keyNames';
import { Autocomplete, TextField, Grid, Stack, InputLabel, useTheme, Box, Button, SelectChangeEvent, IconButton } from '@mui/material';

import _ from 'lodash';
import { Control, FieldErrorsImpl } from 'react-hook-form';

interface CategoryProductContainerProps {
  fields: any[]; //with write form
  control: Control<any, any>; //hook-form
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const CategoryProductContainer = (props: CategoryProductContainerProps) => {
  const { fields, control, errors } = props;
  const theme = useTheme();

  //value change

  return (
    <Grid item xs={12}>
      <Grid container={true} spacing={2} direction={'row'}>
        <Grid item xs={12}>
          <InputLabel>
            {/* Classification */}
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium, color: theme.palette.text.secondary }} keyLang="Category" />
          </InputLabel>
        </Grid>
        {fields.map((_item, _index) => {
          let newComponentProps = { ..._item?.componentProps };
          if ([keyNames.KEY_TICKET_PRODUCT, keyNames.KEY_TICKET_CATEGORY].includes(_item.keyName)) {
            if (_item.keyName == keyNames.KEY_TICKET_CATEGORY) {
              _item.languageKey = 'ncrm_desk_ticket_issue';
            }
            return (
              <WriteField key={_item.keyName} item={{ ..._item, componentProps: newComponentProps }} control={control} errors={errors} />
            );
          }
          return;
        })}
      </Grid>
    </Grid>
  );
};

export default CategoryProductContainer;
