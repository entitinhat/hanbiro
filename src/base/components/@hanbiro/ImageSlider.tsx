import { useEffect, useState } from 'react';

// material-ui
import { SxProps, useTheme } from '@mui/material/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';

// project import
import { ExpandLess, ExpandMore, ArrowRight, ArrowLeft } from '@mui/icons-material';
import ImagePreview from '@base/components/@hanbiro/ImagePreview';

// third-party
import Slider from 'react-slick';
import _ from 'lodash';
import useDevice from '@base/hooks/useDevice';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //
interface ImageSliderProps {
  images: any[];
  thumbs?: any[];
  vertical?: boolean;
  sx?: SxProps;
  onEdit?: () => void;
  allowZoom?: boolean;
  showSlider?: boolean;
  sliderHeight?: number | string; // defined height for slider
  moduleDownload?: string;
}

const ImageSlider = (props: ImageSliderProps) => {
  const {
    images = [],
    thumbs = [],
    vertical = true,
    sx,
    onEdit,
    allowZoom = true,
    showSlider = true,
    sliderHeight = 'auto',
    moduleDownload
  } = props;
  const theme = useTheme();

  const { isMobile, isDesktop } = useDevice();
  const initialImage = images.length > 0 ? images[0] : undefined;

  const [selected, setSelected] = useState(initialImage);
  const [wishlisted, setWishlisted] = useState<boolean>(false);

  useEffect(() => {
    if (images?.length && !_.isEqual(selected, images[0])) {
      setSelected(images[0]);
    }
    if (images.length <= 0) {
      setSelected(undefined);
    }
  }, [images]);

  const addToFavourite = () => {
    setWishlisted(!wishlisted);
  };

  const handleOnEdit = () => {
    onEdit && onEdit();
  };

  const lgNo = isDesktop ? 5 : 4;

  const ArrowUp = ({ currentSlide, slideCount, ...props }: any) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        // border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0,
        ...(vertical && { mb: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {vertical ? (
        <ExpandLess fontSize="small" sx={{ color: theme.palette.secondary.light }} />
      ) : (
        <ArrowLeft fontSize="medium" sx={{ color: theme.palette.secondary.light }} />
      )}
    </Box>
  );

  const ArrowDown = ({ currentSlide, slideCount, ...props }: any) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        // border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0,
        ...(vertical && { mt: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {vertical ? (
        <ExpandMore fontSize="small" sx={{ color: theme.palette.secondary.light }} />
      ) : (
        <ArrowRight fontSize="medium" sx={{ color: theme.palette.secondary.light }} />
      )}
    </Box>
  );

  const settings = {
    rows: 1,
    vertical: vertical,
    verticalSwiping: vertical,
    dots: false,
    speed: 500,
    centerMode: true,
    swipeToSlide: false,
    swipe: false,
    focusOnSelect: true,
    centerPadding: '0px',
    slidesToShow: 1,
    prevArrow: <ArrowUp />,
    nextArrow: <ArrowDown />
    // currentSlide: null,
    // slideCount: images.length > 3 ? 3 : images.length
  };

  return (
    <Box sx={{ ...sx }}>
      <Grid container spacing={0.5} sx={{ m: 0, width: '100%' }}>
        {(selected || images?.length <= 0) && !showSlider ? (
          <Grid
            sx={{ padding: `0 !important`, height: sliderHeight, width: 200 }}
            item
            xs={12}
            md={vertical ? 10 : 12}
            lg={vertical ? 9 : 12}
          >
            <ImagePreview
              image={selected}
              wishlisted={wishlisted}
              // onAddFavourite={addToFavourite}
              onEdit={onEdit}
              // allowZoom={allowZoom}
              allowZoom={false}
              moduleDownload={moduleDownload}
            />
          </Grid>
        ) : null}
        {showSlider ? (
          <Grid item xs={12} md={vertical ? 2 : 12} lg={vertical ? 3 : 12} sx={{ padding: `0 !important`, height: '100%' }}>
            <Box
              sx={{
                '& .slick-slider': {
                  display: 'flex',
                  alignItems: 'center',
                  mt: vertical ? 2 : 1,
                  '& .slick-list': {
                    width: '100%'
                  }
                },
                ...(vertical && {
                  display: 'flex',
                  height: '100%',
                  '& .slick-slider': {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 1,
                    width: 100
                  },
                  '& .slick-arrow': {
                    '&:hover': { bgcolor: theme.palette.grey.A200 },
                    position: 'initial',
                    color: theme.palette.grey[500],
                    bgcolor: theme.palette.grey.A200,
                    p: 0,
                    // transform: 'rotate(90deg)',
                    borderRadius: '50%',
                    height: 17,
                    width: 19
                  }
                }),
                '& .slick-slide': {
                  display: 'flex !important',
                  justifyContent: 'center'
                },
                '& .slick-track': {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: sliderHeight
                }
              }}
            >
              <Slider {...settings}>
                {images.map((item, index) => (
                  <Box key={index} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                    <ImagePreview
                      image={item}
                      // wishlisted={wishlisted}
                      // onAddFavourite={addToFavourite}
                      onEdit={onEdit}
                      allowZoom={allowZoom}
                      moduleDownload={moduleDownload}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
};

export default ImageSlider;
