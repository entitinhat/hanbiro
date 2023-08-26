import Icon from '@base/assets/icons/svg-icons';
import { viewDataByMenuAtom } from '@base/store/atoms/view';
import { getFieldLayoutDataByKeyNames } from '@base/utils/helpers/pageLayoutUtils';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { DislikeOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons';
import { PageLayoutData } from '@base/types/pagelayout';
import { useTranslation } from 'react-i18next';

const mediaBodyWidth = {
  maxWidth: 'calc(100% - 40px)'
};
const IconHeader = styled('div')(({ theme }) => ({
  width: '40px',
  opacity: '.6',
  height: '40px',
  color: theme.palette.common.white,
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  display: 'flex',
  borderRadius: '0.25rem'
}));
const TitleHeader = styled('div')(({ theme }) => ({
  fontSize: '12px',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}));

interface KnowledgeBaseReportProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}
const KnowledgeBaseReport: React.FC<KnowledgeBaseReportProps> = (props: KnowledgeBaseReportProps) => {
  const reportKeyNames = ['viewed', 'inserted', 'helped', 'notHelped'];
  const { menuSource, menuSourceId, layoutData } = props;
  const { t } = useTranslation();
  let viewed = 0,
    inserted = 0,
    helped = 0,
    notHelped = 0;
  const fields = getFieldLayoutDataByKeyNames(layoutData, reportKeyNames);
  if (fields && fields.length) {
    fields.forEach((field: any) => {
      if (field.keyName == 'viewed') {
        viewed = field?.data ? field.data : 0;
      }
      if (field.keyName == 'inserted') {
        inserted = field?.data ? field.data : 0;
      }
      if (field.keyName == 'helped') {
        helped = field?.data ? field.data : 0;
      }
      if (field.keyName == 'notHelped') {
        notHelped = field?.data ? field.data : 0;
      }
    });
  }

  const theme = useTheme();
  return (
    <Grid sx={{ padding: '15px' }}>
      <Grid sx={{ marginLeft: '-5px', marginRight: '-5px', display: 'flex', flexWrap: 'wrap' }}>
        <Grid sx={{ flex: '0 0 50%', maxWidth: '50%' }}>
          <Grid sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
            <IconHeader sx={{ backgroundColor: theme.palette.grey[500] }}>
              <EyeOutlined style={{ fontSize: '24px' }} />
            </IconHeader>
            <Box sx={{ media: 'body', marginLeft: '10px', ...mediaBodyWidth }}>
              <TitleHeader
                sx={{
                  color: theme.palette.grey[500]
                }}
              >
                {t('ncrm_desk_knowledge_base_report_viewed')}
              </TitleHeader>
              <Typography
                sx={{
                  text: 'semibold',
                  fontSize: '20px',
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {viewed}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid sx={{ flex: '0 0 50%', maxWidth: '50%' }}>
          <Grid sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
            <IconHeader sx={{ backgroundColor: theme.palette.info.main }}>{Icon('ticket')}</IconHeader>
            <Box sx={{ media: 'body', marginLeft: '10px', ...mediaBodyWidth }}>
              <TitleHeader sx={{ color: theme.palette.info.main }}>{t('ncrm_desk_knowledge_base_report_inserted')}</TitleHeader>
              <Typography
                sx={{
                  text: 'semibold',
                  fontSize: '20px',
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {inserted}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid sx={{ flex: '0 0 50%', maxWidth: '50%' }}>
          <Grid sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
            <IconHeader sx={{ backgroundColor: theme.palette.success.main }}>
              <LikeOutlined style={{ fontSize: '24px' }} />
            </IconHeader>
            <Box sx={{ media: 'body', marginLeft: '10px', ...mediaBodyWidth }}>
              <TitleHeader sx={{ color: theme.palette.success.main }}>{t('ncrm_desk_knowledge_base_report_helpful')}</TitleHeader>
              <Typography
                sx={{
                  text: 'semibold',
                  fontSize: '20px',
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {helped}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid sx={{ flex: '0 0 50%', maxWidth: '50%' }}>
          <Grid sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
            <IconHeader sx={{ backgroundColor: theme.palette.error.main }}>
              <DislikeOutlined style={{ fontSize: '24px' }} />
            </IconHeader>
            <Box sx={{ media: 'body', marginLeft: '10px', ...mediaBodyWidth }}>
              <Typography
                sx={{
                  color: theme.palette.error.main
                }}
              >
                {t('ncrm_desk_knowledge_base_report_not_helpful')}
              </Typography>
              <Typography
                sx={{
                  text: 'semibold',
                  fontSize: '20px',
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {notHelped}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default KnowledgeBaseReport;
