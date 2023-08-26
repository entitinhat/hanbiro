import { Add, Close, Edit } from '@mui/icons-material';
import { Box, Button, Popper, Typography, useTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useRef, useState } from 'react';

interface ReportContentHeaderProps {
  pageActive: any;
  pages: any[];
  setPageActive: (pageData: any) => void;
  setPageNameEditing: (editingData: any) => void;
  handleRemovePage: (e: any, i: number) => void;
  navLimit?: number;
}

const ReportContentHeader: React.FC<ReportContentHeaderProps> = (props: ReportContentHeaderProps) => {
  const { pageActive, pages, setPageActive, setPageNameEditing, handleRemovePage, navLimit = 2 } = props;

  const pageLength = pages?.length ?? 0;

  const mainPages = pages.filter((_, i) => i < navLimit);
  const morePages = pages.filter((_, i) => i >= navLimit);
  const activeIndex = pages.findIndex((v) => v.id === pageActive.id);
  const isMoreActivated = activeIndex >= navLimit;

  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<any>(null);
  const theme = useTheme();

  return (
    <Box mt={1} mx={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {mainPages.map((p: any, i: number) => {
        const isActive = pageActive.id === p.id;
        return (
          <Box key={i} onClick={() => !isActive && setPageActive(p)} ml={i > 0 ? 3 : 0}>
            <Box sx={{ display: 'flex', borderBottom: '2px solid ' + blue[500], borderBottomWidth: isActive ? '2px' : '0px', py: 1 }}>
              <Typography sx={{ cursor: 'pointer', color: isActive ? blue[500] : theme.palette.grey[500], fontSize: '.875rem' }}>
                {p.name}
              </Typography>
              <Box ml="10px">
                <Edit
                  sx={{ fontSize: '14px', cursor: 'pointer' }}
                  color="success"
                  onClick={() => setPageNameEditing({ i, name: p.name })}
                />
                {pages.length > 1 && (
                  <Close
                    sx={{ fontSize: '14px', ml: '5px', cursor: 'pointer' }}
                    color="error"
                    onClick={(e: any) => handleRemovePage(e, i)}
                  />
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
      {pageLength > navLimit && (
        <Box ml={3} sx={{ display: 'flex', borderBottom: '2px solid ' + blue[500], borderBottomWidth: isMoreActivated ? '2px' : '0px' }}>
          <Button
            size="small"
            ref={anchorRef}
            onClick={() => setOpen(!open)}
            sx={{ color: isMoreActivated ? blue[500] : theme.palette.grey[500] }}
          >
            <Add fontSize="small" />
            {isMoreActivated ? <Typography>{pageActive.name}</Typography> : <Typography>More</Typography>}
          </Button>
          <Popper
            placement="bottom"
            anchorEl={anchorRef.current}
            open={open}
            sx={{
              zIndex: 9999,
              py: 1,
              border: '1px solid ' + theme.palette.grey[300],
              borderRadius: '.25rem',
              boxShadow: '0 .125rem .25rem ' + theme.palette.grey[500]
            }}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            {morePages.map((p: any, i: number) => {
              const isActive = pageActive.id === p.id;
              return (
                <Box
                  key={i}
                  onClick={() => setPageActive(p)}
                  sx={{
                    display: 'flex',
                    px: 3,
                    py: '4px',
                    ':hover': { background: blue[500], p: { color: 'white' } },
                    background: isActive ? blue[500] : 'none',
                    p: { color: isActive ? 'white' : theme.palette.grey[500] }
                  }}
                >
                  <Typography sx={{ cursor: 'pointer', fontSize: '.875rem' }}>{p.name}</Typography>
                  <Box ml="10px">
                    <Edit
                      sx={{ fontSize: '14px', cursor: 'pointer' }}
                      color="success"
                      onClick={() => setPageNameEditing({ i: i + navLimit, name: p.name })}
                    />
                    {pages.length > 1 && (
                      <Close
                        sx={{ fontSize: '14px', ml: '5px', cursor: 'pointer' }}
                        color="error"
                        onClick={(e: any) => handleRemovePage(e, i)}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Popper>
        </Box>
      )}
    </Box>
  );
};

export default ReportContentHeader;
