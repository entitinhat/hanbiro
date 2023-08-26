import React from 'react';

import { IconButton, Stack, Typography } from '@mui/material';
import * as keyNames from '@base/config/keyNames';

import AutoCompleteSelectCustom from '../../components/DigitalSelect/AutoCompleteSelectCustom';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { getMapColumns as ctaGetMapColumns } from '@settings/digital/cta/pages/ListPage/Helper';
import { getMapColumns as landingGetMapColumns } from '@settings/digital/landing-page/pages/ListPage/Helper';
import { FILE_TYPE_CTA, FILE_TYPE_LANDING_PAGE, FILE_TYPE_OPTIONS } from '@quote/config/constants';
import { DeleteOutline } from '@mui/icons-material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { OptionValue } from '@base/types/common';

export const getMapColumns = () => {
  return {
    [keyNames.KEY_NAME_NAME](col: string, data: any, extra: any) {
      // console.log('columns 1: ', data?.[col]);
      if (data?.['isRowEmpty']) {
        return (
          <AutoCompleteSelectCustom
            isMulti={extra.isMulti}
            onChange={(newItemdata: any) => {
              if (data?.['isRowEmpty']) {
                extra.handleReplaceItemByRowIndex(data?.rowIdx, newItemdata);
              } else {
                extra.handleReplaceItemById(data?.file?.id, newItemdata);
              }
            }}
            handleClearRow={() => extra.handleClearRow(data?.file?.id)}
            value={data?.file?.[col]}
          />
        );
      } else {
        return <Typography>{data?.file?.[col]}</Typography>;
      }
      // }
    },
    [keyNames.KEY_NAME_TYPE](col: string, data: any, extra: any) {
      // console.log('columns 2: ', data?.[col]);
      if (data?.['isRowEmpty']) {
        return '';
      } else {
        if (data?.type) {
          // return data?.type === FILE_TYPE_CTA ? (
          //   ctaGetMapColumns()[keyNames.KEY_NAME_TYPE](col, data?.file)
          // ) : data?.type === FILE_TYPE_LANDING_PAGE ? (
          //   landingGetMapColumns('')[keyNames.KEY_NAME_TYPE](col, data?.file)
          // ) : (
          //   <Typography>{data?.[col]}</Typography>
          // );
          return FILE_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === data?.type)?.languageKey;
        } else {
          return <em>(none)</em>;
        }
      }
    },
    [keyNames.KEY_NAME_CREATED_BY](col: string, data: any, extra: any) {
      // console.log('columns 3: ', data?.[col]);
      if (data?.['isRowEmpty']) {
        return '';
      } else {
        const createdBy = data[col] ?? null;
        if (createdBy?.name) {
          return (
            <Stack spacing={1.5} direction="row" alignItems="center" display={'flex'}>
              <HanAvatar
                key={createdBy?.id}
                name={createdBy?.name || ''}
                size="sm"
                // photo={}
              />
              <Stack spacing={0}>
                <Typography variant="body1" noWrap>
                  {createdBy?.name || ''}
                </Typography>
              </Stack>
            </Stack>
          );
        } else {
          return '';
        }
      }
    },
    [keyNames.KEY_NAME_CREATED_AT](col: string, data: any, extra: any) {
      // console.log('columns 3: ', data?.[col]);
      if (data?.['isRowEmpty']) {
        return '';
      } else {
        let createdAt = data[col] ? data[col] : '';
        return convertDateTimeServerToClient({ date: createdAt, humanize: true, isTime: true });
      }
    },
    [keyNames.KEY_NAME_UPDATED_BY](col: string, data: any, extra: any) {
      // console.log('columns 4: ', data?.[col]);

      const updatedBy = data[col] ?? null;
      return (
        <Stack spacing={1.5} direction="row" alignItems="center" display={'flex'}>
          <HanAvatar
            key={updatedBy?.id}
            name={updatedBy?.name || ''}
            size="sm"
            // photo={}
          />
          <Stack spacing={0}>
            <Typography variant="body1" noWrap>
              {updatedBy?.name || ''}
            </Typography>
          </Stack>
        </Stack>
      );
    },
    [keyNames.KEY_NAME_DELETE](col: string, data: any, extra: any) {
      if (data?.['isRowEmpty']) {
        return (
          <>
            <IconButton color="primary" size="small">
              <RemoveRedEyeOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton color="error" size="small" onClick={() => extra.deleteAddRow(data.rowIdx)}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </>
        );
      } else {
        return (
          <>
            <IconButton color="primary" size="small">
              <RemoveRedEyeOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton color="error" size="small" onClick={() => extra.handleDeleteItems(data?.id, data?.file?.id)}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </>
        );
      }
    }
  };
};
