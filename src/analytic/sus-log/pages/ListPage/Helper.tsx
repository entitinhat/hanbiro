import React from "react";
import {Link as RouteLink} from "react-router-dom";
import {Stack, Tooltip, Typography} from '@mui/material';
import {Link, OpenInNew} from "@mui/icons-material";
import SpanLang from "@base/components/@hanbiro/SpanLang";
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import {convertDateTimeServerToClient} from '@base/utils/helpers';
import {SusLog} from '@analytic/sus-log/types/interfaces';
import {mediumOptions, sourceOptions} from "@analytic/main/config/options";

export const columnRenderRemap = (menu: string) => {
  return {
    sUrl(col: string, row: SusLog) {
      const route = `/analytic/sus-log/${row.id}`;
      return (
        <Stack direction="row">
          {
            (row?.backHalf?.domain || row?.backHalf?.pathPrefix || row?.backHalf?.urlSuffix) && (
              <Tooltip title="Back-half">
                <Link fontSize="small" sx={{mr: "2px"}}/>
              </Tooltip>
            )
          }
          <RouteLink to={route} style={{textDecoration: 'none'}}>
            <Typography color="primary" component="h6" sx={!!row?.deleted ? {textDecoration: 'line-through'} : {}}>
              {row?.sUrl ?? '-'}
            </Typography>
          </RouteLink>
          <Tooltip title="Open in new tab">
            <OpenInNew sx={{fontSize: '14px'}} onClick={() => window.open(row?.sUrl, "_blank")}/>
          </Tooltip>
        </Stack>
      );
    },
    url(col: string, row: SusLog) {
      return row?.url ?? '-';
    },
    cta(col: string, row: SusLog) {
      return row?.cta?.name ?? '-';
    },
    campaign(col: string, row: SusLog) {
      return row?.campaign?.name ?? '-';
    },
    source(col: string, row: SusLog) {
      return row?.source && sourceOptions?.[row.source] ?
        <SpanLang textOnly keyLang={sourceOptions[row.source]}/> : '-';
    },
    medium(col: string, row: SusLog) {
      return row?.medium && mediumOptions?.[row.medium] ?
        <SpanLang textOnly keyLang={mediumOptions[row.medium]}/> : '-';
    },
    customer(col: string, row: SusLog) {
      return row?.customer?.name ?? '-';
    },
    totalClick(col: string, row: SusLog) {
      return row?.totalClick ?? '0';
    },
    createdBy(col: string, row: SusLog) {
      let fUser = row.createdBy ? row.createdBy : null;
      return fUser ? (
        <Stack direction="row" alignItems="center">
          <HanAvatar size={'xs'} name={row.createdBy?.name}/> <Typography ml={1}>{row.createdBy?.name}</Typography>
        </Stack>
      ) : (
        '-'
      );
    },
    createdAt(col: string, row: SusLog) {
      return row.createdAt ? convertDateTimeServerToClient({date: '' + row.createdAt, humanize: true}) : '';
    }
  };
};
