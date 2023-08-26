import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

// import classNames from 'classnames'; //unused classnames

// mui import
import {
  alpha,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
  useTheme,
  Tooltip
} from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemContentProps, TreeItemProps, useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AddCircleOutline, EditOutlined, Folder, FolderOpenOutlined, FolderOutlined, DeleteOutline } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

// project import
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { NODE_TYPE_GROUP, NODE_TYPE_ITEM, NODE_TYPE_PRODUCT } from '@product/main/config/constants';
import { FilterInput, IdName, PaginateInput } from '@base/types/common';
import MainCard from '@base/components/App/MainCard';

import { ProductGroup, ProductGroupPaging } from '@product/group/types/group';
import { useProductGroups } from '@product/group/hooks/useProductGroups';
import { useProducts } from '@product/product/hooks/useProducts';
import { useItems } from '@product/item/hooks/useItems';
import WriteForm from '../WriteForm';
import { useProductGroupMutation } from '@settings/preferences/hooks/product/useProductGroupMutation';
import { DESC, ASC } from '@base/config/constant';

const PAGE_SIZE = 10;

interface ProductTreeProps {
  treeId?: string;
  onSelect?: (node: any) => void;
  single?: boolean;
  haveRemoveGroup?: boolean;
  haveProductCount?: boolean;
  onlyDisplayGroup?: boolean;
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
      // backgroundColor: theme.palette.action.focus
      backgroundColor: theme.palette.primary.lighter
    },
    '&.Mui-selected &': {
      // backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      backgroundColor: theme.palette.primary.lighter
    },
    '&.Mui-selected:hover &': {
      // backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      backgroundColor: theme.palette.primary.lighter,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        // backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        backgroundColor: theme.palette.primary.lighter
      }
    },
    '&.Mui-selected.Mui-focused &': {
      // backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
      backgroundColor: theme.palette.primary.lighter
    }
  },
  '& .MuiTreeItem-iconContainer': {
    '& .MuiSvgIcon-root': { fontSize: '18px' }
  }
}));

const ProductTree = (props: ProductTreeProps) => {
  const { single = true, onSelect, haveRemoveGroup = false, haveProductCount = true, onlyDisplayGroup = false } = props;

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
        orderBy: ASC
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

  // get item by product
  const byProdId = openNode?.nodeType === NODE_TYPE_PRODUCT ? openNode.id : '';
  const paramsItems: any = {
    filter: {
      query: `prodId=${byProdId}`,
      sort: {
        field: 'createdAt',
        orderBy: ASC
      },
      paging:
        openNode?.nodeType === NODE_TYPE_PRODUCT ? { page: openNode?.paging?.page || 1, size: PAGE_SIZE } : { page: 1, size: PAGE_SIZE }
    } as FilterInput
  };
  const {
    data: itemData,
    isFetching: isItemFetching,
    isLoading: isItemLoading,
    refetch: itemRefetch
  } = useItems(paramsItems, {
    enabled: byProdId != '',
    cacheTime: 0
  });

  // console.log('openNode', openNode);
  // console.log('itemData', itemData);
  // console.log('groupData:', groupData);
  // console.log('productData:', productData);

  // set tree: group
  useEffect(() => {
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
  }, [groupData, openNode]);

  // tree: add product/group to current group
  useEffect(() => {
    if (!isProductFetching) {
      if (productData?.data && !onlyDisplayGroup) {
        // add product child + group child
        const newItems = _.cloneDeep(treeData);
        const newProductData = productData?.data?.map((_ele: ProductGroup) => ({
          ..._ele,
          nodeType: NODE_TYPE_PRODUCT,
          children: [],
          paging: { page: 1, nextPage: 1, size: 10, totalPage: 1 } //for children
        }));

        const pagingData = productData.paging;
        // find selected node
        const curNode = findNode(newItems, openNode?.id, {});
        if (curNode?.id && openNode?.nodeType === NODE_TYPE_GROUP) {
          // set node
          if (pagingData && curNode.paging && curNode?.paging.nextPage <= pagingData.totalPage) {
            if (curNode?.paging.nextPage !== 1 && curNode?.paging.nextPage === pagingData.currentPage) {
              // load more for product
              curNode.children = curNode?.children?.concat(newProductData);
            } else {
              // add group + product children
              if (groupData?.data) {
                const newGroupData = groupData.data.map((_ele: ProductGroup) => ({
                  ..._ele,
                  nodeType: NODE_TYPE_GROUP,
                  children: [],
                  paging: { page: 1, nextPage: 1, size: 10, totalPage: 1 }
                }));
                curNode.children = newGroupData.concat(newProductData);
              } else {
                // add only product children - initial
                curNode.children = newProductData;
              }
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
  }, [isProductFetching]);

  // <<< ONLY GROUP NOT USING HERE

  // tree: add item to product
  useEffect(() => {
    if (itemData?.data && !onlyDisplayGroup) {
      const newItems = _.cloneDeep(treeData);
      const newItemData = itemData.data.map((_ele: ProductGroup) => ({
        ..._ele,
        nodeType: NODE_TYPE_ITEM,
        children: [],
        paging: { page: 1, nextPage: 1, size: PAGE_SIZE, totalPage: 1 } //for children
      }));
      const pagingData = itemData.paging;
      // find selected node
      const curNode = findNode(newItems, openNode?.id, {});
      if (curNode?.id && curNode.nodeType === NODE_TYPE_PRODUCT) {
        // set node
        if (pagingData && curNode.paging && curNode.paging.nextPage <= pagingData.totalPage) {
          if (curNode.paging.nextPage !== 1 && curNode.paging.nextPage === pagingData.currentPage) {
            curNode.children = curNode?.children?.concat(newItemData);
          } else {
            curNode.children = newItemData;
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
    }
  }, [itemData]);

  // ONLY GROUP NOT USING HERE >>>

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

  const newPlaceholder = t('ncrm_common_product_group_auto_placeholder');
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
    if (activeGroup?.id) {
      setSelectedGroup({ parent: { id: activeGroup?.id, name: activeGroup?.name } as IdName } as ProductGroup);
    } else {
      setSelectedGroup(undefined);
    }
    setIsOpenWrite(true);
  };

  const handleEditGroup = (editGroup: ProductGroup) => {
    setSelectedGroup(editGroup);
    setIsOpenWrite(true);
  };

  const handleDeleteGroup = (id: string) => {
    mDelete.mutate({ ids: [id] });
  };
  useEffect(() => {
    if (mDelete.isSuccess) {
      handleAfterDelete(mDelete.data.ids[0]);
      groupRefetch();
      productRefetch();
      mDelete.isSuccess = !mDelete.isSuccess;
    }
  }, [mDelete.isSuccess]);

  // TREE VIEW

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    const cNode = findNode(treeData, nodeId, {});
    setSelectedNodes(nodeId);
    onSelect && onSelect(cNode);
  };

  // new/update folder
  const handleAfterCreateUpdate = (group: any) => {
    /**
     * parent !== null --> destination is parent
     * source: findNode
     */
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
      if (curNode.parent) {
        const sourceParentNode = findNode(newItems, curNode.parent.id, {}); //this is current Parent
        const destParentNode = findNode(newItems, group.parent.id, {}); //this is new Parent
        const fChildIdx = sourceParentNode?.children?.findIndex((_ele: ProductGroup) => _ele.id === group.id);
        if (fChildIdx && fChildIdx > -1) {
          if (sourceParentNode.id === destParentNode.id) {
            destParentNode.children![fChildIdx]! = newGroup;
          } else {
            sourceParentNode?.children?.splice(fChildIdx, 1); //remove from source
            //add to destination
            if (destParentNode.children) {
              destParentNode.children.push(newGroup);
            } else {
              destParentNode.children = [newGroup];
            }
          }
        }
      } else {
        //root node
        const fIndex = newItems.findIndex((_ele: ProductGroup) => _ele.id === group.id);
        if (fIndex > -1) {
          newItems[fIndex] = newGroup;
        }
      }
    } else {
      //NEW
      if (group.parent) {
        const destParentNode = findNode(newItems, group.parent.id, {}); //this is new Parent
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

    const classesProps = { [classes.expanded]: expanded, [classes.selected]: selected, [classes.disabled]: disabled };
    const getClasses = Object.keys(classesProps)
      .filter((k) => classesProps[k])
      .join(' ');

    const itemClass = `${className} ${classes.root} ${getClasses}`;

    return (
      <CustomContentRoot className={itemClass} onMouseDown={handleMouseDown} ref={ref as React.Ref<HTMLDivElement>}>
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {expansionIcon}
        </div>
        <Box sx={{ marginRight: '10px', display: 'flex' }}>{icon}</Box>

        <Typography onClick={handleSelectionClick} component="div" className={classes.label}>
          {label}
        </Typography>
      </CustomContentRoot>
    );
  });

  function CustomTreeItem(props: TreeItemProps) {
    return (
      <TreeItem
        ContentComponent={CustomContent}
        // sx={{
        //   '& .MuiTreeItem-iconContainer': {
        //     '& .MuiSvgIcon-root': { fontSize: '18px' }
        //   }
        // }}
        {...props}
      />
    );
  }

  const getIsFetching = (): boolean => {
    return isGroupFetching || isProductFetching || isItemFetching;
  };

  const getIsLoading = (): boolean => {
    return isGroupLoading || isProductLoading || isItemLoading;
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
    return parent?.nodeType == 'PRODUCT' || parent?.nodeType == 'ITEM' ? (
      <></>
    ) : (
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
        <FolderOutlined sx={{ width: '15px', marginRight: '5px' }} fontSize="small" />
        <Typography sx={{ textOverflow: 'ellipsis' }}>
          {!onlyDisplayGroup ? t('ncrm_common_no_folder_available') : t('ncrm_common_no_group_available')}
        </Typography>
        <IconButton
          size="small"
          color="primary"
          component="label"
          onClick={() => {
            handleAddGroup(parent);
          }}
        >
          <AddCircleOutline sx={{ width: '15px' }} />
        </IconButton>
      </Box>
    );
  };

  const renderTree = (nodes: any) => {
    const expansionIcon = (
      <>
        {nodes.nodeType !== NODE_TYPE_ITEM ? (
          <ChevronRightIcon fontSize="large" />
        ) : (
          <FormIcon fontSize="small" icon="item" iconType="custom" />
        )}
      </>
    );
    const icon = (
      <>
        {nodes.nodeType === NODE_TYPE_GROUP &&
          (expanded?.indexOf(nodes.id) >= 0 ? <FolderOpenOutlined fontSize="small" /> : <FolderOutlined fontSize="small" />)}
        {nodes.nodeType === NODE_TYPE_PRODUCT && !onlyDisplayGroup && (
          // <FormIcon size={24} fontSize={'small'} icon="product" iconType="main" />
          <FormIcon fontSize="small" icon="product" iconType="main" />
        )}
      </>
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
              marginRight: '10px',
              marginLeft: nodes.nodeType === NODE_TYPE_ITEM ? 1 : 0
            }}
          >
            <Typography>{nodes.name}</Typography>
          </Stack>

          {haveProductCount && (
            <Stack>
              {nodes.nodeType !== NODE_TYPE_ITEM && (
                <Typography
                  sx={{
                    px: '5px',
                    backgroundColor: theme.palette.common.black,
                    color: theme.palette.common.white,
                    borderRadius: '4px'
                  }}
                >
                  {nodes.nodeType === NODE_TYPE_GROUP ? nodes.countProducts : nodes.countItems}
                </Typography>
              )}
            </Stack>
          )}
        </Stack>
        {getIsFetching() && nodes.id === openNode?.id && <CircularProgress size={18} sx={{ ml: 1, mt: '5px' }} />}
        {nodes.nodeType === NODE_TYPE_GROUP && (
          <ButtonGroup className="tree-btn-actions" sx={{ display: 'none', marginLeft: 'auto' }}>
            <Tooltip title={t('ncrm_common_tooltip_title_add')} placement="top" disableInteractive>
              <IconButton size="small" onClick={() => handleAddGroup(nodes)}>
                <AddIcon fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('ncrm_common_tooltip_title_edit')} placement="top" disableInteractive>
              <IconButton size="small" onClick={() => handleEditGroup(nodes)}>
                <EditOutlined fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>

            {haveRemoveGroup && (
              <Tooltip title={t('ncrm_common_tooltip_title_remove')} placement="top" disableInteractive>
                <IconButton size="small" onClick={() => handleDeleteGroup(nodes.id)}>
                  <DeleteOutline color="error" fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </ButtonGroup>
        )}
      </Grid>
    );

    return (
      <CustomTreeItem key={nodes.id} nodeId={nodes.id} label={nodeLabel} expandIcon={expansionIcon} icon={icon}>
        {Array.isArray(nodes.children) ? nodes.children.map((node: any) => renderTree(node)) : null}
        {getIsFetching() && nodes.id === openNode?.id ? '' : nodes?.children?.length === 0 ? renderEmptyNode(nodes) : ''}
        {nodes?.paging?.page < nodes.paging?.totalPage && (
          <Button fullWidth variant="text" size="small" sx={{ justifyContent: 'start', pl: 2 }} onClick={() => handleLoadMore(nodes)}>
            {t('ncrm_common_btn_more')}
          </Button>
        )}
      </CustomTreeItem>
    );
  };

  return (
    <Box
      sx={{
        px: 2,
        pb: 2
      }}
    >
      <MainCard
        sx={{
          maxHeight: `${onlyDisplayGroup ? 'calc(100vh - 284px)' : ''}`,
          overflowY: 'auto'
        }}
      >
        <TreeView
          className={`scroll-box`}
          aria-label="Product Group Autocomplete"
          sx={{
            flexGrow: 1,
            overflowY: 'auto'
          }}
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
      </MainCard>
      <Button size="small" sx={{ marginTop: '10px' }} variant="text" onClick={() => handleAddGroup()} startIcon={<AddIcon />}>
        {t('ncrm_common_btn_add_group')}
      </Button>
      {isOpenWrite && (
        <WriteForm
          isOpen={isOpenWrite}
          data={selectedGroup}
          onSuccess={handleAfterCreateUpdate}
          onClose={() => setIsOpenWrite(false)}
          isRefetch={true}
        />
      )}
    </Box>
  );
};

export default ProductTree;
