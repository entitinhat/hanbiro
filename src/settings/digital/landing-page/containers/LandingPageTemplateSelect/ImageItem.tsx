import { useContext, useEffect, useState } from 'react';
import { Badge, Card, CardActionArea, CardContent, CardMedia, Divider, Typography, useTheme } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

import { useStorageDownloadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import _ from 'lodash';
import { getGeneratedPageURL } from '@settings/digital/utils';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { Template } from '.';
import { HTMLContext } from '../WriteFields';

interface ImageItemProps {
  item: Template;
  onSelect: (item: Template) => void;
  onUpdate: (item: Template) => void;
}

const ImageItem = (props: ImageItemProps) => {
  const { item, onSelect, onUpdate } = props;
  const theme = useTheme();
  const [templateData, setTemplateData] = useState<null | Template>(null);
  const htmlContext = useContext(HTMLContext);

  const mStorageDownload: any = useStorageDownloadMutation<BaseMutationResponse>({
    onSuccess: (data: any, variables: any, context: any) => {
      const html = (JSON.parse(data).Html ?? JSON.parse(data).html) as string;
      const css = (JSON.parse(data).Css ?? JSON.parse(data).css) as string;
      const thumbnail = getGeneratedPageURL({ html, css });
      htmlContext.changeHtmlSource({ [variables.filename]: data });
      setTemplateData({ ...item, htmlData: data, thumbnail });
      // onUpdate({ ...item, htmlData: data, thumbnail });
    },
    onError: (error: any, variables: any, context: any) => {
      console.log('There is an error during uploading: ' + JSON.parse(error).message);
    }
  });

  useEffect(() => {
    if (item && JSON.stringify(item) !== JSON.stringify(templateData)) {
      if (templateData) {
        setTemplateData({ ...templateData, active: item.active });
      } else {
        const htmlKey = item.html;
        setTemplateData(item);
        if (htmlContext.htmlSource && _.has(htmlContext.htmlSource, htmlKey) && item.id !== '') {
          const htmlData = htmlContext.htmlSource[htmlKey];
          const html = (JSON.parse(htmlData).Html ?? JSON.parse(htmlData).html) as string;
          const css = (JSON.parse(htmlData).Css ?? JSON.parse(htmlData).css) as string;
          const thumbnail = getGeneratedPageURL({ html, css });
          setTemplateData({ ...item, htmlData, thumbnail });
        }
        if (!_.has(item, 'htmlData') && !_.has(htmlContext.htmlSource, htmlKey) && item.id !== '') {
          const params = {
            filename: htmlKey,
            module: 'landingpage'
          };
          mStorageDownload.mutate(params);
        }
      }
    }
  }, [JSON.stringify(item)]);

  return (
    <>
      <LoadingCircular loading={!templateData || mStorageDownload.isLoading} />
      {templateData && (
        <Card
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            marginBottom: '10px',
            overflow: 'visible',
            ...(templateData.active && {
              borderColor: 'yellowgreen'
            })
          }}
          onClick={() => {
            onSelect(templateData);
          }}
        >
          <Badge
            sx={{
              width: '100%',
              height: '100%',
              '&.MuiBadge-badge': {
                zIndex: '100'
              }
            }}
            component="div"
            color="success"
            badgeContent={templateData.active ? <CheckIcon sx={{ fontSize: '9px' }} htmlColor="white" /> : 0}
          >
            <CardActionArea>
              {templateData.id !== '' && templateData.thumbnail ? (
                <CardContent component="div" sx={{ height: 230, overflow: 'hidden' }}>
                  <CardMedia
                    className="scroll-box"
                    scrolling="no"
                    component="iframe"
                    sx={{ marginBottom: '5px', pointerEvents: 'none', overflow: 'hidden', minWidth: '100%', minHeight: '100%' }}
                    src={templateData.thumbnail ?? ''}
                  />
                </CardContent>
              ) : (
                <CardContent component="div" sx={{ height: 230 }} />
              )}
              <Divider />
              <Typography sx={{ padding: '10px' }} gutterBottom color="text.secondary">
                {templateData.name}
              </Typography>
            </CardActionArea>
          </Badge>
        </Card>
      )}
    </>
  );
};

export default ImageItem;
