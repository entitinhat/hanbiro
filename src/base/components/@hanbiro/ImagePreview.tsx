import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardMedia, Stack } from '@mui/material';

// project import
//import Avatar from '@base/components/@extended/Avatar';
import IconButton from '@base/components/@extended/IconButton';
import MainCard from '@base/components/App/MainCard';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

// third-party
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Edit, Favorite, FavoriteBorderOutlined, RestartAltOutlined, ZoomInOutlined, ZoomOutOutlined } from '@mui/icons-material';

//asset
import notFoundImg from '@base/assets/images/commerce/notfound.png';

interface ImagePreviewProps {
  allowZoom?: boolean;
  image: any;
  wishlisted?: boolean;
  onAddFavourite?: () => void;
  onEdit?: () => void;
  moduleDownload?: string;
}

const ImagePreview = (props: ImagePreviewProps) => {
  const { image, wishlisted, onAddFavourite, onEdit, allowZoom = true, moduleDownload } = props;
  const theme = useTheme();

  return (
    <MainCard
      content={false}
      border={false}
      boxShadow={false}
      shadow={false}
      sx={{
        m: '0 auto',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.50' : 'secondary.lighter',
        '& .react-transform-wrapper': { cursor: 'crosshair', height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }, // fixed image UI
        '& .react-transform-component': { height: '100%', flexWrap: 'nowrap' }
      }}
    >
      {allowZoom ? (
        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <TransformComponent>
                {image?.id && image?.name ? (
                  <CardMedia
                    sx={{ borderRadius: `4px`, position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}
                    title="Scroll Zoom"
                  >
                    <IconAvatar
                      showType="image"
                      variant="rounded"
                      id={image?.id}
                      url={image?.name}
                      alt={''}
                      size="xl"
                      sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      moduleDownload={moduleDownload}
                    />
                    {/* <img src={`data:${images}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> */}
                  </CardMedia>
                ) : (
                  <CardMedia
                    component="img"
                    image={notFoundImg}
                    title="Scroll Zoom"
                    sx={{
                      height: '100% !important',
                      borderRadius: `4px`,
                      position: 'relative',
                      objectFit: 'contain',
                      '& .MuiCardMedia-root': {
                        objectFit: 'contain'
                      }
                    }}
                  />
                )}
              </TransformComponent>
              <Stack direction="row" className="tools" sx={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}>
                <IconButton color="secondary" onClick={() => zoomIn()}>
                  <ZoomInOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
                <IconButton color="secondary" onClick={() => zoomOut()}>
                  <ZoomOutOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
                <IconButton color="secondary" onClick={() => resetTransform()}>
                  <RestartAltOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Stack>
            </>
          )}
        </TransformWrapper>
      ) : (
        <>
          {image?.id && image?.name ? (
            <CardMedia
              sx={{ borderRadius: `4px`, position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}
              title="Scroll Zoom"
            >
              <IconAvatar
                showType="image"
                variant="rounded"
                id={image?.id}
                url={image?.name}
                alt={''}
                size="xl"
                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                moduleDownload={moduleDownload}
              />
              {/* <img src={image?.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> */}
            </CardMedia>
          ) : (
            <CardMedia component="img" image={notFoundImg} title="Scroll Zoom" sx={{ borderRadius: `4px`, position: 'relative' }} />
          )}
        </>
      )}

      {onAddFavourite && (
        <IconButton
          color="secondary"
          sx={{ ml: 'auto', position: 'absolute', top: 5, right: 5, '&:hover': { background: 'transparent' } }}
          onClick={onAddFavourite}
        >
          {wishlisted ? (
            <Favorite style={{ fontSize: '1.15rem', color: theme.palette.error.main }} />
          ) : (
            <FavoriteBorderOutlined style={{ fontSize: '1.15rem' }} />
          )}
        </IconButton>
      )}
      {onEdit && (
        <IconButton
          // color="secondary"
          sx={{ ml: 'auto', position: 'absolute', top: 5, right: onAddFavourite ? 35 : 5, '&:hover': { background: 'transparent' } }}
          onClick={onEdit}
        >
          <Edit style={{ fontSize: '1.15rem' }} fontSize="small" />
        </IconButton>
      )}
    </MainCard>
  );
};

export default ImagePreview;
