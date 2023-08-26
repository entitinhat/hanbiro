import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrioritySelect from '@base/containers/PrioritySelect';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import AverageTimeToResolveInputSelect from '@settings/preferences/components/AverageTimeToResolveInputSelect';
import { TicketCategory, TicketCategoryRule } from '@settings/preferences/types/desk/ticketCategory';
import { parseDurationValueToString } from '@base/utils/helpers/dateUtils';

// thirty component
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { DeleteOutline } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Box, TableCell, TableRow, TextField, Tooltip, Typography, useTheme } from '@mui/material';

interface RenderCategotyProps {
  rule: TicketCategoryRule;
  category: TicketCategory;
  ruleIdx: number;
  cateIdx: number;
  openEdit?: boolean;
  setCategories: (type: string, nData?: any, category?: TicketCategory, rule?: any, cateIdx?: number, ruleIdx?: number) => void;
}

const RuleItem = (props: RenderCategotyProps) => {
  const { rule, category, ruleIdx, cateIdx, openEdit = false, setCategories } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  const [cateName, setCateName] = useState(category.name);
  const [categoryRule, setCategoryRule] = useState(rule);
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const showLabel = true;

  useEffect(() => {
    if (category.id === '') {
      setIsEdit(openEdit);
    }
  }, [openEdit]);

  useEffect(() => {
    if (categoryRule !== rule) {
      setCategoryRule(rule);
    }
  }, [rule]);

  const unSelectProducts: string[] = [];
  category.rules.map((rule) => {
    if (rule.isAllProducts) {
      unSelectProducts.push('all');
    } else if (!rule.isAllProducts && rule.products?.length > 0) {
      rule.products.map((prod) => {
        unSelectProducts.push(prod.id);
      });
    }
  });

  useEffect(() => {
    if (!categoryRule?.products[0] || categoryRule?.products[0]?.name === '') {
      setError(true);
      setIsEdit(true);
    } else setError(false);
  }, [categoryRule]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    if (!error && cateName) {
      if (cateName !== category.name && categoryRule.products !== rule.products) {
        setCategories('updateCateNameAndRule', cateName, category, categoryRule, cateIdx, ruleIdx);
      } else {
        setCategories('updateCateName', cateName, category, {}, cateIdx);
        setCategories('updateRule', categoryRule, category, {}, cateIdx, ruleIdx);
      }
      setIsEdit(false);
    }
  };

  return (
    <TableRow
      key={`${rule.id}-${cateIdx}-${ruleIdx}`}
      sx={{
        '& .MuiTableRow-root': {
          paddingLeft: 0
        },
        '&.MuiTableRow-root:hover': {
          backgroundColor: 'transparent'
        },
        '& .MuiTableCell-root:first-of-type': {
          paddingLeft: '12px'
        }
      }}
    >
      {/* issue */}
      {ruleIdx === 0 ? (
        <TableCell rowSpan={category?.rules.length} style={{ width: '25%', verticalAlign: 'top' }}>
          {isEdit ? (
            <TextField
              error={!cateName}
              value={cateName}
              variant="outlined"
              placeholder="Type text"
              sx={{
                '& .MuiInputBase-root': { minHeight: '44px' },
                width: '100%'
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCateName(e.target.value)}
            />
          ) : category?.name ? (
            <>{category?.name}</>
          ) : (
            <em>{t('ncrm_common_none')}</em>
          )}
        </TableCell>
      ) : null}

      {/* select product */}
      <TableCell sx={{ width: '25%' }}>
        {isEdit ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              ':hover': {
                svg: {
                  visibility: 'visible'
                }
              }
            }}
          >
            <ProductAutoComplete
              placeholder={t('ncrm_generalsetting_preferences_desk_product_placeholder') as string}
              addLabel={t('ncrm_generalsetting_preferences_desk_add_new_product') as string}
              value={rule?.products}
              showAllOption={true}
              excludes={unSelectProducts}
              onChange={(nProducts: any) => {
                const allProducts = nProducts.find((prod: any) => {
                  return prod.value === 'all';
                });
                let fProducts: any[] = [];
                nProducts.map((prod: any) => {
                  if (prod.value !== 'all') {
                    fProducts.push({
                      id: prod.id,
                      name: prod.name
                    });
                  }
                });
                const nRule: TicketCategoryRule = {
                  ...categoryRule,
                  isAllProducts: allProducts ? true : false,
                  products: allProducts ? [] : fProducts
                };
                setCategoryRule(nRule);
              }}
              sx={{
                minHeight: '44px',
                flexGrow: 1,
                '& > div > div': {
                  borderRadius: error ? '5px' : undefined,
                  border: error ? `1px solid ${theme.palette.error.main}` : undefined
                }
              }}
            />
            <Tooltip title={t('ncrm_common_btn_add')} placement="right">
              <AddIcon
                sx={{
                  cursor: 'pointer',
                  fontSize: '20px',
                  ml: '10px',
                  visibility: 'hidden'
                }}
                color="primary"
                onClick={() => {
                  setCategories('addRule', {}, category);
                }}
              />
            </Tooltip>
          </Box>
        ) : rule?.products ? (
          <Box sx={{ display: 'flex' }}>
            {categoryRule?.products.map((item, index) => (
              <Typography key={index}>
                {item.name}
                {index + 1 !== rule.products.length && ','}&nbsp;
              </Typography>
            ))}
          </Box>
        ) : (
          <em></em>
        )}
      </TableCell>

      {/* select priority */}
      <TableCell sx={{ width: '25%' }}>
        {isEdit ? (
          <PrioritySelect
            value={categoryRule?.priority}
            onChange={(nPriority: any) => {
              const nRule: TicketCategoryRule = {
                ...categoryRule,
                priority: nPriority
                  ? {
                      keyName: nPriority.keyName,
                      languageKey: t(nPriority.languageKey)
                    }
                  : null
              };
              setCategoryRule(nRule);
            }}
          />
        ) : rule?.priority ? (
          <>{t(`${rule?.priority?.languageKey}`)}</>
        ) : (
          <em>{t('ncrm_common_none')}</em>
        )}
      </TableCell>

      {/* duration */}
      <TableCell sx={{ width: '25%' }}>
        {isEdit ? (
          category.id === '' ? (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ':hover': {
                  svg: {
                    visibility: 'visible'
                  }
                },
                '& > div': {
                  gap: 2,
                  flexWrap: 'nowrap'
                  // width: '300px'
                }
              }}
            >
              <AverageTimeToResolveInputSelect
                value={categoryRule?.averageTimeResolve}
                onChange={(newVal: any) => {
                  const nRule: TicketCategoryRule = {
                    ...categoryRule,
                    averageTimeResolve: newVal
                  };
                  // onChangeRule(nRule, category, cateIdx, ruleIdx);
                  // setCategories('updateRule', nRule, category, {}, cateIdx, ruleIdx);
                  setCategoryRule(nRule);
                }}
                sx={{ flexGrow: 1 }}
              />
              <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_save')} placement="top" disableInteractive>
                <SaveIcon
                  color="primary"
                  fontSize="small"
                  sx={{ cursor: 'pointer', fontSize: '18px', visibility: 'hidden', marginLeft: '12px' }}
                  onClick={handleSave}
                />
              </Tooltip>
              <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_cancel')} placement="top">
                <ClearIcon
                  sx={{
                    cursor: 'pointer',
                    fontSize: '18px',
                    my: 'auto',
                    ml: 2,
                    visibility: 'hidden',
                    strokeWidth: '2.5px'
                  }}
                  color="error"
                  onClick={() => {
                    if (category.rules?.length === 1) {
                      setCategories('cancelCate', {}, category, rule, cateIdx);
                    } else {
                      setCategories('cancelRule', {}, category, rule, cateIdx, ruleIdx);
                    }
                  }}
                />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                ':hover': {
                  svg: {
                    visibility: 'visible'
                  }
                },
                '& > div': {
                  gap: 2,
                  flexWrap: 'nowrap'
                  // width: '300px'
                }
              }}
            >
              <AverageTimeToResolveInputSelect
                value={categoryRule?.averageTimeResolve}
                onChange={(newVal: any) => {
                  const nRule: TicketCategoryRule = {
                    ...categoryRule,
                    averageTimeResolve: newVal
                  };
                  setCategoryRule(nRule);
                }}
                sx={{ flexGrow: 1 }}
              />
              <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_save')} placement="top" disableInteractive>
                <SaveIcon
                  color="primary"
                  fontSize="small"
                  sx={{ cursor: 'pointer', fontSize: '18px', visibility: 'hidden', marginLeft: '12px' }}
                  onClick={handleSave}
                />
              </Tooltip>
              <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_cancel')} placement="top">
                <ClearIcon
                  sx={{
                    cursor: 'pointer',
                    fontSize: '18px',
                    my: 'auto',
                    ml: 2,
                    visibility: 'hidden',
                    strokeWidth: '2.5px'
                  }}
                  color="error"
                  onClick={() => {
                    if (category.rules?.length === 1) {
                      setIsEdit(false);
                      setCateName(category.name);
                      setCategoryRule(rule);
                    } else {
                      if (!rule?.products[0]) {
                        setCategories('cancelRule', {}, category, rule, cateIdx, ruleIdx);
                      } else {
                        setIsEdit(false);
                        setCategoryRule(rule);
                      }
                    }
                  }}
                />
              </Tooltip>
            </Box>
          )
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              ':hover': {
                svg: {
                  visibility: 'visible'
                }
              },
              '& > div': {
                gap: 2,
                flexWrap: 'nowrap',
                width: '300px'
              }
            }}
          >
            {rule?.averageTimeResolve ? parseDurationValueToString(rule?.averageTimeResolve, showLabel) : <em>{t('ncrm_common_none')}</em>}
            <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_edit')} placement="top" disableInteractive>
                <ModeEditOutlineOutlinedIcon
                  sx={{ cursor: 'pointer', visibility: 'hidden' }}
                  color="primary"
                  fontSize="small"
                  className="item-option"
                  onClick={handleEdit}
                />
              </Tooltip>
              <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_remove')} placement="top">
                <DeleteOutline
                  sx={{
                    cursor: 'pointer',
                    fontSize: '18px',
                    my: 'auto',
                    // ml: 2,
                    visibility: 'hidden',
                    strokeWidth: '2.5px'
                  }}
                  color="error"
                  onClick={() => {
                    if (category.rules?.length === 1) {
                      // handleDeleteCategory(category.id);
                      setCategories('deleteCate', {}, category);
                    } else {
                      // handleDeleteRule(category.id, rule.id, cateIdx, ruleIdx);
                      setCategories('deleteRule', {}, category, rule, cateIdx, ruleIdx);
                    }
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RuleItem;
