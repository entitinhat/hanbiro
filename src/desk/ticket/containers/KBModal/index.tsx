import SpanLang from '@base/components/@hanbiro/SpanLang';
import {
  alpha,
  Box,
  Button,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Drawer } from '@mui/material';
import KnowledgeBaseFilterSelect from '@desk/knowledge-base/containers/KBFilterSelect';
import NoData from '@base/components/@hanbiro/NoData';
import KBQuickView from './KBQuickView';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import WritePage from '@desk/knowledge-base/pages/WritePage';
import { useTranslation } from 'react-i18next';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (items: KnowledgeBase[]) => void;
  articles: KnowledgeBase[];
  handleRemoveKb?: (id: number) => void;
}
const KnowledgeBaseModal = (props: KnowledgeBaseModalProps) => {
  const { isOpen, onClose, onChange, articles, handleRemoveKb } = props;

  const [showQuickView, setShowQuickView] = useState(false);

  const [viewArticle, setViewArticle] = useState<KnowledgeBase | null>(null);
  const [insertedArticles, setInsertedArticles] = useState<KnowledgeBase[]>([]);
  const [insertedIds, setInsertedIds] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { t } = useTranslation();
  //init data
  useEffect(() => {
    if (articles?.length > 0) {
      setInsertedArticles(articles);
      const nIds = articles.map((a) => a.id);
      setInsertedIds(nIds);
    }
  }, [articles]);
  console.log('articles', articles, insertedArticles);
  // insert item
  const handleInsert = (article: KnowledgeBase) => {
    if (article.id) {
      const fIdx = insertedArticles.findIndex((item) => item.id === article.id);
      if (fIdx === -1) {
        setInsertedArticles((insertedArticles) => [...insertedArticles, article]);
        setInsertedIds((insertedIds) => [...insertedIds, article.id]);
      }
    }
  };
  const handleClose = () => {
    onChange && onChange(insertedArticles);
    setShowQuickView(false);
  };
  console.log('KnowledgeBaseModal', insertedArticles);
  const theme = useTheme();
  //responsive
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const renderTitle = () => {
    return (
      <>
        <Typography
          id="modal-modal-title"
          variant="h4"
          fontWeight={500}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {t('ncrm_desk_ticket_knowledgebase')}
          <IconButton
            size="small"
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent !important'
              }
            }}
            onClick={() => onClose()}
          >
            <Close fontSize="small" />
          </IconButton>
        </Typography>
      </>
    );
  };

  const renderFields = () => {
    return (
      <Box
        component="form"
        className="scroll-box"
        sx={{
          height: 'calc(100vh - 120px)',
          p: '15px'
        }}
      >
        {!showQuickView && (
          <>
            <KnowledgeBaseFilterSelect
              onInsert={(nVal: KnowledgeBase) => {
                handleInsert(nVal);
              }}
              insertedIds={insertedIds}
            />
            <Box sx={{ marginTop: '20px', marginBottom: '10px', fontSize: '13px', color: theme.palette.text.primary }}>
              {insertedArticles.length} {t('ncrm_desk_ticket_results_found')}
            </Box>
            {insertedArticles.length === 0 && (
              <>
                <NoData />
                <Stack justifyContent="center" direction="row">
                  <Button
                    size="small"
                    onClick={() => {
                      setIsOpenModal(true);
                    }}
                    sx={{ width: 'fit-content' }}
                    variant="contained"
                    color="primary"
                  >
                    + New Article
                  </Button>
                </Stack>
              </>
            )}
            {insertedArticles.length > 0 && (
              <>
                <List sx={{ width: '100%' }}>
                  {insertedArticles.map((_item, index: number) => (
                    <ListItem
                      sx={{ marginBottom: '3px', bgcolor: theme.palette.primary.lighter, borderRadius: '0.25rem' }}
                      secondaryAction={
                        <>
                          <Button
                            sx={{ marginLeft: 'auto' }}
                            size="small"
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={() => {
                              const newItems = [...insertedArticles];
                              newItems.splice(index, 1);
                              setInsertedArticles(newItems);
                              const nIds = insertedIds.filter((_id) => _id !== _item.id);
                              setInsertedIds(nIds);
                              handleRemoveKb && handleRemoveKb(index);
                            }}
                          >
                            {t('ncrm_common_btn_delete')}
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
                        </>
                      }
                      key={index}
                    >
                      <ListItemText primary={_item.subject} />
                    </ListItem>
                  ))}
                </List>
                <Stack justifyContent="flex-end" direction="row">
                  <Button
                    onClick={() => {
                      setIsOpenModal(true);
                    }}
                    sx={{ width: 'fit-content' }}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    + New Article
                  </Button>
                </Stack>
              </>
            )}
          </>
        )}

        {showQuickView && <KBQuickView isInsert={false} id={viewArticle?.id ?? ''} onClose={handleClose} />}
      </Box>
    );
  };
  const renderFooter = () => {
    return (
      <FormGroup sx={{ display: 'flex', padding: '10px 15px' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={() => {
                onChange && onChange(insertedArticles);
                onClose();
              }}
            >
              {t('ncrm_common_btn_close')}
            </Button>
          </Stack>
        </Box>
      </FormGroup>
    );
  };

  return (
    <Suspense fallback={<></>}>
      <Drawer
        keepMounted
        sx={{ zIndex: theme.zIndex.modal }}
        open={isOpen}
        anchor="right"
        onClose={() => {
          onChange && onChange(insertedArticles);
          onClose();
        }}
      >
        <Stack sx={{ width: matchDownMd ? '100vw' : '900px' }} direction="column" divider={<Divider />}>
          {renderTitle()}
          {renderFields()}
          {renderFooter()}
        </Stack>
        <WritePage
          isOpen={isOpenModal}
          onClose={() => {
            setIsOpenModal(false);
          }}
          category={'desk_knowledge'}
          menuApi={'desk_knowledge'}
        />
      </Drawer>
    </Suspense>
  );
};

export default KnowledgeBaseModal;
