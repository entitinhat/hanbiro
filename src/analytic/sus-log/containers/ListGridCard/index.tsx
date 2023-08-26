import { Link as RouteLink } from 'react-router-dom';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import {Box, Card, Checkbox, Stack, Tooltip, Typography} from '@mui/material';
import {Link, OpenInNew, PanToolAlt} from '@mui/icons-material';
import { MENU_ANALYTIC } from '@base/config/menus';
import {SusLog} from "@analytic/sus-log/types/interfaces";
import {CATEGORY_SUS_LOG} from "@analytic/main/config";
import React from "react";

interface ListGridCardProps extends BaseListGridCardProps {
  data: SusLog;
  category: string;
  iSplitMode?: boolean;
  onShowClickTime: (data: any) => void;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, iSplitMode = false, onShowClickTime } = props;

  const { id, createdBy, totalClick, cta } = data;

  let url = `/${MENU_ANALYTIC}/${CATEGORY_SUS_LOG}/${data.id}`;

  return (
    <Card elevation={0} sx={{ ...sx, minHeight: 0 }}>
      <Stack spacing={0.8}>
        {iSplitMode ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                <Stack direction="row">
                  {
                    (data?.backHalf?.domain || data?.backHalf?.pathPrefix || data?.backHalf?.urlSuffix) && (
                      <Tooltip title="Back-half">
                        <Link fontSize="small" sx={{mr: "2px"}}/>
                      </Tooltip>
                    )
                  }
                  <RouteLink to={url} style={{textDecoration: 'none'}}>
                    <Typography color="primary" component="h6" sx={!!data?.deleted ? {textDecoration: 'line-through'} : {}}>
                      {data?.sUrl ?? '-'}
                    </Typography>
                  </RouteLink>
                  <Tooltip title="Open in new tab">
                    <OpenInNew sx={{fontSize: '14px'}} onClick={() => window.open(data?.sUrl, "_blank")}/>
                  </Tooltip>
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Stack direction="row" mr={1}>
                <Stack direction="row" mr={2} alignItems="center">
                  <HanAvatar key={createdBy.id} name={createdBy.name} size="xs" />
                  <Typography ml={1}>{createdBy.name}</Typography>
                </Stack>
                <Stack mr={2} direction="row" sx={{ marginLeft: '0px !important' }} alignItems="center">
                  {cta?.name ?? '-'}
                </Stack>
                <Stack direction="row" sx={{ marginLeft: '0px !important' }} alignItems="center" justifyContent="center" onClick={onShowClickTime}>
                  <PanToolAlt
                    fontSize="small"
                    color="secondary"
                    sx={{fontSize: '16px'}}
                  />
                  <Typography sx={{lineHeight: 0}}>{totalClick}</Typography>
                </Stack>
              </Stack>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                <Stack direction="row">
                  {
                    (data?.backHalf?.domain || data?.backHalf?.pathPrefix || data?.backHalf?.urlSuffix) && (
                      <Tooltip title="Back-half">
                        <Link fontSize="small" sx={{mr: "2px"}}/>
                      </Tooltip>
                    )
                  }
                  <RouteLink to={url} style={{textDecoration: 'none'}}>
                    <Typography color="primary" component="h6" sx={!!data?.deleted ? {textDecoration: 'line-through'} : {}}>
                      {data?.sUrl ?? '-'}
                    </Typography>
                  </RouteLink>
                  <Tooltip title="Open in new tab">
                    <OpenInNew sx={{fontSize: '14px'}} onClick={() => window.open(data?.sUrl, "_blank")}/>
                  </Tooltip>
                </Stack>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography color="secondary">
                    Created By:{' '}
                  </Typography>
                  <Stack direction="row" alignItems="center">
                    <HanAvatar key={createdBy.id} name={createdBy.name} size="xs" />
                    <Typography ml={1}>{createdBy.name}</Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography color="secondary">
                    CTA:
                  </Typography>
                  <Typography>
                    {cta?.name ?? '-'}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} onClick={onShowClickTime}>
                  <Typography color="secondary">
                    Total Click:
                  </Typography>
                  <Typography>
                    {totalClick ?? 0}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ListGridCard;
