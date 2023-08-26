import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

// mui import
import { Box, Button, ButtonGroup, CircularProgress, Grid, IconButton, Stack, styled, Typography, useTheme, Tooltip } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AddCircleOutline, EditOutlined, Folder, FolderOpenOutlined, FolderOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
// import IconButton from '@mui/material/IconButton';

// project import
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { FilterInput, IdName, PaginateInput } from '@base/types/common';
import { ProductGroup, ProductGroupPaging } from '@settings/preferences/types/group';
import { useProductGroups } from '@product/group/hooks/useProductGroups';
import useProducts from '@settings/preferences/hooks/product/useProducts';
// import WriteForm from '../WriteFrom';
import WriteForm from 'product/group/containers/WriteForm';
import { useProductGroupMutation } from '@settings/preferences/hooks/product/useProductGroupMutation';

const PAGE_SIZE = 10;

const NODE_TYPE_GROUP = 'GROUP';

interface ProductTreeProps {
  treeId?: string;
  onSelect?: (node: any) => void;
  single?: boolean;
}

//====STYLE====
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
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-disabled &': {
      opacity: theme.palette.action.disabledOpacity,
      backgroundColor: 'transparent'
    },
    '&.Mui-focused &': {
      backgroundColor: theme.palette.action.focus
    },
    '&.Mui-selected &': {
      backgroundColor: 'primary.lighter'
    },
    '&.Mui-selected:hover &': {
      backgroundColor: 'primary.lighter',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'primary.lighter'
      }
    },
    '&.Mui-selected.Mui-focused &': {
      backgroundColor: 'primary.lighter'
    }
  },
  '& .MuiTreeItem-iconContainer': {
    '& .MuiSvgIcon-root': { fontSize: '18px' }
  }
}));
//====STYLE====

const ProductTree = (props: ProductTreeProps) => {
  const { single = true, onSelect } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  const [treeData, setTreeData] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [openNode, setOpenNode] = useState<ProductGroup | null>(null);
  const [rootPaging, setRootPaging] = useState<ProductGroupPaging>({ page: 1, nextPage: 1, size: PAGE_SIZE, totalPage: 0 });
  const [selectedNodes, setSelectedNodes] = useState<string>(); //highlight
  const [selectedGroup, setSelectedGroup] = useState<ProductGroup>(); //for add/edit group
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);

  const { mDelete } = useProductGroupMutation([]);

  // get product groups
  const {
    data: groupData,
    isFetching: isGroupFetching,
    isLoading: isGroupLoading,
    refetch: groupRefetch
  } = useProductGroups({
    parentId: openNode?.nodeType === NODE_TYPE_GROUP ? openNode.id : '',
    paging:
      openNode?.nodeType === NODE_TYPE_GROUP
        ? ({ page: openNode?.paging?.page, size: PAGE_SIZE } as PaginateInput)
        : ({ page: rootPaging.page, size: 9999 } as PaginateInput)
  });

  // get products by group
  const byGroupId = openNode?.nodeType === NODE_TYPE_GROUP ? openNode.id : '';
  const paramsProducts: any = {
    filter: {
      query: `groupId=${byGroupId}`,
      sort: {
        field: 'createdAt',
        orderBy: 0
      },
      paging: openNode?.nodeType === NODE_TYPE_GROUP ? { page: openNode?.paging?.page, size: PAGE_SIZE } : { page: 1, size: PAGE_SIZE }
    } as FilterInput
  };
  const {
    data: productData,
    isFetching: isProductFetching,
    isLoading: isProductLoading,
    refetch: productRefetch
  } = useProducts(paramsProducts, {
    enabled: byGroupId != '',
    cacheTime: 0
  });

  // set tree: group
  const setTree = () => {
    if (groupData?.data) {
      const newGroupData = groupData.data.map((_ele: ProductGroup) => ({
        ..._ele,
        nodeType: NODE_TYPE_GROUP,
        children: [],
        paging: { page: 1, nextPage: 1, size: PAGE_SIZE, totalPage: 1 }
      }));

      const pagingData = groupData.paging;

      if (openNode === null) {
        if (pagingData && rootPaging.nextPage <= pagingData.totalPage) {
          if (rootPaging.nextPage !== 1 && rootPaging.nextPage === pagingData.currentPage) {
            setTreeData((curData: any) => curData.concat(newGroupData));
          } else {
            setTreeData(newGroupData); // build initial tree
          }
          // set paging
          setRootPaging({
            page: pagingData.currentPage,
            size: PAGE_SIZE,
            nextPage: pagingData.currentPage + 1,
            totalPage: pagingData.totalPage
          });
        }
      }
    }
  };

  useEffect(() => {
    setTree();
  }, [groupData, openNode]);

  // tree: add product/group to current group
  const addToTree = () => {
    if (!isProductFetching) {
      if (productData?.data) {
        const newItems = _.cloneDeep(treeData);
        const pagingData = productData.paging;
        // // find selected node
        const curNode = findNode(newItems, openNode?.id, {});
        if (curNode?.id && openNode?.nodeType === NODE_TYPE_GROUP) {
          // set node
          if (pagingData && curNode.paging && curNode?.paging.nextPage <= pagingData.totalPage) {
            // add group + product children
            if (groupData?.data) {
              const newGroupData = groupData.data.map((_ele: ProductGroup) => ({
                ..._ele,
                nodeType: NODE_TYPE_GROUP,
                children: [],
                paging: { page: 1, nextPage: 1, size: 10, totalPage: 1 }
              }));
              curNode.children = newGroupData;
            } else {
            }
            // set next paging
            curNode.paging = {
              page: pagingData.currentPage,
              size: PAGE_SIZE,
              nextPage: pagingData.currentPage + 1,
              totalPage: pagingData.totalPage
            };
          }
        }
        setTreeData(newItems);
      } else {
        if (groupData?.data && openNode != null) {
          // add child group
          const newItems = _.cloneDeep(treeData);
          const curNode = findNode(newItems, openNode.id, {});
          if (curNode?.id && curNode.nodeType === NODE_TYPE_GROUP) {
            const newGroupData = groupData.data.map((_ele: ProductGroup) => ({
              ..._ele,
              nodeType: NODE_TYPE_GROUP,
              children: [],
              paging: { page: 1, nextPage: 1, size: PAGE_SIZE, totalPage: 1 }
            }));
            curNode.children = newGroupData;
            setTreeData(newItems);
          }
        }
      }
    }
  };
  useEffect(() => {
    addToTree();
  }, [isProductFetching]);

  // find node in tree
  const findNode = (treeNodes: ProductGroup[] | undefined, nodeId: string = '', result: any): ProductGroup => {
    for (let i = 0; treeNodes && i < treeNodes.length; i++) {
      if (treeNodes && treeNodes[i].id === nodeId) {
        result = treeNodes[i];
      }
      if (treeNodes && treeNodes[i]?.children!.length > 0) {
        result = findNode(treeNodes[i].children, nodeId, result);
      }
    }
    return result;
  };

  const newPlaceholder = `Type or click to select a group`;
  // get node path name
  const getPathName = (node: ProductGroup, pathName: string) => {
    if (!node || typeof node === undefined || typeof node === null) return newPlaceholder;
    // combine name
    pathName = node.name + (pathName ? ' > ' + pathName : '');
    // find parent
    if (node.parent) {
      const parentNode = findNode(treeData, node.parent.id, {});
      pathName = getPathName(parentNode, pathName);
    }
    return pathName;
  };

  //==============HANDLER
  const handleExpandNode = (nodeId: string) => {
    const cNode = findNode(treeData, nodeId, {});
    setOpenNode(cNode);
  };

  const handleAddGroup = (activeGroup?: ProductGroup) => {
    setSelectedGroup({ parent: { id: activeGroup?.id, name: activeGroup?.name } as IdName } as ProductGroup);
    setIsOpenWrite(true);
  };

  const handleEditGroup = (editGroup: ProductGroup) => {
    setSelectedGroup(editGroup);
    setIsOpenWrite(true);
  };

  useEffect(() => {
    if (mDelete.isSuccess) {
      handleAfterDelete(mDelete.data.ids[0]);
      groupRefetch();
      productRefetch();
      mDelete.isSuccess = !mDelete.isSuccess;
    }
  }, [mDelete.isSuccess]);

  const handleDeleteGroup = (id: string) => {
    mDelete.mutate({ ids: [id] });
  };
  // TREE VIEW
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    const cNode = findNode(treeData, nodeId, {});
    setSelectedNodes(nodeId);
    onSelect && onSelect(cNode);
  };

  // delete group
  const handleAfterDelete = (id: any) => {
    const newItems = _.cloneDeep(treeData);
    const curNode = findNode(newItems, id, {});
    if (curNode?.id) {
      if (curNode.parent?.id != null && curNode.parent?.name != null) {
        const sourceParentNode = findNode(newItems, curNode.parent.id, {});
        const fChildIdx = sourceParentNode?.children?.findIndex((_ele: ProductGroup) => _ele.id === id);
        if ((fChildIdx && fChildIdx > -1) || fChildIdx === 0) {
          sourceParentNode?.children?.splice(fChildIdx, 1);
        }
      } else {
        const fIndex = newItems.findIndex((_ele: ProductGroup) => _ele.id === id);
        if (fIndex > -1) {
          newItems.splice(fIndex, 1);
        }
      }
    }
    setTreeData(newItems);
  };

  // new/update folder
  const handleAfterCreateUpdate = (group: any) => {
    const newItems = _.cloneDeep(treeData);
    const newGroup = {
      ...group,
      nodeType: NODE_TYPE_GROUP,
      countProducts: 0,
      children: [],
      paging: { page: 1, nextPage: 1, size: PAGE_SIZE }
    };
    //1. delete in source if exist
    const curNode = findNode(newItems, group.id, {});
    if (curNode?.id) {
      //EDIT
      if (curNode.parent?.id != null && curNode.parent?.name != null) {
        const sourceParentNode = findNode(newItems, curNode.parent.id, {});
        const destParentNode = findNode(newItems, group.parent.id, {});
        const fChildIdx = sourceParentNode?.children?.findIndex((_ele: ProductGroup) => _ele.id === group.id);

        if ((fChildIdx && fChildIdx > -1) || fChildIdx === 0) {
          if (sourceParentNode.id === destParentNode.id) {
            if (destParentNode.children) {
              destParentNode.children[fChildIdx] = newGroup;
            } else {
              destParentNode.children = [newGroup];
            }
          }
        }
      } else {
        //root node
        const fIndex = newItems.findIndex((_ele: ProductGroup) => _ele.id === curNode.id);
        if (fIndex > -1) {
          newItems[fIndex] = newGroup;
        }
      }
    } else {
      //NEW
      if (group.parent?.id != null && group.parent?.name != null) {
        const destParentNode = findNode(newItems, group.parent.id, {});
        if (destParentNode?.id) {
          if (destParentNode.children) {
            destParentNode.children.push(newGroup);
          } else {
            destParentNode.children = [newGroup];
          }
        }
      } else {
        newItems.push(newGroup);
      }
    }
    setTreeData(newItems);
  };

  const getTreeViewSelected = () => {
    return selectedNodes;
  };

  //======================RENDER
  const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { classes, className, label, nodeId, expansionIcon: expansionIcon, icon: icon } = props;

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

    // const itemClass = `${className} ${classes.root} ${expanded ? [classes.expanded] : selected ? [classes.selected] : disabled ? [classes.disabled] : '' }`
    const itemClass = `${className} ${classes.root} 
    
    ${selected ? [classes.selected] : expanded ? [classes.expanded] : disabled ? [classes.disabled] : ''}`;

    return (
      <CustomContentRoot className={itemClass} onMouseDown={handleMouseDown} ref={ref as React.Ref<HTMLDivElement>}>
        <Box sx={{ marginRight: '10px', display: 'flex' }}>{icon}</Box>
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

  const getIsFetching = (): boolean => {
    return isGroupFetching || isProductFetching;
  };

  // load more items in parent node
  const handleLoadMore = (parent: any) => {
    const newItems = _.cloneDeep(treeData);
    const curNode: any = findNode(newItems, parent.id, {});
    if (curNode?.id) {
      setOpenNode(curNode);
      if (curNode.paging.page < curNode.paging.totalPage) {
        curNode.paging.page = curNode.paging.page + 1;
      }
      setTreeData(newItems);
    }
  };

  const renderEmptyNode = (parent: ProductGroup) => {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '30px',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'dark' ? 'divider' : 'primary.lighter',
          borderRadius: '0.25rem'
        }}
      >
        <FolderOutlined sx={{ width: '15px', marginRight: '5px' }} />
        <Typography sx={{ textOverflow: 'ellipsis' }}>No group(s) available.</Typography>
        <IconButton
          size="small"
          color="primary"
          component="label"
          onClick={() => {
            handleAddGroup(parent);
          }}
        >
          <AddCircleOutline />
        </IconButton>
      </Box>
    );
  };

  const renderTree = (nodes: any) => {
    const expansionIcon = (
      <>
        {nodes.nodeType === NODE_TYPE_GROUP ? <ChevronRightIcon fontSize="medium" /> : <FormIcon size={24} icon="item" iconType="custom" />}
      </>
    );
    const icon = (
      <>{nodes.nodeType === NODE_TYPE_GROUP && (expanded?.indexOf(nodes.id) >= 0 ? <FolderOpenOutlined /> : <FolderOutlined />)}</>
    );
    const nodeLabel = (
      <Grid sx={{ display: 'flex' }}>
        <Stack direction="row" alignItems="center" justifyItems="center">
          <Stack
            sx={{
              display: 'flex',
              flexGrow: '1',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
              textAlign: 'center',
              marginRight: '10px'
            }}
          >
            <Typography>{nodes.name}</Typography>
          </Stack>
        </Stack>
        {getIsFetching() && nodes.id === openNode?.id && <CircularProgress size={18} sx={{ ml: 1, mt: '5px' }} />}
        {nodes.nodeType === NODE_TYPE_GROUP && (
          <ButtonGroup className="tree-btn-actions" sx={{ display: 'none', marginLeft: 'auto' }}>
            <Tooltip title="Add" placement="top" disableInteractive>
              <IconButton size="small" onClick={() => handleAddGroup(nodes)}>
                <AddIcon fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="top" disableInteractive>
              <IconButton size="small" onClick={() => handleEditGroup(nodes)}>
                <EditOutlined fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove" placement="top" disableInteractive>
              <IconButton size="small" onClick={() => handleDeleteGroup(nodes.id)}>
                <DeleteOutline color="error" fontSize="small" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        )}
      </Grid>
    );

    return (
      nodes.nodeType === NODE_TYPE_GROUP && (
        <CustomTreeItem key={nodes.id} nodeId={nodes.id} label={nodeLabel} expandIcon={expansionIcon} icon={icon}>
          {Array.isArray(nodes.children) ? nodes.children.map((node: any) => renderTree(node)) : null}

          {getIsFetching() && nodes.id === openNode?.id ? '' : nodes?.children?.length === 0 ? renderEmptyNode(nodes) : ''}

          {nodes?.paging?.page < nodes.paging?.totalPage && (
            <Button fullWidth variant="text" size="small" sx={{ justifyContent: 'start', pl: 2 }} onClick={() => handleLoadMore(nodes)}>
              {`More ...`}
            </Button>
          )}
        </CustomTreeItem>
      )
    );
  };

  return (
    <Box>
      {/* <Box >  */}
      <TreeView
        className={`scroll-box`}
        aria-label="Product Group"
        sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 284px)' }}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        expanded={expanded}
        multiSelect={false}
        // selected={getTreeViewSelected()}
      >
        {treeData?.map((treeNode: any, index: number) => {
          return renderTree(treeNode);
        })}
      </TreeView>
      {/* </Box> */}

      <Button size="small" sx={{ marginTop: '20px' }} variant="text" onClick={() => handleAddGroup()} startIcon={<AddIcon />}>
        {`Add`}
      </Button>
      {isOpenWrite && (
        <WriteForm isOpen={isOpenWrite} data={selectedGroup} onSuccess={handleAfterCreateUpdate} onClose={() => setIsOpenWrite(false)} />
      )}
    </Box>
  );
};

export default ProductTree;
