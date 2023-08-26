import * as baseComponents from '@base/config/write-field/components';
import { FieldConfig } from '@base/types/pagelayout';
import { TextField } from '@mui/material';

const fieldsConfig = [
  {
    keyName: '등록',
    columns: 1,
    Component: TextField,
    languageKey: '등록'
  },
  {
    keyName: '법인',
    columns: 2,
    Component: TextField,
    languageKey: '법인'
  },
  {
    keyName: '대표',
    columns: 2,
    Component: TextField,
    languageKey: '대표'
  },
  {
    keyName: '사업장 소재지',
    columns: 1,
    Component: baseComponents.MuiCheckbox,
    componentProps: {
      label: '사업장 소재지'
    },
    hideTitle: true,
    languageKey: '사업장 소재지'
  },
  {
    keyName: '업태',
    columns: 2,
    Component: TextField,
    languageKey: '업태'
  },
  {
    keyName: '종목',
    columns: 2,
    Component: TextField,
    languageKey: '종목'
  }
];

export default fieldsConfig;
