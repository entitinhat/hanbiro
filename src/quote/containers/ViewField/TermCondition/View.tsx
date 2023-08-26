import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import * as keyNames from '@quote/config/keyNames';
import { default as TextView } from '@base/containers/ViewField/Text/View';

interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value } = props;

  const onSelectChange = () => {};

  return (
    <Stack width="100%" spacing={1}>
      <SelectBox
        disablePortal
        sx={{ maxWidth: '200px' }}
        options={[{ keyName: '', languageKey: '' }]}
        value={value[keyNames.KEY_NAME_QUOTE_TERM_CONDITION] || undefined}
        onChange={onSelectChange}
      />
      {value[keyNames.KEY_NAME_QUOTE_TERM_CONDITION_CONTENT] || value[keyNames.KEY_NAME_QUOTE_TERM_CONDITION_CONTENT] === '' ? (
        <TextView value={value[keyNames.KEY_NAME_QUOTE_TERM_CONDITION_CONTENT] || ''} />
      ) : (
        <em>(none)</em>
      )}
    </Stack>
  );
};

export default View;
