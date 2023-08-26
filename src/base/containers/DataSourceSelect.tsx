import React, { useState, useEffect, useMemo, useRef } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useRecoilState } from 'recoil';

//project
import { FieldOption } from '@settings/general/types/interface';
import { useMenuTemplates } from '@settings/template/hooks/useMenuTemplates';
import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';
import { useSelectionFieldItems } from '@settings/general/hooks/useSelectionFieldItems';
import { selectionFieldsAtom } from '@base/store/atoms/app';

//material
import { useTheme } from '@mui/material/styles';
import { IconButton, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import { Clear } from '@mui/icons-material';

//setting menu
import { KEY_QUOTE_CUSTOMER_NOTE, KEY_QUOTE_TERM_CONDITION } from '@settings/preferences/pages/Quote';
import { useAllAssignmentRules } from '@settings/assignment-rule/rule/hooks/useAssignmentRuleList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       //maxWidth: 200
//     }
//   }
// };
const getMenuProps = (ref: any, theme: any) => {
  //console.log('ref.current', ref.current?.getBoundingClientRect());
  const clientRect = ref.current?.getBoundingClientRect();
  //const matchDownXL = useMediaQuery(theme.breakpoints.up('xl'));
  let mLeft = '0px';
  if (32 < clientRect?.left && clientRect?.left < 35) {
    mLeft = '17px';
  } else if (35 < clientRect?.left) {
    mLeft = '30px';
  }

  return {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: ref.current?.offsetWidth,
        //marginLeft: matchDownXL ? "30px" : "0px"
        marginLeft: mLeft
      }
    }
  };
};

interface DataSourceSelectProps {
  single?: boolean;
  isDisabled?: boolean;
  sourceKey: string; //ex: 'priority'
  sourceType: 'field' | 'setting' | 'template' | 'assignment_rule';
  sourceMenu?: string;
  value?: FieldOption;
  onChange?: (value: FieldOption | FieldOption[] | null) => void;
  keyOptionValue?: string;
  keyOptionLabel?: string;
  extraParams?: any;
  readOnly?: boolean;
}

const DataSourceSelect = (props: DataSourceSelectProps) => {
  const {
    single = true,
    isDisabled = false,
    readOnly = false,
    //placeholder = 'Select...',
    sourceKey, //ex: 'priority'
    sourceType, // ex: 'field' , 'setting'
    sourceMenu, //ex: 'price_list'
    keyOptionValue,
    keyOptionLabel,
    value,
    onChange
  } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  //state
  const [keyOptions, setKeyOptions] = useState<FieldOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const menuRef = useRef();
  const [selectionFields, setSelectionFields] = useRecoilState(selectionFieldsAtom);
  //console.log('value', value);
  //console.log('selectedOption', selectedOption);

  //config key
  // const FieldKeys: any = {
  //   contact_type: 'keyName',
  //   employee_role: 'keyName',
  //   customer_type: 'keyName',
  //   customer_category: 'keyName',
  //   ticket_status: 'keyName',
  //   ticket_categories: 'keyName'
  // };
  const keyData = keyOptionValue ? keyOptionValue : 'id'; //FieldKeys[sourceKey]

  //init rows
  useEffect(() => {
    if (single) {
      if (value && keyOptions.length > 0) {
        if (_.isString(value)) {
          if (value !== selectedOption.join(',')) {
            setSelectedOption([value]);
          }
        } else {
          if (value?.[keyData] !== selectedOption.join(',')) {
            //console.log('value?.[keyData]', value?.[keyData]);
            setSelectedOption([value?.[keyData]]);
          }
        }
      } else {
        // setSelectedOption([]);
      }
    } else {
      if (value && keyOptions.length > 0) {
        if (Array.isArray(value) && value.length > 0) {
          //2 cases: value=string[] or object[]
          let isArrayString = _.isString(value[0]);
          if (isArrayString) {
            if (value.join(',') !== selectedOption.join(',')) {
              setSelectedOption(value);
            }
          } else {
            //array object
            const valueIds: string[] = value.map((_ele: any) => _ele[keyData]);
            if (valueIds.join(',') !== selectedOption.join(',')) {
              setSelectedOption(valueIds);
            }
          }
        } else {
          setSelectedOption([]);
        }
      } else {
        // setSelectedOption([]);
      }
    }
  }, [value, keyOptions]);

  // ============= HOOK get field options ======================
  const { data: fieldsData, isFetching: isFieldLoading } = useSelectionFieldItems(
    { keyName: sourceKey },
    { enabled: sourceType === 'field' && sourceKey.length > 0 }
  );
  //console.log('fieldsData', fieldsData);

  //init states list
  useEffect(() => {
    if (fieldsData?.data) {
      setKeyOptions(fieldsData.data);
      //atom set
      setSelectionFields({ ...selectionFields, [sourceKey]: fieldsData.data });

      // //Shouldn't set default HERE: it loops --> set default option outside
      // const defaultOpt: FieldOption[] = fieldsData?.data.filter((v: FieldOption) => v.isDefault);
      // if (!value && defaultOpt.length > 0) {
      //   setSelectedOption(single ? [defaultOpt[0][keyData]] : defaultOpt.map((v) => v[keyData]));
      //   onChange && onChange(single ? defaultOpt[0] : defaultOpt);
      // }
    }
  }, [value, fieldsData]);
  // ============= END get field options ======================

  /** ======================= START setting templates ========================== */
  const { data: templatesData, isFetching: isTemplateLoading } = useMenuTemplates({ query: props?.extraParams?.query }, '', {
    enabled: sourceType === 'template'
  });
  //console.log('templatesData', templatesData);

  //init states list
  useEffect(() => {
    if (templatesData?.data) {
      const newOptions: FieldOption[] = templatesData.data.map((_ele: any) => ({
        id: _ele.id,
        languageKey: _ele.name,
        keyName: '',
        data: _ele.html ? JSON.parse(_ele.html) : ''
      }));
      setKeyOptions(newOptions);
    }
  }, [templatesData]);

  /** ======================= END setting templates ========================== */

  // ============= Menu source options ======================
  const menuParams = {
    key: sourceKey,
    menu: sourceMenu
  };
  const { data: settingData } = useMenuSetting(menuParams, { enabled: sourceType === 'setting' });
  //console.log('settingData', settingData);

  useEffect(() => {
    if (settingData && settingData?.value) {
      try {
        let newOptions = JSON.parse(settingData.value);
        //console.log('newOptions', newOptions);
        //if optionLabel is 'languageKey' --> display label by lang
        if (sourceKey === 'sla') {
          newOptions = newOptions.map((_ele: any) => ({ ..._ele, id: _ele.sla, languageKey: _ele.sla }));
        }
        if (sourceKey === KEY_QUOTE_TERM_CONDITION || sourceKey === KEY_QUOTE_CUSTOMER_NOTE) {
          newOptions = newOptions.map((_ele: any) => ({ ..._ele, languageKey: _ele.title }));
        }
        setKeyOptions(newOptions);
      } catch {
        setKeyOptions([]);
      }
    }
  }, [settingData]);
  // ============= END Menu source options ======================

  // ============= Menu source options ======================
  const assignParams = {
    filter: {
      module: sourceKey,
      active: true
    }
  };
  const { data: assignData } = useAllAssignmentRules(assignParams, { enabled: sourceType === 'assignment_rule' });
  //console.log('assignData', assignData);

  useEffect(() => {
    if (assignData?.results) {
      setKeyOptions(assignData.results);
    }
  }, [assignData]);
  // ============= END Menu source options ======================

  //option change
  const handleValueChange = (event: SelectChangeEvent<typeof selectedOption>) => {
    const {
      target: { value }
    } = event;
    const newSelectedValue: string[] = typeof value === 'string' ? value.split(',') : value;
    setSelectedOption(newSelectedValue);
    //console.log('value selected', newSelectedValue);

    //callback
    const newItems: FieldOption[] = [];
    newSelectedValue.map((_val: string) => {
      const fOption = keyOptions.find((_ele: any) => _ele[keyData] === _val);
      if (fOption) {
        newItems.push(fOption);
      }
    });
    if (newItems.length > 0) {
      onChange && onChange(single ? newItems[0] : newItems);
    } else {
      onChange && onChange(single ? null : []);
    }
  };

  //clear
  const handleClear = () => {
    setSelectedOption([]);
    //callback
    onChange && onChange(single ? null : []);
  };

  //render
  return (
    <Select
      fullWidth
      ref={menuRef}
      //displayEmpty
      readOnly={readOnly}
      disabled={isDisabled}
      inputProps={{ 'aria-label': 'data source select', ...(readOnly && { IconComponent: () => null }) }}
      multiple={!single}
      value={selectedOption.length > 0 ? selectedOption : ['']}
      onChange={handleValueChange}
      MenuProps={getMenuProps(menuRef, theme)}
      endAdornment={
        <>
          {!readOnly && !isDisabled && (
            <Tooltip title="Clear">
              <IconButton size="small" sx={{ visibility: selectedOption.length > 0 ? 'visible' : 'hidden', mr: 2 }} onClick={handleClear}>
                <Clear color="inherit" fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </>
      }
    >
      <MenuItem value="" disabled>
        <em>{t('ncrm_common_select')}</em>
      </MenuItem>
      {keyOptions.map((_option: any) => {
        return (
          <MenuItem key={_option[keyData]} value={_option[keyData]} style={{ fontWeight: theme.typography.fontWeightRegular }}>
            {keyOptionLabel ? t(_option[keyOptionLabel]) : t(_option.languageKey)}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default DataSourceSelect;
