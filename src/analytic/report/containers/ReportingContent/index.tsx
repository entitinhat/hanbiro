import React, { useEffect, useState } from 'react';
import { generateUUID } from '@base/utils/helpers';
import { EDisplayGridType, EDisplayModeType, EUserType } from '@analytic/main/types/enum';
import { sectionOptions } from '@analytic/main/config/options';
import { Box, Button, Grid, useTheme } from '@mui/material';
import ReportContentSetting from './ReportContentSetting';
import { sectionAll } from '@analytic/main/config/sections';
import ReportContentHeader from './ReportContentHeader';
import { Add } from '@mui/icons-material';
import TextEditable from '@base/components/@hanbiro/TextEditable';
import ReportContentPage from './ReportContentPage';
import { chartBoxes } from '@analytic/main/config/charts';
import { isBoolean } from 'lodash';

const DEFAULT_PAGES = [
  {
    name: 'Page 1',
    id: generateUUID()
  }
];

const DEFAULT_SETTING = {
  displayMode: EDisplayModeType.DISPLAY_MODE_PORTRAIT,
  displayGrid: EDisplayGridType.DISPLAY_GRID_SHOW,
  selectedSections: [],
  selectedCharts: []
};

interface ReportingContentProps {
  value?: any;
  onChange?: (v: any[]) => void;
  userType?: string;
  [x: string]: any;
}

const ReportingContent: React.FC<ReportingContentProps> = (props: ReportingContentProps) => {
  const { onChange, value, userType = EUserType.USER_TYPE_USER, ...remainProps } = props;
  const iPages = value?.pages;
  const hasIPages = !!iPages && !!iPages?.length;

  const defaultPages = hasIPages ? iPages?.map((p: any) => ({ id: p.id, name: p.name })) : DEFAULT_PAGES;
  const defaultPageSettings = hasIPages
    ? iPages?.reduce((f: any, p: any) => {
        const { sections: iSections, displayMode, displayGrid } = p;
        f = {
          ...f,
          [p.id]: {
            displayMode,
            displayGrid: isBoolean(p.displayGrid)
              ? p.displayGrid
                ? EDisplayGridType.DISPLAY_GRID_SHOW
                : EDisplayGridType.DISPLAY_GRID_NEVER
              : p.displayGrid,
            selectedSections: iSections.map((v: any) => ({ label: sectionOptions[v.section], value: v.section })),
            selectedCharts: iSections.reduce((f: string[], s: any) => {
              const { charts, section } = s;
              f = [...f, ...charts.map((k: string) => ({ label: chartBoxes[k]?.title ?? '-No title-', value: k }))];
              return f;
            }, [])
          }
        };
        return f;
      }, {})
    : {
        [DEFAULT_PAGES[0]['id']]: DEFAULT_SETTING
      };

  const [pages, setPages] = useState(defaultPages);
  const [pageActive, setPageActive] = useState(defaultPages[0]);
  const [pageSettings, setPageSettings] = useState<any>(defaultPageSettings);
  const [pageNameEditing, setPageNameEditing] = useState<{ i: number; name: string } | null>(null);
  const handPageSetting = (id: string, isRemove: boolean = false) => {
    const newPageSettings: any = { ...pageSettings };
    if (isRemove) {
      if (!!newPageSettings?.[id]) {
        delete newPageSettings[id];
      }
    } else {
      newPageSettings[id] = DEFAULT_SETTING;
    }
    setPageSettings(newPageSettings);
  };

  const handleAddPage = () => {
    const newPageId = generateUUID();
    const newPage = {
      name: 'Page ' + (pages.length + 1),
      id: newPageId,
      isNewPage: true
    };
    setPages([...pages, newPage]);
    setPageActive(newPage);
    handPageSetting(newPageId);
  };

  const handleRemovePage = (e: any, i: number) => {
    e.stopPropagation();
    const newPages = [...pages];
    const pageId = newPages[i].id;
    if (pageId === pageActive.id) {
      setPageActive({ ...newPages[i - 1] });
    }
    newPages.splice(i, 1);
    setPages(newPages);
    handPageSetting(pageId, true);
  };

  const handleSavePageName = (name: string) => {
    const newPages = pages.map((p: any, i: number) => {
      if (i === pageNameEditing?.i) {
        p.name = name;
      }
      return p;
    });
    setPages(newPages);
    setPageNameEditing(null);
  };

  useEffect(() => {
    const newPages = pages.map((p: any, i: number) => {
      const { displayGrid, displayMode, selectedSections = [], selectedCharts = [] } = pageSettings?.[p.id] ?? {};
      const sections =
        selectedSections?.map((v: any) => {
          const k = v.value;
          const chartKeysBySection = sectionAll[k][userType];
          return {
            section: k,
            charts: selectedCharts.filter((selected: any) => chartKeysBySection.includes(selected.value)).map((item: any) => item.value)
          };
        }) ?? [];
      return {
        id: p.id,
        name: p.name,
        displayMode,
        displayGrid: displayGrid == EDisplayGridType.DISPLAY_GRID_SHOW,
        sections
      };
    });
    const params: any = { pages: pages ? [...newPages] : null };
    onChange && onChange(params);
  }, [pages, pageSettings]);

  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={8} px={1}>
        <Box
          sx={{
            height: '100%',
            backgroundColor: theme.palette.grey[50],
            border: '1px solid ' + theme.palette.grey[300],
            borderRadius: '.25rem'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid ' + theme.palette.grey[300]
            }}
          >
            {pageNameEditing !== null && (
              <Box width="100%" padding={1}>
                <TextEditable
                  isSaving={false}
                  onClose={() => setPageNameEditing(null)}
                  onSave={handleSavePageName}
                  setIsSaving={() => {}}
                  value={pageNameEditing?.name ?? ''}
                />
              </Box>
            )}
            {pageNameEditing === null && (
              <>
                <ReportContentHeader
                  handleRemovePage={handleRemovePage}
                  pageActive={pageActive}
                  pages={pages}
                  setPageActive={setPageActive}
                  setPageNameEditing={setPageNameEditing}
                  navLimit={remainProps?.navLimit ?? 2}
                />
                <Button
                  color="primary"
                  size="small"
                  onClick={handleAddPage}
                  startIcon={<Add />}
                  variant="contained"
                  sx={{ ml: 'auto', mr: 1 }}
                >
                  Add
                </Button>
              </>
            )}
          </Box>
          <Box padding={3}>
            {pages.map((p: any, i: number) => {
              if (pageActive.id !== p.id) {
                return null;
              }
              return <ReportContentPage key={i} data={pageSettings[p.id]} />;
            })}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <ReportContentSetting
          data={pageSettings[pageActive.id] as any}
          onChange={(v: any) => setPageSettings({ ...pageSettings, [pageActive.id]: v })}
        />
      </Grid>
    </Grid>
  );
};

export default ReportingContent;
