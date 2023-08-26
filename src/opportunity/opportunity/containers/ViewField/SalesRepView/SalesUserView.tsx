import _ from 'lodash';

import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import { Chip, Stack } from '@mui/material';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { useTranslation } from 'react-i18next';
interface SalesUserViewProps {
  value?: IdName[] | IdName;
  componentProps?: {
    [x: string]: any;
  };
}

const SalesUserView = (props: SalesUserViewProps) => {
  const { value, componentProps } = props;

  const { t } = useTranslation();

  const cellComponent = (value: any) => {
    return <Chip label={value?.name} variant="combined" color="secondary" size="small" />;
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

export default SalesUserView;
