//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, Stack, Typography } from '@mui/material';
import { User } from '@base/types/user';

//local
//import { default as TextView } from '../Text/View';
import { CommonViewProps } from '../Common/interface';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

interface ViewProps extends CommonViewProps {
  value?: User | User[] | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <>
      <ListTableCellDroplist showAvatar={false} values={Array.isArray(value) ? value : [value]} />
      {/* {Array.isArray(value) ? (
        value?.length === 0 && <em>{t('ncrm_common_none')}</em>
      ) : value?.name ? (
        <Chip label={value?.name || ''} variant="combined" color="secondary" />
      ) : (
        <em>(none)</em>
      )} */}
    </>
  );
};

export default View;
