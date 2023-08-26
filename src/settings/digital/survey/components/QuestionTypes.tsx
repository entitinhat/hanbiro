import React, { useState } from 'react';
import { QUESTION_TYPES } from '@settings/digital/survey/config/constants';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Box, Button, Fade, Menu, MenuItem, Stack } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

//render question types
const QuestionTypes: React.FC<any> = (props) => {
  //props
  const { keyS, keyQ, selectedQType, onQuestionTypeChange, focusEle } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  //local var
  const qQSelectEleId = 'q-dropdown-' + keyS + '-' + (keyQ + 1);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const renderSelectedType = () => {
    const typeItem: any = QUESTION_TYPES.find((_ele: any) => _ele.type === selectedQType);
    if (typeItem) {
      const MIcon = typeItem.icon;
      return (
        <Stack direction={'row'} alignItems="center" spacing={0.5}>
          <MIcon fontSize="small" /> <SpanLang keyLang={typeItem.languageKey} />
        </Stack>
      );
    } else {
      return null;
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Button size="small" color={'secondary'} endIcon={<KeyboardArrowDown />} onClick={handleMenuClick}>
        {renderSelectedType()}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {QUESTION_TYPES.map((_item: any, _index: number) => {
          const MIcon = _item.icon;
          return (
            <MenuItem key={_index} onClick={() => onQuestionTypeChange(_item.type)}>
              <Stack direction={'row'} alignItems="center" spacing={0.5}>
                <MIcon fontSize="small" /> <SpanLang keyLang={_item.languageKey} />
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default QuestionTypes;
