import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { AvatarGroup, Box, Card, Checkbox, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RouteName from '@base/components/@hanbiro/RouteName';
import { useTranslation } from 'react-i18next';

interface ListGridCardProps extends BaseListGridCardProps {
  data: KnowledgeBase;
  category: string;
  isSplitMode: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { data, sx, isChecked, onChecked, isSplitMode } = props;
  const { id } = data;
  let url = `/mdesk/knowledge/${data.id}`;
  const { t } = useTranslation();
  return (
    <Card elevation={0} sx={{ ...sx, minHeight: '90px' }}>
      <Stack spacing={0.8}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
            <SupportAgentIcon />
            <RouteName
              name={data?.subject}
              url={url}
              variant="body1"
              sx={{
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            />
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {data?.isPublish ? <></> : <Chip variant="outlined" color="primary" label="Draft" size="small" />}
            <Typography sx={{ display: 'inline' }}>
              <>
                {!isSplitMode ?? <>Category/Folder: </>}
                {data?.category?.name}
                {data?.folder ? `/${data?.folder?.name}` : ''}
              </>
            </Typography>
          </Stack>
          <Typography sx={{ display: 'inline' }}>
            {t('ncrm_desk_knowledge_list_grid_update')}:
            {convertDateTimeServerToClient({ date: data?.updatedAt?.toString(), humanize: true })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '36px' }}>
          <Typography sx={{ display: 'inline' }}>
            {t('ncrm_desk_knowledge_list_grid_create')}:
            {convertDateTimeServerToClient({ date: data?.createdAt?.toString(), humanize: true })}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <AvatarGroup
              max={2}
              sx={{ justifyContent: 'start', '& .MuiAvatarGroup-avatar': { width: 32, height: 32, fontSize: 'inherit' } }}
            >
              <HanAvatar
                key={data?.createdBy?.id}
                name={data?.createdBy?.name || ''}
                size="sm"
                // photo={}
              />
            </AvatarGroup>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default ListGridCard;
