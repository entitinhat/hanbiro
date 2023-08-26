import React from 'react';
import { Badge, Card, CardActionArea, CardContent, CardMedia, Divider, Typography, useTheme } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';

import { Template } from '.';

interface ImageItemProps {
  item: Template;
  onClick: () => void;
}
const ImageItem: React.FC<ImageItemProps> = (props: ImageItemProps) => {
  const { item, onClick } = props;
  const theme = useTheme();
  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        marginBottom: '10px',
        overflow: 'visible',
        ...(item.active && {
          borderColor: 'yellowgreen'
        })
      }}
      onClick={onClick}
    >
      <Badge
        sx={{
          width: '100%',
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
            <CardContent component="div" sx={{ height: 230, overflow:'hidden' }}>
              <CardMedia component="img" sx={{ objectFit: 'cover', marginBottom: '5px' }} image={item.thumbnail} alt={item.name} />
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
  );
};

export default ImageItem;
