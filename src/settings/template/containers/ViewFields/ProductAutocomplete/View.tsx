import { useTranslation } from 'react-i18next';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';
import { Stack, Chip } from '@mui/material';

interface ViewProps extends CommonViewProps {
  value: IdName[];
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value } = props;
  // get field attrs
  const empltyString = '-  - - - '
  return (
    <Stack direction={'row'} spacing={0.5}>
      {Array.isArray(value) ? value.map((_tag: IdName) => {
        if(_tag == null) return empltyString
        else return <Chip key={_tag?.id} label={_tag?.name} />
      } ) : <Chip  label='all' />}
    </Stack>
  );
};

export default View;
