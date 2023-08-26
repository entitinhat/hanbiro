import React, { useEffect, useState } from 'react';
import { Badge, Card, CardActionArea, CardContent, CardMedia, Divider, Typography, useTheme } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

import { Template } from '.';

interface ImageItemProps {
  item: Template;
  onSelect: (item: Template) => void;
}

const ImageItem = (props: ImageItemProps) => {
  const { item, onSelect } = props;
  const [templateData, setTemplateData] = useState<null | Template>(null);
  const theme = useTheme();
  useEffect(() => {
    if (item && JSON.stringify(item) !== JSON.stringify(templateData)) {
      if (templateData) {
        setTemplateData({ ...templateData, active: item.active });
      } else {
        setTemplateData(item);
      }
    }
  }, [JSON.stringify(item)]);
  return (
    <>
      {templateData && (
        <Card
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            marginBottom: '10px',
            overflow: 'visible',
            ...(item.active && {
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
            badgeContent={item.active ? <CheckIcon sx={{ fontSize: '9px' }} htmlColor="white" /> : 0}
          >
            <CardActionArea>
              {item.id !== '' ? (
                <CardContent component="div" sx={{ height: 230, overflow: 'hidden' }}>
                  {/* <CardMedia component="img" sx={{ objectFit: 'cover', marginBottom: '5px' }} image={item.thumbnail} alt={item.name} /> */}
                  <CardMedia
                    className="scroll-box"
                    scrolling="no"
                    component="iframe"
                    sx={{ marginBottom: '5px', pointerEvents: 'none', overflow: 'hidden', minWidth: '100%', minHeight: '100%' }}
                    src={item.thumbnail ?? ''}
                  />
                </CardContent>
              ) : (
                <CardContent component="div" sx={{ height: 230 }} />
              )}
              <Divider />
              <Typography sx={{ padding: '10px' }} gutterBottom color="text.secondary">
                {item.name}
              </Typography>
            </CardActionArea>
          </Badge>
        </Card>
      )}
    </>
  );
};

export default ImageItem;
