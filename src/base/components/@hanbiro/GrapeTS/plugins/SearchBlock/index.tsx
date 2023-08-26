import SearchBox from '@base/layouts/MainLayout/Header/HeaderContent/Search/SearchBox';
import { Search, CloseOutlined } from '@mui/icons-material';

import { Box, OutlinedInput, useTheme } from '@mui/material';
import { ChangeEventHandler, useEffect, useState } from 'react';

interface SearchBlockProps {
  grapesId: string;
  editor: any;
}
const SearchBlock = (props: SearchBlockProps) => {
  const { grapesId, editor } = props;

  const [searchText, setSearchText] = useState<string>('');
  const theme = useTheme();
  useEffect(() => {
    if (editor) {
      var bm = editor.BlockManager;
      var blocks = bm.getAll();
      // console.log('All blocks', blocks);

      bm.render(
        blocks.filter((block: any) => {
          let blockName = block.attributes.label;
          return blockName.toLowerCase().includes(searchText);
        })
      );
      const classElements: any = document.getElementsByClassName('gjs-block');
      //// console.log('classElements', classElements[0]);
      for (let i = 0; i < classElements.length; i++) {
        classElements[i].style.width = '43%';
      }
    }
  }, [searchText]);
  const handleTextChange = (ev: any) => {
    setSearchText(ev.target.value);
  };
  const handleEnter = (ev: any) => {
    if (ev?.key === 'Enter') {
      ev.preventDefault();
      ev.stopPropagination();
      return;
    }
  };

  if (editor)
    editor.on('load', () => {
      const grapesNode = document.getElementById(grapesId);
      // console.log('grapesId', grapesId);
      // const selectedComponent = editor.getSelected();
      // console.log('load search box');
      if (grapesNode) {
        const container = grapesNode.querySelector('.gjs-blocks-cs');
        const node = document.getElementById(`search-box-${grapesId}`);
        // console.log('load search box,', container?.parentElement);

        if (container && node && !container?.parentElement?.parentElement?.contains(node)) {
          // setIsShow(true);
          container?.parentElement?.parentElement?.insertBefore(node, container?.parentElement?.parentElement?.firstChild);
        }
      }
    });
  return (
    <Box
      id={`search-box-${grapesId}`}
      sx={{
        position: 'sticky',
        zIndex: 1,
        top: '0px',
        background: theme.palette.background.default
        /* margin-bottom: 40px; */
      }}
    >
      <OutlinedInput
        fullWidth
        size={'small'}
        onChange={handleTextChange}
        value={searchText}
        onKeyPress={handleEnter}
        // placeholder={t('ncrm_common_search_placeholder') as string}
        endAdornment={
          searchText != '' ? (
            <CloseOutlined fontSize="small" onClick={() => setSearchText('')} sx={{ cursor: 'pointer' }} />
          ) : (
            <Search fontSize="small" />
          )
        }
        sx={{
          pr: 1,
          '&.MuiInputBase-inputAdornedEnd': {}
        }}
      />
    </Box>
  );
};
export default SearchBlock;
