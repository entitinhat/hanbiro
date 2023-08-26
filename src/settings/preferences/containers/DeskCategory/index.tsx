import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

// menu
import NoData from '@base/components/@hanbiro/NoData';
import { PRIORITY_MEDIUM } from '@base/config/constant';
import { generateUUID } from '@base/utils/helpers';
import { PRIORITY_LANGS } from '@settings/preferences/config/constants';
import { useQueryTicketCategories } from '@settings/preferences/hooks/desk/categories/useQueryTicketCategory';
import { useTicketCategoryMutation } from '@settings/preferences/hooks/desk/categories/useTicketCategoryMutation';
import { TicketCategory, TicketCategoryRule } from '@settings/preferences/types/desk/ticketCategory';
import CategoryItem from './CategoryItem';

// thirty component
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';

interface IDeskCategoriesProps {}

const DeskCategories = (props: IDeskCategoriesProps) => {
  // theme
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [openEdit, setOpenEdit] = useState(false);

  // get data categories
  const { data, isLoading, refetch } = useQueryTicketCategories('');

  // mutation
  const { mAddCate, mUpdateCate, mDeleteCate, mAddRule, mUpdateRule, mUpdateCate2, mDeleteRule } = useTicketCategoryMutation();

  // handler
  const handleAddCategory = () => {
    const newCate: TicketCategory = {
      id: '',
      name: '',
      rules: [
        {
          id: '',
          isAllProducts: false,
          products: [
            {
              id: '',
              name: ''
            }
          ],
          priority: {
            keyName: PRIORITY_MEDIUM,
            languageKey: PRIORITY_LANGS[PRIORITY_MEDIUM]
          },
          averageTimeResolve: {
            duration: 3600,
            durationUnit: 'UNIT_HOUR'
          }
        }
      ]
    };
    const nItems = [newCate, ...categories];
    setCategories(nItems);
    setOpenEdit(true);
  };

  const handleChangeCateName = (nCateName: string, category: TicketCategory, cateIdx: number): any => {
    if (nCateName === '' || nCateName === category.name) {
      return;
    }
    let nCate: TicketCategory = {
      ...category,
      name: nCateName
    };
    if (category.id && category.id !== '') {
      // do update
      const upCate = {
        id: category.id,
        name: nCateName
      };
      mUpdateCate.mutate(
        { category: upCate },
        {
          onSuccess: () => {
            updateCateLocal(nCate, cateIdx);
          }
        }
      );
    } else {
      // do create
      nCate.id = generateUUID();
      // update id for rule
      const nRules = nCate.rules.map((rule) => {
        if (rule.id === '') {
          return {
            ...rule,
            id: generateUUID()
          };
        }
        return rule;
      });
      nCate.rules = nRules;
      mAddCate.mutate(
        { category: nCate },
        {
          onSuccess: () => {
            updateCateLocal(nCate, cateIdx);
          }
        }
      );
    }
  };

  const handleAddRule = (id: string) => {
    const newItems: TicketCategory[] = categories.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          rules: [
            ...item.rules,
            {
              id: '',
              isAllProducts: false,
              products: [],
              priority: {
                keyName: PRIORITY_MEDIUM,
                languageKey: PRIORITY_LANGS[PRIORITY_MEDIUM]
              },
              averageTimeResolve: {
                duration: 3600,
                durationUnit: 'UNIT_HOUR'
              }
            }
          ]
        };
      }
      return item;
    });
    setCategories(newItems);
  };

  const handleDeleteCategory = (id: string) => {
    const newCates: TicketCategory[] = categories.filter((item) => {
      return item.id !== id;
    });
    mDeleteCate.mutate(
      { ids: [id] },
      {
        onSuccess: () => {
          setCategories(newCates);
        }
      }
    );
  };

  const deleteRuleLocal = (cateIdx: number, ruleIdx: number) => {
    const newCate: TicketCategory[] = categories.map((item, idx) => {
      if (idx === cateIdx) {
        const newRules: any = item.rules.filter((rule, rIdx) => {
          return rIdx !== ruleIdx;
        });

        return {
          ...item,
          rules: newRules
        };
      }
      return item;
    });
    setCategories(newCate);
  };

  const handleDeleteRule = (id: string, ruleId: string, cateIdx: number, ruleIdx: number) => {
    if (id === '') {
      // delete rule local
      deleteRuleLocal(cateIdx, ruleIdx);
    } else {
      // remove server
      if (ruleId === '') {
        // remove local
        deleteRuleLocal(cateIdx, ruleIdx);
      } else {
        mDeleteRule.mutate(
          {
            id,
            ruleId
          },
          {
            onSuccess: () => {
              deleteRuleLocal(cateIdx, ruleIdx);
            }
          }
        );
      }
    }
  };

  const updateCateLocal = (nCate: TicketCategory, cateIdx: number) => {
    const nItems = categories.map((item, idx) => {
      if (idx === cateIdx) {
        return nCate;
      }
      return item;
    });
    setCategories(nItems);
  };

  const updateRuleLocal = (row: TicketCategory, nRule: TicketCategoryRule, itemIdx: number, ruleIdx: number) => {
    const nItems = categories.map((item, idx) => {
      if (idx === itemIdx) {
        const nRules = row.rules.map((rule, rIdx) => {
          if (rIdx === ruleIdx) {
            if (nRule.isAllProducts) {
              return {
                ...nRule,
                products: [
                  {
                    label: 'All',
                    value: 'all',
                    id: 'all',
                    name: 'All'
                  }
                ]
              };
            } else if (!nRule.isAllProducts && nRule.products) {
              const nProducts = nRule.products.map((prod) => {
                return {
                  ...prod,
                  value: prod.id,
                  label: prod.name
                };
              });
              return {
                ...nRule,
                products: nProducts
              };
            }
            return nRule;
          }
          return rule;
        });
        return {
          ...item,
          rules: nRules
        };
      }
      return item;
    });
    setCategories(nItems);
  };

  const onChangeRule = (nRule: TicketCategoryRule, category: TicketCategory, cateIdx: number, ruleIdx: number) => {
    // format products
    const nProducts = nRule.isAllProducts
      ? []
      : nRule.products?.map((prod) => {
          return {
            id: prod.id,
            name: prod.name
          };
        });
    nRule.products = nProducts;

    if (category.id && category.id !== '') {
      // do update
      if (nRule.id && nRule.id !== '') {
        // update rule
        const params = {
          id: category.id,
          rule: nRule
        };
        mUpdateRule.mutate(params, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['desk_ticketCategories', ''] });
          }
        });
      } else {
        // create rule
        nRule.id = generateUUID();
        const params = {
          id: category.id,
          rule: nRule
        };
        mAddRule.mutate(params);
      }
    }
    // do update rules to local
    updateRuleLocal(category, nRule, cateIdx, ruleIdx);
  };

  useEffect(() => {
    if ((mUpdateCate.isSuccess && mUpdateRule.isSuccess) || (mAddCate.isSuccess && mAddRule.isSuccess)) {
      refetch && refetch();
    }
  }, [mUpdateCate, mUpdateRule]);

  const onChangeCateNameAndRule = (
    nCateName: string,
    category: TicketCategory,
    nRule: TicketCategoryRule,
    cateIdx: number,
    ruleIdx: number
  ) => {
    // format products
    const nProducts = nRule.isAllProducts
      ? []
      : nRule.products?.map((prod) => {
          return {
            id: prod.id,
            name: prod.name
          };
        });
    nRule.products = nProducts;

    let nCate: TicketCategory = {
      ...category,
      name: nCateName
    };

    if (category.id && category.id !== '') {
      // do update
      const upCate = {
        id: category.id,
        name: nCateName
      };
      mUpdateCate2.mutate(
        { id: category.id, rule: nRule, category: upCate },
        {
          onSuccess: () => {
            updateCateLocal(nCate, cateIdx);
            queryClient.invalidateQueries({ queryKey: ['desk_ticketCategories', ''] });
          }
        }
      );
    } else {
      // do create
      nCate.id = generateUUID();
      // update id for rule
      const nRules = nCate.rules.map((rule) => {
        if (rule.id === '') {
          return {
            ...rule,
            id: generateUUID(),
            products: nRule.products,
            isAllProducts: nRule.isAllProducts,
            priority: nRule.priority,
            averageTimeResolve: nRule.averageTimeResolve
          };
        }
        return rule;
      });

      nCate.rules = nRules;
      mAddCate.mutate(
        { category: nCate },
        {
          onSuccess: () => {
            updateCateLocal(nCate, cateIdx);
          }
        }
      );
    }
    // do update rules to local
    updateRuleLocal(category, nRule, cateIdx, ruleIdx);
  };

  const handleCancelCategory = (cateIdx: number) => {
    const newArray = [...categories];
    newArray.splice(cateIdx, 1);
    setCategories(newArray);
  };

  const handleCancelRule = (id: string, ruleId: string, cateIdx: number, ruleIdx: number) => {
    const newData = [...categories];
    newData[cateIdx].rules.splice(ruleIdx, 1);
    setCategories(newData);
  };

  const handleSetCategories = (type: string, nData: any, category: TicketCategory, rule: any, cateIdx: number, ruleIdx: number) => {
    switch (type) {
      case 'addRule':
        handleAddRule(category.id);
        break;
      case 'updateRule':
        onChangeRule(nData, category, cateIdx, ruleIdx);
        break;
      case 'deleteRule':
        handleDeleteRule(category.id, rule.id, cateIdx, ruleIdx);
        break;
      case 'updateCateName':
        handleChangeCateName(nData, category, cateIdx);
        break;
      case 'updateCateNameAndRule':
        onChangeCateNameAndRule(nData, category, rule, cateIdx, ruleIdx);
        break;
      case 'deleteCate':
        handleDeleteCategory(category.id);
        break;
      case 'cancelCate':
        handleCancelCategory(cateIdx);
        break;
      case 'cancelRule':
        handleCancelRule(category.id, rule.id, cateIdx, ruleIdx);
        break;
    }
  };

  useEffect(() => {
    if (!isLoading && data?.data) {
      const nCategories = data.data.map((category) => {
        const nRules = category.rules.map((rule) => {
          if (rule.isAllProducts) {
            return {
              ...rule,
              products: [
                {
                  label: 'All',
                  value: 'all',
                  id: 'all',
                  name: 'All'
                }
              ]
            };
          } else if (!rule.isAllProducts && rule.products) {
            const aProducts = rule.products.filter((prod) => {
              if (prod) {
                return true;
              }
              return false;
            });
            const nProducts = aProducts.map((prod) => {
              return {
                ...prod,
                value: prod?.id ?? '',
                label: prod?.name ?? ''
              };
            });
            return {
              ...rule,
              products: nProducts
            };
          }
          return rule;
        });
        return {
          ...category,
          rules: nRules
        };
      });
      setCategories(nCategories);
    }
  }, [data, refetch]);

  const onRefresh = () => {
    refetch();
  };

  return (
    <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <Box sx={{ padding: '20px', width: '100%', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h5">{t('ncrm_generalsetting_site_field_category')}</Typography>
      </Box>
      <Box sx={{ padding: '20px', width: '100%', height: '100%' }}>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ border: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                <TableCell style={{ width: '25%', textTransform: 'capitalize', fontWeight: 'normal', fontSize: '0.95rem' }}>
                  {t('ncrm_generalsetting_preferences_desk_issue')}
                </TableCell>
                <TableCell style={{ width: '25%', textTransform: 'capitalize', fontWeight: 'normal', fontSize: '0.95rem' }}>
                  {t('ncrm_generalsetting_preferences_product')}
                </TableCell>
                <TableCell style={{ width: '25%', textTransform: 'capitalize', fontWeight: 'normal', fontSize: '0.95rem' }}>
                  {t('ncrm_generalsetting_preferences_desk_priority')}
                </TableCell>
                <TableCell style={{ width: '25%', textTransform: 'capitalize', fontWeight: 'normal', fontSize: '0.95rem' }}>
                  {t('ncrm_generalsetting_preferences_desk_average_time_to_resolve')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <CircularProgress size="1,5rem" />
                  </TableCell>
                </TableRow>
              ) : (
                categories?.map((category, cateIdx) => {
                  return (
                    <CategoryItem
                      category={category}
                      cateIdx={cateIdx}
                      key={`${category.id}-${cateIdx}`}
                      setCategories={(
                        type: string,
                        nData: any = undefined,
                        category: any = undefined,
                        rule: any = undefined,
                        cateIdx: number = 0,
                        ruleIdx: number = 0
                      ) => handleSetCategories(type, nData, category, rule, cateIdx, ruleIdx)}
                      openEdit={openEdit}
                    />
                  );
                })
              )}
              {!isLoading && categories?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <NoData label={t('ncrm_common_no_data') as string} />
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ pt: '20px', width: '100%', borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button
            sx={{ height: '35px', marginRight: '10px' }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              handleAddCategory();
            }}
          >
            {t('ncrm_generalsetting_personalize_add_another_line')}
          </Button>

          {/* <Tooltip title={t('ncrm_common_btn_refresh')}>
          <IconButton
            variant="outlined"
            color="secondary"
            sx={{
              width: '38px',
              borderColor: theme.palette.divider,
              '&:hover': {
                backgroundColor: theme.palette.secondary.lighter,
                borderColor: theme.palette.secondary.light
              }
            }}
            onClick={onRefresh}
          >
            <Sync fontSize="small" />
          </IconButton>
        </Tooltip> */}
        </Box>
      </Box>
    </Box>
  );
};

export default DeskCategories;
