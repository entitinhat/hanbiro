import { ReactElement, useRef, useState } from 'react';

import { IdName } from '@base/types/common';
import { ArrowDropDown, ArrowDropDownRounded, ChevronRight, ExpandMore, KeyboardArrowDown } from '@mui/icons-material';
import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box, Button, ClickAwayListener, Grow, OutlinedInput, Paper, Popover, Popper, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

const data: RenderTree = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1'
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4'
        }
      ]
    }
  ]
};

export interface DropdownTreeProps {
  value?: string;
  items: RenderTree[];
  onChange?: (nValue: IdName) => void;
}

const DropdownTree = (props: DropdownTreeProps) => {
  const { value: title, items, onChange } = props;

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState(title);
  const [selectedId, setSelectedId] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);
  // const [open, setOpen] = useState(false);
  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTreeToggle = (event: React.SyntheticEvent, node: string[]) => {
    // setOpen((prevOpen) => !prevOpen);
    setExpanded(node);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    // if (anchorEl.current && anchorEl.current.contains(event.target)) {
    //   return;
    // }
    // setOpen(false);
    setAnchorEl(null);
  };

  const handleItemClick = (event: any, id: string) => {
    setSelectedId(id);
    setSelectedItem(event.target.innerText);
  };

  const open = Boolean(anchorEl);

  const StyledTreeItem = styled((props: TreeItemProps) => <TreeItem {...props} />)(({ theme }) => ({
    ['& .MuiTreeItem-content']: {
      paddingTop: 0,
      paddingBottom: 0
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    }
  }));

  const renderTree = (nodes: RenderTree) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} sx={{ p: 0.5 }}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <OutlinedInput
        defaultValue={selectedItem}
        value={selectedItem}
        fullWidth
        readOnly
        endAdornment={<ArrowDropDown sx={{ color: 'secondary' }} />}
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          onNodeSelect={handleItemClick}
          onNodeToggle={handleTreeToggle}
          selected={selectedItem}
          expanded={expanded}
          sx={{ height: 200, minWidth: 300, flexGrow: 1, overflowY: 'auto' }}
        >
          {renderTree(data)}
        </TreeView>
      </Popover>
    </Box>
  );
};

export default DropdownTree;
