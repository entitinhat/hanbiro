import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { DisplayLandscape, DisplayPortrait, SectionEmpty } from '@analytic/report/components/DisplayMode';
import { EDisplayGridType, EDisplayModeType } from '@analytic/main/types/enum';

interface ReportingContentViewProps {
  value: any;
  dateRange?: string;
}
const ReportingContentView: React.FC<ReportingContentViewProps> = (props: ReportingContentViewProps) => {
  const { value, dateRange = '' } = props;
  if (!value?.pages || !value?.pages.length) {
    return (
      <Box>
        <SectionEmpty />
      </Box>
    );
  }

  const [pages, setPages] = useState<any[]>(value.pages ?? []);
  const [pageActive, setPageActive] = useState(value?.pages?.[0] ?? {});

  const { sections = [], displayMode, displayGrid } = pageActive;

  useEffect(() => {
    if (JSON.stringify(value?.pages) !== JSON.stringify(pages)) {
      setPages(value?.pages);
    }
  }, [value?.pages]);

  const isLandscape = displayMode === EDisplayModeType.DISPLAY_MODE_LANDSCAPE;
  const isPortrait = displayMode === EDisplayModeType.DISPLAY_MODE_PORTRAIT;

  const displayProps = {
    sections: sections,
    isDisplayGrid: displayGrid === EDisplayGridType.DISPLAY_GRID_SHOW
  };

  const [parentProps, setParentProps] = useState({ width: window.innerWidth });
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: '-5px', width: '100%' }}>
      <Box sx={{ flex: '0 0 100%', maxWidth: '100%', px: 1 }}>
        <Box
          sx={{
            position: 'relataive',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            wordWrap: 'break-word',
            backgroundColor: 'white',
            border: '1px solid ' + theme.palette.grey[300],
            borderRadius: '0.25rem'
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {pages.map((p, i) => (
              <Box key={i} px={1} pt={1}>
                <Button
                  size="small"
                  key={i}
                  onClick={() => setPageActive(p)}
                  sx={{ borderRadius: 0, borderBottom: pageActive === p ? '2px solid blue' : 'none' }}
                >
                  {p.name}
                </Button>
              </Box>
            ))}
          </Box>
          <Box>
            {isPortrait && <DisplayPortrait {...displayProps} />}
            {isLandscape && <DisplayLandscape {...{ ...displayProps, parentProps }} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportingContentView;
