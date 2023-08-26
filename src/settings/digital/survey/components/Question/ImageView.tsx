import IconButton from '@base/components/@extended/IconButton';
import ImagePreview from '@base/components/@hanbiro/ImagePreview';
import { MoreVertOutlined } from '@mui/icons-material';
import { Box, Fade, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

//src={URL.createObjectURL(imageQ.url)}

const ImageView = (props: any) => {
  const { focusS, focusQ, keyS, keyQ, imageQ, onRemoveQImage } = props;
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //render
  return (
    <Box sx={{ position: 'relative', p: 1.5 }}>
      <ImagePreview image={imageQ.url instanceof File ? URL.createObjectURL(imageQ.url) : imageQ.url} />
      <Box sx={{ position: 'absolute', top: '24px', left: '32px' }}>
        <IconButton edge="end" aria-label="comments" shape="rounded" color="secondary" onClick={handleMenuClick}>
          <MoreVertOutlined />
        </IconButton>
      </Box>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={onRemoveQImage}>Remove</MenuItem>
      </Menu>
    </Box>
  );
};

export default ImageView;
