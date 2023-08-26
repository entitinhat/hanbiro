import classNames from 'classnames';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

import { LeftCollapse, RightCollapse } from '@base/assets/icons/svg-icons';
import IconButton from '@base/components/@extended/IconButton';
import { headerHeight } from '@base/config/config';
import { Box, Grid, Stack, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import { ViewLayoutProps } from './types/interface';
import useDevice from '@base/hooks/useDevice';
import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';

const SpanIcon = styled('span')(({ theme }) => ({
  svg: {
    stroke: theme.palette.primary.main,
    stop: {
      stopColor: `${theme.palette.primary.main} !important`
    }
  }
}));

const ItemContainer = styled(Box)(({ theme }) => ({
  // flexGrow: 1,
  display: 'flex'
}));

const ViewAside = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  position: 'relative',
  transition: 'all .3s',
  '&.hidden-aside': {
    transform: `scaleX(0)`,
    minWidth: 0,
    maxWidth: 0,
    opacity: 0
  }
}));

// ========== View Layout =========
// ************ Header *************
// ************* Top ***************
// *** Left *** Center *** Right ***

const ViewLayout = (props: ViewLayoutProps) => {
  const {
    componentHeader,
    componentTop,
    componentLeft,
    componentCenter,
    componentRight,
    containerSx,
    disableCollapseLeft = false,
    extraHeight = 0
  } = props;

  const theme = useTheme();
  const { isMobile, isDesktop } = useDevice();

  const [hideAsideLeft, setHideAsideLeft] = useState(false);
  const [hideAsideRight, setHideAsideRight] = useState(false);
  const [topHeight, setTopHeight] = useState<number>(0);
  const topRef = useRef<HTMLElement>(null);

  const handleElementResized = () => {
    if (topRef?.current && topRef?.current?.offsetHeight !== topHeight) {
      setTopHeight(topRef.current.offsetHeight);
    }
  };
  const resizeObserver = new ResizeObserver(handleElementResized);

  useEffect(() => {
    if (topRef?.current) resizeObserver.observe(topRef.current);
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [topRef]);

  const GridContainer = useMemo(() => {
    return (
      <Grid
        container
        spacing={0}
        sx={{
          // p: 2,
          px: 2,
          pt: 0.5,
          pb: 2,
          display: 'flex'
        }}
      >
        {/* left */}
        {componentLeft && (
          <ViewAside
            item
            xs={12}
            md={2.5}
            sx={{
              height: isMobile ? 'inherit' : '100%',
              flexGrow: 1,
              position: 'relative',
              bgcolor: theme.palette.background.paper
              // my: matchDownSM ? 1 : 0,
              // display: hideAsideLeft ? 'none' : 'block',
              // borderRight: matchDownSM ? 'none' : `1px solid ${theme.palette.divider}`
            }}
            style={{
              transformOrigin: `left center`
            }}
            className={classNames({ 'hidden-aside': hideAsideLeft })}
          >
            <Box sx={{ height: '100%' }} className="scroll-box">
              <RetryErrorBoundary>{componentLeft}</RetryErrorBoundary>
            </Box>
          </ViewAside>
        )}
        {/* center */}
        <ViewAside
          zeroMinWidth
          item
          xs={12}
          md // auto-layout
          sx={{
            flexGrow: 1,
            position: 'relative',
            my: isMobile ? 1 : 0,
            pl: isMobile || hideAsideLeft ? 0 : 1,
            pr: isMobile || hideAsideRight || !componentRight ? 0 : 1,
            bgcolor: theme.palette.background.paper,
            height: isMobile ? 'inherit' : '100%'
          }}
        >
          {!disableCollapseLeft && (
            <>
              {componentLeft && !hideAsideLeft && !isMobile && (
                <IconButton
                  onClick={() => {
                    setHideAsideLeft(!hideAsideLeft);
                  }}
                  sx={{
                    zIndex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '-6px',
                    p: 0,
                    height: '50px',
                    width: '15px'
                  }}
                >
                  <SpanIcon>
                    <LeftCollapse />
                  </SpanIcon>
                </IconButton>
              )}
              {hideAsideLeft && !isMobile && (
                <IconButton
                  onClick={() => {
                    setHideAsideLeft(!hideAsideLeft);
                  }}
                  sx={{
                    zIndex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    p: 0,
                    height: '50px',
                    width: '15px'
                  }}
                >
                  <SpanIcon>
                    <RightCollapse />
                  </SpanIcon>
                </IconButton>
              )}
            </>
          )}
          {/* center component*/}
          {/*fix problem box hightlight in GrapesJS have wrong position when scrolling so we need add ID to parent element which has scroll action if Parent element has child is GrapesJS */}
          {componentCenter && (
            <Box
              id="view-grapes"
              className="scroll-box"
              sx={{ height: '100%', border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}
            >
              {/* <RetryErrorBoundary> */}
              {componentCenter}
              {/* </RetryErrorBoundary> */}
            </Box>
          )}

          {componentRight && !hideAsideRight && !isMobile && (
            <IconButton
              onClick={() => {
                setHideAsideRight(!hideAsideRight);
              }}
              sx={{
                zIndex: 1,
                position: 'absolute',
                top: '50%',
                right: '-6px',
                p: 0,
                height: '50px',
                width: '15px'
              }}
            >
              <SpanIcon>
                <RightCollapse />
              </SpanIcon>
            </IconButton>
          )}

          {hideAsideRight && !isMobile && (
            <IconButton
              onClick={() => {
                setHideAsideRight(!hideAsideRight);
              }}
              sx={{
                zIndex: 1,
                position: 'absolute',
                top: '50%',
                right: 0,
                p: 0,
                height: '50px',
                width: '15px'
              }}
            >
              <SpanIcon>
                <LeftCollapse />
              </SpanIcon>
            </IconButton>
          )}
        </ViewAside>
        {/* right */}
        {componentRight && (
          <ViewAside
            item
            xs={12}
            md={3.5}
            sx={{
              height: isMobile ? 'inherit' : '100%',
              flexGrow: 1,
              position: 'relative'
              // bgcolor: matchDownSM ? 'transparent': theme.palette.background.paper,
              // mb: matchDownSM ? 1 : 0,
              // display: hideAsideRight ? 'none' : 'block',
              // borderLeft: matchDownSM ? 'none' : `1px solid ${theme.palette.divider}`
            }}
            style={{
              transformOrigin: `right center`
            }}
            className={classNames({ 'hidden-aside': hideAsideRight })}
          >
            <Box sx={{ height: '100%' }} className="scroll-box">
              {componentRight}
            </Box>
          </ViewAside>
        )}
      </Grid>
    );
  }, [componentLeft, componentRight, componentCenter, hideAsideLeft, hideAsideRight, isMobile, theme]);

  const HeaderMemo = useMemo(() => {
    return <ItemContainer>{componentHeader}</ItemContainer>;
  }, [componentHeader]);

  return (
    <Suspense fallback={<></>}>
      <Stack sx={{ height: '100%', width: '100%' }} direction="column" justifyContent="flex-start" alignItems="stretch" spacing={0}>
        {/* header */}
        <RetryErrorBoundary>{HeaderMemo}</RetryErrorBoundary>

        {/* body */}
        <ItemContainer
          className={classNames({ 'scroll-box': isMobile })}
          sx={{
            flexDirection: 'column'
          }}
        >
          <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={0} sx={{ flex: 1 }}>
            {/* top */}
            {componentTop && (
              <ItemContainer ref={topRef}>
                <RetryErrorBoundary>{componentTop}</RetryErrorBoundary>
              </ItemContainer>
            )}

            {/* left | center | right */}
            <ItemContainer
              sx={{
                height: `calc(100vh - ${headerHeight * 2 + topHeight + extraHeight}px)`,
                width: '100%',
                ...containerSx
              }}
            >
              {GridContainer}
            </ItemContainer>
          </Stack>
        </ItemContainer>
      </Stack>
    </Suspense>
  );
};

export default ViewLayout;
