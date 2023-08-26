import { ArrowLeft } from 'react-feather';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, IconButton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import RawHTML from '@base/components/@hanbiro/RawHTML';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { KB_QUICK_VIEW_SCHEMA } from '@desk/knowledge-base/services/graphql';
import { useKnowledgeBase } from '@desk/knowledge-base/hooks/useKnowledgeBase';
import { useTranslation } from 'react-i18next';

interface KBQuickViewProps {
  id: string;
  onClose?: () => void;
  onInsert?: (item: KnowledgeBase) => void;
  isInsert?: boolean;
}

const KBQuickView = (props: KBQuickViewProps) => {
  const { id, onClose, onInsert, isInsert = true } = props;
  //get data
  const { data, isFetching } = useKnowledgeBase(KB_QUICK_VIEW_SCHEMA, id);
  const { t } = useTranslation();
  return (
    <>
      {isFetching ? (
        <CircularProgress size="small" />
      ) : (
        <Stack direction="column" spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton aria-label="목록 보기" onClick={onClose}>
              <ArrowLeft />
            </IconButton>
            <Button
              size="small"
              disabled={!isInsert}
              sx={{ marginLeft: 'auto' }}
              variant="contained"
              color="primary"
              onClick={() => {
                if (data) onInsert && onInsert(data);
              }}
            >
              {t('ncrm_desk_ticket_insert')}
            </Button>
          </Box>
          <Card>
            <CardHeader
              title={<Typography sx={{ fontSize: '16px' }}>{data?.subject}</Typography>}
              subheader={
                <Typography sx={{ fontSize: '13px', color: grey[700] }}>
                  {convertDateTimeServerToClient({ date: data?.createdAt })} created by {data?.createdBy?.name}
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <RawHTML>{data?.content}</RawHTML>
            </CardContent>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default KBQuickView;
