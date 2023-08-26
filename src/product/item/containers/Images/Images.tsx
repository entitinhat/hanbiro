import React from 'react';
import _ from 'lodash';

// third-party
import Slider from 'react-slick';

// mui
import { ChevronLeft, ChevronRight, DeleteOutline, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, styled, useMediaQuery, useTheme } from '@mui/material';

// project
import Avatar from '@base/components/@extended/Avatar';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import { IMAGE_MODULE_PRODUCT_ITEM } from '@product/main/config/constants';

interface Props {
  images?: any[];
  onDelete?: (rIndex: number) => void;
}

const ImageStyle = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  bgcolor: theme.palette.grey[0],
  border: `1px solid ${theme.palette.grey[200]}`,
  '& .Remove-cover': {
    display: 'none',
    position: 'absolute',
    background: '#101010bf',
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  '&:hover': {
    '& .Remove-cover': {
      display: 'flex'
    }
  },
  '& img': {
    objectFit: 'cover'
  }
}));

export default (props: Props) => {
  const { images, onDelete } = props;

  const theme = useTheme();
  const matchUpLG = useMediaQuery(theme.breakpoints.up('lg'));

  const vertical = false;

  const ArrowUp = (props: any) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0,
        // ...(vertical && { mb: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {vertical ? (
        <ExpandLess fontSize="small" sx={{ color: theme.palette.secondary.light }} />
      ) : (
        <ChevronLeft fontSize="small" sx={{ color: theme.palette.secondary.light }} />
      )}
    </Box>
  );

  const ArrowDown = (props: any) => (
    <Box
      {...props}
      color="secondary"
      className="prev"
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'transparent' },
        bgcolor: theme.palette.grey[0],
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        p: 0,
        // ...(vertical && { mt: 1.25 }),
        lineHeight: 0,
        '&:after': { boxShadow: 'none' }
      }}
    >
      {vertical ? (
        <ExpandMore fontSize="small" sx={{ color: theme.palette.secondary.light }} />
      ) : (
        <ChevronRight fontSize="small" sx={{ color: theme.palette.secondary.light }} />
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
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    slidesToShow: (images?.length as number) > 3 ? 3 : images?.length,
    prevArrow: <ArrowUp />,
    nextArrow: <ArrowDown />
  };

  return (
    <Box
      sx={{
        '& .slick-slider': {
          display: 'flex',
          alignItems: 'center',
          mt: vertical ? 2 : 1,
          '& .slick-list': {
            width: '100%'
          }
        }
      }}
    >
      {images?.length ? (
        <Slider {...settings}>
          {images?.map((item: any, index) => {
            return (
              <Box
                key={index}
                // onClick={() => setSelected(item)} sx={{ p: 1 }}
              >
                {!_.isString(item?.id) ? (
                  <ImageStyle size="xl" variant="rounded">
                    <Box
                      component={'img'}
                      src={window.URL.createObjectURL(item) ?? ''}
                      className="rounded"
                      alt=""
                      sx={{ width: '100%', height: '100%' }}
                    />
                    <Box className="Remove-cover">
                      <DeleteOutline
                        fontSize="small"
                        color="error"
                        onClick={() => {
                          onDelete && onDelete(index);
                        }}
                      />
                    </Box>
                  </ImageStyle>
                ) : (
                  <ImageStyle
                    size="xl"
                    // src={item?.name || ''}
                    variant="rounded"
                  >
                    <IconAvatar
                      variant="rounded"
                      id={item?.id}
                      url={item?.name}
                      alt={''}
                      size="xl"
                      moduleDownload={IMAGE_MODULE_PRODUCT_ITEM}
                    />
                    <Box className="Remove-cover">
                      <DeleteOutline
                        fontSize="small"
                        color="error"
                        onClick={() => {
                          onDelete && onDelete(index);
                        }}
                      />
                    </Box>
                  </ImageStyle>
                )}
              </Box>
            );
          })}
        </Slider>
      ) : null}
    </Box>
  );
};
