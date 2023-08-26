import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { useRelatedCampaigns } from '@marketing-list/hooks/useRelatedCampaigns';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

const RelatedCampaign = () => {
  const { data } = useRelatedCampaigns();

  const mainMemo = useMemo(() => {
    return data?.data.map((v: any, i: number) => {
      return (
        <Box key={i}>
          <Stack mb={i !== data?.data.length - 1 ? 2 : 0} spacing={1}>
            <Typography color="primary">{v.campaign.name}</Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{`Member: ${v.campaign.totalMember}`}</Typography>
              <Typography>{`Used Data: ${convertDateTimeServerToClient({ date: v.lastUsedAt, isTime: false })}`}</Typography>
            </Stack>
          </Stack>
          {i !== data?.data.length - 1 && <Divider sx={{ marginLeft: -2, marginRight: -2 }} />}
        </Box>
      );
    });
  }, [data]);

  return (
    <Stack className="scroll-box" maxHeight={222} spacing={2}>
      {mainMemo}
    </Stack>
  );
};

export default RelatedCampaign;
