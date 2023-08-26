import _ from 'lodash';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import { Chip, Stack, Typography } from '@mui/material';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { useTranslation } from 'react-i18next';
interface Props extends CommonViewProps {
  value: IdName[] | IdName;
}

const View = (props: Props) => {
  const { value, componentProps } = props;

  const { t } = useTranslation();
  console.log(`~~~~ componentProps`, componentProps);
  const cellComponent = (value: any) => {
    return componentProps?.disableChip ? (
      <Typography> {value?.name}</Typography>
    ) : (
      <Chip label={value?.name} variant="combined" color="secondary" size="small" />
    );
  };

  return (
    <>
      <Stack spacing={1} direction="row" alignItems="center">
        {value && _.isArray(value) ? (
          <ListTableCellDroplist values={value} cellComponent={cellComponent} />
        ) : value?.name ? (
          <Chip label={value?.name} variant="combined" color="secondary" size="small" />
        ) : (
          ''
        )}
      </Stack>
    </>
  );
};

export default View;
