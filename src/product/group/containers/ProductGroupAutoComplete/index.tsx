import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Autocomplete, Box, Chip, CircularProgress, ClickAwayListener, TextField, Typography } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useProductGroups } from '@product/group/hooks/useProductGroups';
import { ProductGroup } from '@product/group/types/group';
import { PaginateInput } from '@base/types/common';

interface TreeNodeData {
  [x: string]: any;
}

interface ProductGroupAutoCompleteProps {
  value?: ProductGroup | null;
  onChange?: any;
  isRefetch?: boolean;
}

const ProductGroupAutoComplete = (props: ProductGroupAutoCompleteProps) => {
  const { value, onChange, isRefetch } = props;

  const { t } = useTranslation();

  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1000)).current;
  const [treeData, setTreeData] = useState<TreeNodeData[]>([]);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [globalData, setGlobalData] = useState<TreeNodeData[]>([]);

  const inputRef = useRef(null);
  const initialLoad = useRef<any>(null);

  const { data: postData, refetch, isLoading } = useProductGroups({ keyword: searchText, paging: { page: 1, size: 999 } as PaginateInput });

  useEffect(() => {
    if (isRefetch) {
      refetch();
    }
  });

  // find node in tree
  const findNode = (treeNodes: TreeNodeData[], nodeId: string, result: TreeNodeData): TreeNodeData => {
    for (let i = 0; i < treeNodes.length; i++) {
      if (treeNodes[i].id === nodeId) {
        result = treeNodes[i];
      }
      if (treeNodes[i]?.children?.length > 0) {
        result = findNode(treeNodes[i].children, nodeId, result);
      }
    }
    return result;
  };

  // build tree data from array
  const buildTree = (arrItems: ProductGroup[], id?: string): TreeNodeData[] =>
    arrItems.filter((_item: any) => _item.parent?.id === id).map((_item: any) => ({ ..._item, children: buildTree(arrItems, _item.id) }));

  const newPlaceholder = t('ncrm_common_product_group_auto_placeholder');
  // get node path name
  const getPathName = (node: any, pathName: string) => {
    if (!node || typeof node === undefined || typeof node === null) return '';
    // combine name
    pathName = node.name + (pathName ? ' > ' + pathName : '');
    // find parent
    if (node.parent) {
      const parentNode = findNode(globalData, node.parent.id, {});
      pathName = getPathName(parentNode, pathName);
    }
    return pathName;
  };

  const getTreeViewExpanded = (node: any, expand: string[]) => {
    expand.push(node?.id);
    if (node?.parent) {
      const parentNode = findNode(globalData, node.parent.id, {});
      expand = getTreeViewExpanded(parentNode, expand);
    }
    return expand;
  };

  // init states list
  useEffect(() => {
    if (postData?.data) {
      if (!initialLoad.current) {
        setGlobalData(buildTree(postData?.data || [], undefined));
        initialLoad.current = true;
      }

      if (searchText != '') {
        setTreeData(postData?.data || []);
      } else {
        setTreeData(buildTree(postData?.data || [], undefined));
      }
    }
    () => {
      initialLoad.current = false;
    };
  }, [postData]);

  // initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          // array object
          if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
            setSelectedValue(value);
          }
        } else {
          setSelectedValue([]);
        }
      } else {
        // single object
        if (value?.id !== selectedValue?.id) {
          // setSelectedValue(value);
          const fOption = findNode(globalData, value?.id, {});
          if (fOption) {
            setSelectedValue(fOption);
          }
        }
      }
    } else {
      setSelectedValue(null);
    }
  }, [value, globalData]);

  useEffect(() => {
    if (globalData.length && selectedValue) {
      const cNode = findNode(globalData, selectedValue?.id, {});
      setExpanded(getTreeViewExpanded(cNode, []));
    }

    setInputText(getPathName(selectedValue, ''));
  }, [globalData, selectedValue]);

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting searchText to ""
    setSearchText(value);
    setSearchTextDebounced(value);

    setInputText(value);
  };

  // TREE VIEW
  const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props;
    const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId);
    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      preventSelection(event);
    };

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleExpansion(event);
    };

    const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleSelection(event);
    };

    const classesProps = {
      [classes.expanded]: expanded,
      [classes.selected]: selected,
      [classes.focused]: focused,
      [classes.disabled]: disabled
    };
    const getClasses = Object.keys(classesProps)
      .filter((k) => classesProps[k])
      .join(' ');

    const itemClass = `${className} ${classes.root} ${getClasses}`;

    return (
      <div className={itemClass} onMouseDown={handleMouseDown} ref={ref as React.Ref<HTMLDivElement>}>
        <Box
          onClick={handleExpansionClick}
          className={classes.iconContainer}
          sx={{
            '&.MuiTreeItem-iconContainer svg': {
              fontSize: `18px !important`
            }
          }}
        >
          {icon}
        </Box>
        <Typography onClick={handleSelectionClick} component="div" className={classes.label}>
          {label}
        </Typography>
      </div>
    );
  });

  function CustomTreeItem(props: TreeItemProps) {
    return <TreeItem ContentComponent={CustomContent} {...props} />;
  }

  const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(props, ref) {
    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
      setExpanded(nodeIds);
    };

    const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
      const nodeSelected = findNode(globalData, nodeId, {});
      setSelectedValue(nodeSelected);
      onChange && onChange(nodeSelected);
      // clean input search
      setSearchText('');
      setSearchTextDebounced('');
      setIsOpen(false);
    };

    const getTreeViewSelected = () => {
      return selectedValue?.id as string;
    };

    const renderTree = (nodes: TreeNodeData) => (
      <CustomTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </CustomTreeItem>
    );

    return (
      <ClickAwayListener
        onClickAway={(event: MouseEvent | TouchEvent) => {
          if (event.target !== inputRef.current) {
            setIsOpen(false);
          }
        }}
      >
        <TreeView
          ref={ref}
          aria-label=""
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 240, flexGrow: 1, overflowY: 'auto' }}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          selected={getTreeViewSelected()}
          expanded={expanded}
          multiSelect={false}
          className={`scroll-box`}
        >
          {treeData?.map((treeNode: TreeNodeData, index: number) => {
            return renderTree(treeNode);
          })}
        </TreeView>
      </ClickAwayListener>
    );
  });

  return (
    <Autocomplete
      id="asynchronous-product-group"
      multiple={false}
      // limitTags={3}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={(event: React.SyntheticEvent, reason: string) => {
        if (reason === 'toggleInput') {
          setIsOpen(false);
        }
      }}
      getOptionLabel={(option) => option?.name ?? ''}
      options={postData?.data || []}
      loading={isLoading}
      filterSelectedOptions
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            placeholder={newPlaceholder}
            inputRef={inputRef}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        );
      }}
      inputValue={inputText}
      onInputChange={handleInputChange}
      ListboxComponent={ListboxComponent}
      disableCloseOnSelect
      clearOnBlur={false}
      filterOptions={(options: any[], state: any) => {
        return options;
      }}
    />
  );
};

export default ProductGroupAutoComplete;
