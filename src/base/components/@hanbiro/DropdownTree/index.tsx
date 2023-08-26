import { ReactElement, useRef, useState } from 'react';

import { IdName } from '@base/types/common';
import { ChevronRight, ExpandMore, KeyboardArrowDown } from '@mui/icons-material';
import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box, Button, ClickAwayListener, Grow, Paper, Popper } from '@mui/material';
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

  const anchorRef = useRef<any>(null);
  const [selectedItem, setSelectedItem] = useState(title);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleTreeToggle = (event: React.SyntheticEvent, node: string[]) => {
    // setOpen((prevOpen) => !prevOpen);
    setExpanded(node);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleItemClick = (event: React.SyntheticEvent, node: string) => {
    console.log(node);
    // setOpen(false);
    // onChange && onChange(item);
    setSelectedItem(node);
  };

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
      <Button size="small" color="secondary" endIcon={<KeyboardArrowDown />} ref={anchorRef} onClick={handleToggle}>
        {selectedItem}
      </Button>
      <Popper
        placement={'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4]
              }
            }
          ]
        }}
        sx={{ zIndex: 1310 }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ boxShadow: (t) => t.customShadows.z1 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <TreeView
                  defaultCollapseIcon={<ExpandMore />}
                  defaultExpandIcon={<ChevronRight />}
                  onNodeSelect={handleItemClick}
                  onNodeToggle={handleTreeToggle}
                  selected={selectedItem}
                  expanded={expanded}
                  sx={{ height: 200, width: 250, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                  {renderTree(data)}
                </TreeView>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default DropdownTree;
