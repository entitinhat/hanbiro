import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//project
import { Note } from '@base/types/note';
import { DESC, NOTE_PAGE_SIZE } from '@base/config/constant';
import { useNotesNew } from '@base/hooks/notes/useNotes';
import { MENU_SOURCE } from '@base/config/menus';
import { queryKeys } from '@base/config/queryKeys';
import RawHTML from '@base/components/@hanbiro/RawHTML';

//Material-UI
import { Box, OutlinedInput, Divider, InputAdornment, Button, useTheme, List, ListItem, ListItemText } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import WriteNotePage from '@base/containers/Notes/WriteNotePage';
import ListNote from './ListNote';
import { noteFields } from './Helper';
import NoData from '@base/components/@hanbiro/NoData';
import useNoteMutation from '@base/hooks/notes/useNoteMutation';
import NoteQuickView from '../QuickView/Note';

interface NoteProps {
  menuSource: string;
  menuSourceId: string;
  sx?: any;
  hideWriteForm?: boolean; //hide 'add note button' and 'searchbar' in case print note (ex: menu desk)
  isRecent?: boolean; // recentLimited note in view Right
  recentLimited?: number; // default to 3
}

function Note(props: NoteProps) {
  const { menuSource: inputMenuSource, menuSourceId, hideWriteForm, sx, isRecent, recentLimited = 3 } = props;
  const params = useParams();
  const id = menuSourceId != '' ? menuSourceId : params?.id ?? '';
  const theme = useTheme();
  const { t } = useTranslation();
  //state
  const [openWrite, setOpenWrite] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [paging, setPaging] = useState<any>({ page: 1, size: NOTE_PAGE_SIZE });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const maxPaging: number = 3;
  const menuSource = MENU_SOURCE[inputMenuSource] ?? inputMenuSource;
  const { mSortNote } = useNoteMutation(menuSourceId);

  // get data
  const noteParams = {
    source: {
      menu: menuSource,
      id: id
    },
    filter: {
      query: `content:\"${searchText}\"`,
      sort: {
        field: 'order',
        orderBy: DESC
      },
      paging: {
        ...paging
      }
    }
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useNotesNew(
    [queryKeys.notes, id],
    noteParams
  );
  const fields = noteFields;
  const [open, setOpen] = useState(false);
  const [contentModal, setContentModal] = useState('');
  useEffect(() => {
    if (paging) {
      setCurrentPage(paging?.page - 1);
    }
    if (data && hasNextPage) {
      setCurrentPage(paging?.page - 1);
      fetchNextPage();
    }
  }, [paging, data]);

  //handler
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setSearchText(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    searchText.trim();
    refetch && refetch();
  };
  //get items dragged and dropped
  const handleDragDrop = (result: any) => {
    const source = {
      menu: menuSource,
      id: menuSourceId
    };
    mSortNote.mutate(
      {
        items: result,
        source: source
      },
      {
        onSuccess: () => {
          refetch();
        }
      }
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (item: any) => {
    setOpen(true);
    setContentModal(item.content);
  };
  const ListNoteMemo = useMemo(() => {
    return (
      <ListNote
        itemsList={data?.pages[currentPage]?.data || []}
        fields={fields}
        paging={data?.pages[currentPage]?.paging || {}}
        setPaging={(value: any) => {
          setPaging(value);
        }}
        handleDragDrop={handleDragDrop}
        menuSourceId={menuSourceId}
      />
    );
  }, [currentPage, data]);

  return isRecent ? (
    <List sx={{ p: 0 }}>
      {data?.pages[currentPage]?.data?.slice(0, recentLimited).map((item: any, index: number) => {
        if (index > maxPaging - 1) return;
        return (
          <ListItem key={index} divider={index < maxPaging - 1}>
            <ListItemText
              className="note-text-ellipsis"
              onClick={() => handleOpen(item)}
              sx={{
                cursor: 'pointer',
                height: 'auto',
                display: '-webkit-box',
                webkit: '',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                // width: '100px',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
                color: theme.palette.primary.main
              }}
              primary={<RawHTML>{item.content || ''}</RawHTML>}
            />
          </ListItem>
        );
      })}
      {(!data?.pages[currentPage]?.data || data?.pages[currentPage]?.data.length === 0) && (
        <Box sx={{ padding: '16px' }}>
          <NoData />
        </Box>
      )}
      {open && <NoteQuickView content={contentModal} title={t('ncrm_desk_ticket_recent_notes')} handleClose={handleClose} isOpen={open} />}
    </List>
  ) : (
    <Box sx={{ ...sx, p: '0px !important', mx: -2, mt: -2 }}>
      {!hideWriteForm && (
        <Box
          sx={{
            p: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 'auto'
            }}
          >
            <OutlinedInput
              onChange={handleTextChange}
              value={searchText}
              onKeyPress={handleEnter}
              placeholder={t('ncrm_common_search_placeholder') as string}
              size="small"
              sx={{
                width: 216
              }}
              endAdornment={
                <>
                  <Divider orientation="vertical" sx={{ height: 32 }} />
                  <InputAdornment
                    position="end"
                    sx={{
                      '& .MuiInputAdornment-sizeSmall': {
                        width: 32,
                        ml: '-8px'
                      },
                      ':hover': {
                        '& .MuiIconButton-root': {
                          bgcolor: theme.palette.primary.lighter,
                          color: `${theme.palette.primary.main}`
                        }
                      },
                      '& .MuiIconButton-root': {
                        height: 32
                      },
                      py: 0
                    }}
                  >
                    <IconButton
                      aria-label="search"
                      edge="end"
                      color="inherit"
                      sx={{
                        ml: '-8px',
                        mr: '-14px'
                      }}
                      onClick={() => {}}
                    >
                      <Search sx={{}} fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                </>
              }
            />
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              setOpenWrite(!openWrite);
            }}
            size="small"
            startIcon={<Add fontSize="small" />}
          >
            {t('ncrm_common_btn_addnote')}
          </Button>
        </Box>
      )}
      {!openWrite && (
        <WriteNotePage
          value={''}
          isOpen={!openWrite}
          onClose={() => {
            setOpenWrite(true);
          }}
          sourceId={id}
          source={menuSource}
          refetch={refetch}
        />
      )}
      {!isError && data && <Box>{ListNoteMemo}</Box>}
    </Box>
  );
}

export default Note;
