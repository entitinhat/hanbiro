import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// Material-UI
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
  Stack,
  ClickAwayListener,
  styled,
  Box,
  Button,
  useTheme,
  Divider
} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Category, FolderOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import classNames from 'classnames';
import { CategoryParentType, KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { useKnowledgeBaseCategories } from '@desk/knowledge-base/hooks/useKnowledgeBaseCategories';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import Icon from '@base/assets/icons/svg-icons';
import WriteFolderForm from '@desk/knowledge-base/containers/WriteFolderForm';

interface KBCategoryAutoCompleteProps {
  value?: KnowledgeBaseCategory;
  onChange?: (nVal: KnowledgeBaseCategory) => void;
  addFolder?: boolean;
}
const CustomContentRoot = styled('div')(({ theme }) => ({
  dipslay: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '35px',
  overflow: 'hidden',
  '&:hover .tree-btn-actions': {
    display: 'block'
  },
  padding: 0,
  borderRadius: '0.25rem',
  marginBottom: '3px',

  WebkitTapHighlightColor: 'transparent',
  '&:hover, &.Mui-disabled, &.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused, &.Mui-selected:hover': {
    backgroundColor: 'transparent'
  },
  [`& .MuiTreeItem-contentBar`]: {
    position: 'absolute',
    width: '100%',
    height: 24,
    left: 0,
    '&:hover &': {
      backgroundColor: theme.palette.action.hover,
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-disabled &': {
      opacity: theme.palette.action.disabledOpacity,
      backgroundColor: 'transparent'
    },
    '&.Mui-focused &': {
      backgroundColor: theme.palette.primary.lighter
    },
    '&.Mui-selected &': {
      backgroundColor: theme.palette.primary.lighter
    },
    '&.Mui-selected:hover &': {
      backgroundColor: theme.palette.primary.lighter,
      '@media (hover: none)': {
        backgroundColor: theme.palette.primary.lighter
      }
    },
    '&.Mui-selected.Mui-focused &': {
      backgroundColor: theme.palette.primary.lighter
    }
  },
  '& .MuiTreeItem-iconContainer': {
    '& .MuiSvgIcon-root': { fontSize: '18px' }
  }
}));

const KBCategoryAutoComplete = (props: KBCategoryAutoCompleteProps) => {
  const { value, onChange, addFolder } = props;
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 500)).current;
  const [treeData, setTreeData] = useState<KnowledgeBaseCategory[]>([]);
  const [selectedValue, setSelectedValue] = useState<KnowledgeBaseCategory | null>(value ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<KnowledgeBaseCategory | null>(null);
  const [openFolder, setOpenFolder] = useState<KnowledgeBaseCategory | null>(null);
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);
  const [isOpenWriteFolder, setIsOpenWriteFolder] = useState<boolean>(false);
  const {
    data: postData,
    isLoading,
    isFetching,
    refetch
  } = useKnowledgeBaseCategories({
    keyword: searchText,
    categoryId: openCategory?.id || '',
    folderParentId: openFolder?.id || ''
  });
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const theme = useTheme();
  //translation hook
  const { t } = useTranslation();
  // find node in tree
  const findNode = (
    treeNodes: KnowledgeBaseCategory[],
    nodeId: string,
    result: KnowledgeBaseCategory | null
  ): KnowledgeBaseCategory | null => {
    for (let i = 0; i < treeNodes.length; i++) {
      const curNode = treeNodes[i];
      if (curNode.id === nodeId) {
        result = curNode;
        break;
      }
      if (curNode.children && curNode.children.length > 0) {
        result = findNode(curNode.children, nodeId, result);
      }
    }
    return result;
  };

  const newPlaceholder = `ncrm_desk_knowledge_category_auto_placeholder`;
  const noOptMsg = `ncrm_desk_knowledge_category_not_found_message`;
  // get node path name
  const getPathName = (node: KnowledgeBaseCategory, pathName: string) => {
    // combine name
    pathName = node.name + (pathName ? ' > ' + pathName : '');
    // find parent
    if (node.parent || node.category) {
      const parentData = node.parent ? node.parent : node.category;
      const parentId = parentData?.id as string;
      const parentNode = findNode(treeData, parentId, null);
      if (parentNode) {
        pathName = getPathName(parentNode, pathName);
      } else if (!parentNode && parentData) {
        const categoryName = parentData.category ? parentData.category.name + ' > ' : '';
        const parentName = parentData.name + '>';
        pathName = categoryName + parentName + pathName;
      }
    }
    return pathName;
  };

  // init states list
  useEffect(() => {
    if (postData?.data) {
      if (!openCategory && !openFolder) {
        const newPostData = postData.data.map((_ele: KnowledgeBaseCategory) => ({
          ..._ele
        }));
        console.log('newPostData:', newPostData);
        setTreeData(newPostData || []);
      } else {
        const newItems = _.cloneDeep(treeData); // [...treeData];
        const openId = openCategory && openFolder ? openFolder.id : openCategory?.id;
        let openNode = findNode(newItems, openId ?? '', null);

        if (openNode) {
          openNode.children = postData?.data;
          setTreeData(newItems);
        }
      }
    }
  }, [postData, isFetching]);


  // initial selected

  useEffect(() => {
    if (value) {
      const selectedString = value ? getPathName(value, '') : '';
      setInputText(selectedString);
    }
  }, [value]);

  // refecth on open/close autoComplete
  useEffect(() => {
    refetch();
  }, [isOpen]);

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting searchText to ""
    const selectedString = selectedValue ? getPathName(selectedValue, '') : '';
    setOpenCategory(null);
    setOpenFolder(null);
    setExpanded([]);
    if (value === '') {
      setInputText(value);
      setSearchTextDebounced(value);
    }
    if (selectedString !== value) {
      setInputText(value);
      setSearchTextDebounced(value);
    }
  };
  const handleExpandNode = (nodeId: string) => {
    const cNode = findNode(treeData, nodeId, null);
    if (cNode?.type === CategoryParentType.CATEGORY) {
      setOpenFolder(null);
      setOpenCategory(cNode);
    } else {
      setOpenCategory(cNode?.category ?? null);
      setOpenFolder(cNode);
    }
    // expanded.push(nodeId);
    // setExpanded(expanded);
  };
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  // TREE VIEW
  const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { classes, className, label, nodeId, expansionIcon: expansionIcon } = props;
    const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } = useTreeItem(nodeId);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      preventSelection(event);
    };

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleExpandNode(nodeId);
      handleExpansion(event);
    };

    const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleSelection(event);
    };

    return (
      <CustomContentRoot
        className={classNames(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled
        })}
        onMouseDown={handleMouseDown}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {expansionIcon}
        </div>
        <Typography onClick={handleSelectionClick} component="div" className={classes.label}>
          {label}
        </Typography>
      </CustomContentRoot>
    );
  });

  function CustomTreeItem(props: TreeItemProps) {
    return <TreeItem ContentComponent={CustomContent} {...props} />;
  }

  const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(props, ref) {
    const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
      const nodeSelected = findNode(treeData, nodeId, null);

      if (nodeSelected) {
        setSelectedValue(nodeSelected);
        onChange && onChange(nodeSelected);
      }
      const selectedString = nodeSelected ? getPathName(nodeSelected, '') : '';
      setInputText(selectedString);
      // clean input search

      setSearchTextDebounced('');
      setOpenCategory(null);
      setOpenFolder(null);

      setIsOpen(false);
    };

    const getTreeViewSelected = () => {
      return selectedValue?.id as string;
    };

    const renderTree = (node: KnowledgeBaseCategory) => {
      const expansionIcon = <>{node.hasChild && <ChevronRightIcon fontSize="large" />}</>;
      const nodeLabel = (
        <>
          <Stack direction="row" alignItems="center" justifyItems="center">
            <Stack
              sx={{
                paddingRight: '10px'
              }}
            >
              {node.type === CategoryParentType.CATEGORY ? (
                <FormIcon icon="category" iconType="icon" color="lightcoral" />
              ) : (
                <FolderOutlined color="primary" />
              )}
            </Stack>
            <Stack> {node.name}</Stack>
          </Stack>
        </>
      );

      return (
        <CustomTreeItem key={node.id} nodeId={node.id} label={nodeLabel} expandIcon={expansionIcon}>
          {''}
          {Array.isArray(node.children) ? node.children.map((childNode) => renderTree(childNode)) : ''}
        </CustomTreeItem>
      );
    };


    return (
      <ClickAwayListener
        onClickAway={(event) => {
          if (event.target !== inputRef.current && event.target !== modalRef.current) {
            setIsOpen(false);
          }
        }}
      >
        <Box>
          {addFolder && (
            <>
              <Button
                size="small"
                sx={{ py: 1 }}
                fullWidth
                startIcon={<AddIcon />}
                onClick={(e) => {
                  setIsOpenWrite(true);
                  e.stopPropagation();
                }}
              >
                {t('ncrm_desk_knowledge_category_auto_add_folder')}
              </Button>
              <Divider />
            </>
          )}
          <TreeView
            ref={ref}
            aria-label="KB Category Autocomplete"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, overflowY: 'auto' }}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            selected={getTreeViewSelected()}
            expanded={expanded}
            multiSelect={false}
            className={`scroll-box`}
          >
            {treeData?.map((treeNode: KnowledgeBaseCategory, index: number) => {
              return renderTree(treeNode);
            })}
          </TreeView>
        </Box>
      </ClickAwayListener>
    );
  });

  return (
    <Box>
      <Autocomplete
        disablePortal
        id="asynchronous-kb-category-folder"
        multiple={false}
        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={(event: React.SyntheticEvent, reason: string) => {
          if (reason === 'toggleInput') {
            setIsOpen(false);
          }
        }}
        options={postData?.data || isFetching ? treeData : []}
        loading={isLoading}
        noOptionsText={t(noOptMsg) ?? ''}
        filterSelectedOptions={false}
        getOptionLabel={(option) => {
          return option?.name ?? '';
        }}
        filterOptions={(options: KnowledgeBaseCategory[], state: any) => {
          return options;
        }}
        popupIcon={Icon('down')}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={selectedValue ? '' : t(newPlaceholder) ?? ''}
              inputRef={inputRef}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
      />
      {addFolder && (
        <Box ref={modalRef}>
          <WriteFolderForm
            isOpen={isOpenWrite}
            onClose={() => {
              setIsOpenWrite(false);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default KBCategoryAutoComplete;
