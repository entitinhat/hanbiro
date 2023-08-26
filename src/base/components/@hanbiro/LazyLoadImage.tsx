import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';

interface LazyLoadImageProps {
  url: string; //big image
  thumb: string; //small image
}

let listenerCallbacks = new WeakMap();

let observer: any;

function handleIntersections(entries: any) {
  entries.forEach((entry: any) => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: 0.15
    });
  }
  return observer;
}

function useIntersection(elem: any, callback: any) {
  useEffect(() => {
    let target = elem.current;
    let observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = (props) => {
  const { url, thumb } = props;
  //state
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<any>(null);
  const theme = useTheme();

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  //// console.log('url', url);
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.grey[400],
        overflow: 'hidden',
        position: 'relative',
        maxWidth: '800px',
        width: '100%',
        paddingBottom: '100%',
        borderRadius: '.25rem !important'
      }}
      ref={imgRef}
    >
      {isInView && (
        <>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              opacity: !!isLoaded ? 0 : 1,
              filter: 'blur(10px)',
              transition: 'opacity 1s ease-out'
            }}
            src={thumb}
          />
          {!isLoaded && (
            <Box sx={{ position: 'absolute', top: '45%', left: '40%' }}>
              <CircularProgress />
            </Box>
          )}
          <Box
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              transition: 'opacity 1s ease-out',
              opacity: !!isLoaded ? 1 : 0
            }}
            src={url}
            onLoad={handleOnLoad}
          />
        </>
      )}
    </Box>
  );
};

export default LazyLoadImage;
