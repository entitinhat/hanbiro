import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { KnowledgeBase, KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';

import { Grid, List, ListSubheader, Button, useTheme, Box, Stack, Typography, Divider } from '@mui/material';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryFolderTree from '../CategoryFolderTree';
import { isMobile, isTablet } from 'react-device-detect';
import ViewPage from '@desk/knowledge-base/pages/ViewPage';
import { useParams } from 'react-router-dom';
import { DESK_MENUS } from '@base/config/routeMenus';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ExpandMore } from '@mui/icons-material';

interface ListModeProps {
  listTableProps: ListTableProps;
  selectedCategory: KnowledgeBaseCategory | null;
  onSelect: (category: KnowledgeBaseCategory | null) => void;
  hideTree?: boolean;
}
const ListMode = (props: ListModeProps) => {
  const [showTreeList, setShowTreeList] = useState(true);
  const { listTableProps, onSelect, hideTree = false, selectedCategory } = props;
  const [selectedFolder, setSelectedFolder] = useState<KnowledgeBaseCategory | null>(null);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<KnowledgeBase | null>(null);


  useEffect(() => {
    setSelectedFolder(selectedCategory);
  }, [selectedCategory]);
  var nTreeListColumn: any[] = [...listTableProps?.columns] ?? [];
  nTreeListColumn = [nTreeListColumn[0], ...nTreeListColumn.filter((column) => column?.accessorKey == 'subject')];
  //Hooks
  const theme = useTheme();
  const { t } = useTranslation();

  const { id: curKB } = useParams();

  // defined
  const menuSource = MENU_DESK_KNOWLEDGE;
  const menu = 'knowledge';

  const getKBData = (value: KnowledgeBase) => {

    setSelectedKnowledgeBase(value);
  };

  const titleMemo = useMemo(() => {
    return (
      <Stack direction="row" spacing={2} sx={{ height: '20px', ml: 2 }}>
        <Typography>{selectedKnowledgeBase?.category?.name}</Typography>
        <Divider orientation="vertical" variant="middle" />
        {selectedKnowledgeBase?.folder?.parent && (
          <>
            <Typography>{selectedKnowledgeBase?.folder?.parent?.name}</Typography>
            <Divider orientation="vertical" variant="middle" />
          </>
        )}
        <Typography>{selectedKnowledgeBase?.folder?.name}</Typography>
      </Stack>
    );
  }, [selectedKnowledgeBase]);

  const viewHeaderProps: ViewHeaderProps = {
    menus: DESK_MENUS,
    menu,
    isSplitMode: false,
    title: titleMemo
    // moreActions,
    // onNew: (mode?: string) => {
    //   setShowWrite(true);
    // }
  };
  return (
    <Box sx={{ height: '100%', p: 0 }}>
      {curKB && <ViewHeader {...viewHeaderProps} hideChangeMenu />}
      <Grid container sx={{ height: 'calc(100% - 48px)', flexWrap: 'nowrap', width: '100%' }} className="desk-knowledgebase-list">
        {/* Category & Folder Tree */}
        {!isTablet && !hideTree && (
          <>
            <Grid item>
              <List
                sx={{
                  bgcolor: 'background.paper',
                  width: '500px',
                  minWidth: '250px',
                  height: '100%',
                  borderTop: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s ease-in-out',
                  margin: 0,
                  ...(!showTreeList && {
                    flexGrow: 0,
                    flexBasis: 0,
                    width: 0,
                    minWidth: 0,
                    opacity: 0,
                    border: 0
                  })
                }}
                className="scroll-box"
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader
                    // sx={{ textOverflow: 'ellipsis', backgroundColor: '#f5f6fa', borderBottom: '1px solid #e5e9f2' }}
                    sx={{
                      textOverflow: 'ellipsis',
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.primary
                    }}
                    component="div"
                    id="nested-list-subheader"
                  >
                    {t('ncrm_desk_categories_and_folders')}
                  </ListSubheader>
                }
              >
                <CategoryFolderTree
                  treeId="tree-list"
                  onSelect={(val) => {
                    onSelect(val);
                    setSelectedFolder(val);
                  }}
                />
              </List>
            </Grid>
          </>
        )}

        {/** List table ui */}
        {(selectedFolder || hideTree) && (
          <Grid
            item
            sx={{
              width: '400px',
              minWidth: '400px',
              maxWidth: '500px',
              transition: 'all 0.2s ease-in-out',
              ...(!showTreeList && { flexGrow: 0, flexBasis: 0, width: 0, minWidth: 0, opacity: 0, border: 0 })
            }}
            className="scroll-box"
          >
            <ListTable {...listTableProps} columns={nTreeListColumn} />
          </Grid>
        )}
        {curKB && (
          <Button
            size="small"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 0,
              padding: '5px',
              minWidth: 0,
              '&:hover': { border: `1px solid ${theme.palette.secondary.light}` }
            }}
            variant="outlined"
            onClick={() => setShowTreeList(!showTreeList)}
          >
            <ExpandMore
              sx={{
                width: '16px',
                transform: 'rotate(90deg)',
                transition: 'all 0.3s ease-in-out',
                ...(!showTreeList && {
                  transform: 'rotate(-90deg)'
                })
              }}
            />
          </Button>
        )}
        {curKB && (
          <Box className="scroll-box" sx={{ maxHeight: 'calc(100vh - 163px)', width: '100%' }}>
            <ViewPage isSplitMode={false} getData={getKBData} isViewMode={false} />
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ListMode;
