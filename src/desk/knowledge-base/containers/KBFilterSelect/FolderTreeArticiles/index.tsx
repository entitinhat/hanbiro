import CardSkeleton from '@base/components/@hanbiro/CardSkeleton';
import NoData from '@base/components/@hanbiro/NoData';
import { useKnowledgeBasesAutoComplete } from '@desk/knowledge-base/hooks/useKnowledgeBasesAutoComplete';
import { KnowledgeBase, KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import KBQuickView from '@desk/ticket/containers/KBModal/KBQuickView';
import { Box, Button, CircularProgress, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';
import _ from 'lodash';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CategoryFolderTree from '../../CategoryFolderTree';
interface FolderTreeArticilesProps {
  insertedIds: string[];
  onInsert?: (article: KnowledgeBase) => void;
}
const FolderTreeArticiles: React.FC<FolderTreeArticilesProps> = (props) => {
  const { onInsert, insertedIds } = props;
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeBaseCategory | null>(null);
  const [viewArticle, setViewArticle] = useState<KnowledgeBase | null>(null);
  const [articles, setArticles] = useState<KnowledgeBase[]>([]);
  const [insertedArticles, setInsertedArticles] = useState<string[]>(insertedIds);
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1000)).current;
  const theme = useTheme();
  const { t } = useTranslation();
  //responsive
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  //get kb records
  const params: any = {
    query: `subject:\"${searchText}\"`
  };
  if (selectedCategory) {
    params.query += ` category=\"${selectedCategory?.id || ''}\"`;
  }
  const { data: kbPosts, isFetching: isFetchingCategory } = useKnowledgeBasesAutoComplete({ filter: params });
  useEffect(() => {
    if (kbPosts?.data) {
      setArticles(kbPosts.data);
    } else {
      setArticles([]);
    }
  }, [kbPosts]);
  //select item
  const handleInsert = (article: KnowledgeBase) => {
    const newInsertedArticles = [...insertedArticles];
    newInsertedArticles.push(article.id);
    setInsertedArticles(newInsertedArticles);
    onInsert && onInsert(article);
  };
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearchText(value);
    setSearchTextDebounced(value);
  };
  const ArticlesRender = useMemo(() => {
    return (
      <>
        <Box sx={{ marginTop: '5px', fontSize: '13px', color: theme.palette.text.primary }}>
          {t('ncrm_desk_ticket_articles')} ({articles.length})
        </Box>
        {articles.map((_item: any, index: number) => (
          <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', padding: '5px 0', alignItems: 'center' }}>
            {_item.subject}
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginLeft: 'auto'
              }}
              size="small"
              type="button"
              onClick={() => handleInsert(_item)}
              disabled={insertedArticles.includes(_item.id)}
            >
              {insertedArticles.includes(_item.id) ? t('ncrm_desk_ticket_inserted') : t('ncrm_desk_ticket_insert')}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              type="button"
              sx={{ marginLeft: '5px' }}
              onClick={() => {
                setViewArticle(_item);
                setShowQuickView(true);
              }}
            >
              {t('ncrm_desk_ticket_view')}
            </Button>
          </Box>
        ))}
      </>
    );
  }, [articles, insertedArticles]);

  return (
    <Grid sx={{ padding: '8px 0', position: 'relative' }} container>
      <TextField
        onChange={handleInputChange}
        id="outlined-basic"
        variant="outlined"
        inputProps={{ autoFocus: true }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'transparent'
            },
            '&.Mui-focused': {
              boxShadow: 'none'
            },
            ':focus-within': { border: 'none' }
          },

          position: 'absolute',
          top: '-41px',
          width: '80%'
        }}
        placeholder={t('ncrm_desk_ticket_search_knowledge_base') as string}
      />
      {!showQuickView && (
        <>
          {!matchDownMd && (
            <Grid sx={{ padding: '10px' }} item xs={6}>
              <CategoryFolderTree
                editable={false}
                onSelect={(category) => {
                  setSelectedCategory(category);
                }}
                treeId={''}
              />
            </Grid>
          )}
          <Grid sx={{ borderLeft: `1px solid ${theme.palette.divider}`, padding: '0 15px' }} item xs={matchDownMd ? 12 : 6}>
            {isFetchingCategory && <CardSkeleton />}
            {articles.length === 0 && !isFetchingCategory && <NoData label="No article(s) found." />}
            {articles.length > 0 && ArticlesRender}
          </Grid>
        </>
      )}
      {showQuickView && (
        <Grid item xs={12} sx={{ padding: '10px' }}>
          <KBQuickView
            isInsert={!insertedArticles.includes(viewArticle?.id ?? '')}
            id={viewArticle?.id ?? ''}
            onInsert={(item: KnowledgeBase) => handleInsert(item)}
            onClose={() => setShowQuickView(false)}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default FolderTreeArticiles;
