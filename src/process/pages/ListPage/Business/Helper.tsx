import React, { useMemo } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { t } from 'i18next';

import IconButton from '@base/components/@extended/IconButton';
import { LabelValue, SearchFilter } from '@base/types/app';
import { IdName, OptionValue } from '@base/types/common';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { CloseOutlined, ModeEdit } from '@mui/icons-material';
import { Chip, Stack, Typography } from '@mui/material';
import * as keyNames from '@process/config/keyNames';
import { dateByOptions, groupByOptions, searchFields } from '@process/config/list-field/options';
import { MODULE_OPTIONS } from '@process/config/constants'
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

export const fields: OptionValue[] = [
  {
    keyName: keyNames.KEY_NAME_BUSINESS_MODULE,
    languageKey: 'process_business_module'
  },
  {
    keyName: keyNames.KEY_NAME_BUSINESS_NAME,
    languageKey: 'process_business_name'
  },
  {
    keyName: keyNames.KEY_NAME_BUSINESS_STEP,
    languageKey: 'process_business_step'
  },
  {
    keyName: keyNames.KEY_NAME_BUSINESS_RULE_CRITERIA,
    languageKey: 'process_business_rule_criteria'
  },
  {
    keyName: keyNames.KEY_NAME_BUSINESS_PRODUCT,
    languageKey: 'process_business_product'
  },
  {
    keyName: keyNames.KEY_NAME_BUSINESS_CREATED_AT,
    languageKey: 'process_business_createdat'
  },
  {
    keyName: keyNames.KEY_NAME_BUSINESS_MODE,
    languageKey: 'process_business_mode'
  }
];

export const columnRenderRemap = (EditFn?: (data: any) => void, DeleteFn?: (id: string) => void) => {
  return {
    name(col: string, data: any) {
      const name = data[col] ? data[col] : '';
      const id = data.id ? data.id : '';
      const url = `/process/business/${id}`;
      return (
        <RouteLink to={url} style={{ textDecoration: 'none' }}>
          <Typography noWrap color="grey.700">
            {name}
          </Typography>
        </RouteLink>
      );
    },
    createdAt(col: string, data: any) {
      const createdAt = data[col] ? data[col] : '';
      return convertDateTimeServerToClient({ date: createdAt, isTime: false });
    },
    module(col: string, data: any) {
      const module = data[col] ? data[col] : null;
      return t(MODULE_OPTIONS.find(item => item.keyName == module)?.languageKey || '');
    },
    step(col: string, data: any) {
      const step = data[col] ? data[col] : null;
      return step;
    },
    ruleCriteria(col: string, data: any) {
      const ruleCriteria = data[col] ? data[col] : null;
      return ruleCriteria;
    },
    products(col: string, data: any) {
      const products = data[col] ? data[col] : null;
      console.log("product", products)
      // return (
      //   products &&
      //   products.map((v: IdName) => {
      //     return <Chip key={v.id} sx={{mr: 0.5}} size="small" color="secondary" variant="combined" label={v.name} />;
      //   })
      // );
      return products && (
        <ListTableCellDroplist showAvatar={false} values={products} />
      ) // update viewList using Droplist replace for Chip
    },
    mode(col: string, data: any) {
      // edit / delete
      return (
        <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="center">
          <IconButton size="small" color="secondary" onClick={() => EditFn && EditFn(data)}>
            <ModeEdit sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" color="secondary" onClick={() => DeleteFn && DeleteFn(data.id)}>
            <CloseOutlined sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      );
    }
  };
};

export const getQuery = (filter: SearchFilter | undefined) => {
  // filters query
  const groupBy = filter?.headerFilters?.groupBy;
  const groupByValue = useMemo(() => groupByOptions?.find((v: LabelValue) => v.value === groupBy), [groupBy]);

  const query = useMemo(() => {
    let queries: string[] = [];
    Object.keys(filter?.headerFilters).forEach((key) => {
      const value = filter?.headerFilters[key];
      const isDateTime = dateByOptions?.findIndex((v: LabelValue) => v.value === key) > -1;
      if (isDateTime) {
      }
    });

    // search query
    if (filter?.keyword != '') {
      if (searchFields?.length > 0) {
        const orQueries = searchFields?.map((field: LabelValue) => {
          return [field?.value, ':', '"' + filter?.keyword + '"'].join('');
        });
        queries.push('{' + orQueries.join(' ') + '}');
      }
    }

    if (queries?.length) {
      return '(' + queries.join(' ') + ')';
    }
    return '';
  }, [filter]);

  console.log('query', query);

  return query;
};
