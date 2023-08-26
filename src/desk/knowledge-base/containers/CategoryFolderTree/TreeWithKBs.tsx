import CardSkeleton from '@base/components/@hanbiro/CardSkeleton';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import NoData from '@base/components/@hanbiro/NoData';
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import { FilterInput, WriteOption } from '@base/types/common';

import { findNode } from '@base/utils/helpers';
import useKBCategoryMutation from '@desk/knowledge-base/hooks/useKBCategoryMutation';
import { useKnowledgeBaseCategories } from '@desk/knowledge-base/hooks/useKnowledgeBaseCategories';
import { useKnowledgeBaseList } from '@desk/knowledge-base/hooks/useKnowledgeBaseList';
import { CategoryParentType, DisplayType, KnowledgeBase, KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { AddCircleOutline, DeleteOutline, EditOutlined, ExpandMore, FolderOutlined, HttpsOutlined } from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  ListItem,
  styled,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { cyan, lightBlue, red } from '@mui/material/colors';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import WriteCategoryForm from '../WriteCategoryForm';
import WriteFolderForm from '../WriteFolderForm';
import { authAtom } from '@base/store/atoms/auth';
import { getParseFilterQuery } from '@desk/knowledge-base/pages/ListPage/Helper';
import useKnowledgeBaseMutation from '@desk/knowledge-base/hooks/useKnowledgeBaseMutation';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';

const ToolTipButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""', //I found out that the content attribute needed to be double quoted like this
    width: '100%',
    height: '2px',
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%) scale(0)',
    transition: 'transform .2s ease-in-out',
    transformOrigin: 'top',
    background: red[600],
    borderRadius: '2px',
    fontFamily: 'Roboto,sans-serif',
    fontWeight: '400',
    zIndex: '9999999999999',
    whiteSpace: 'nowrap'
  },
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));
const ToolTipIcon = styled('svg')(({ theme }) => ({
  '&:hover': {
    color: lightBlue[900],
    transform: 'scale(1.125)'
  },
  color: cyan[600],
  fontSize: 17,
  transition: 'all 0.1s ease-in-out'
}));
interface CategoryFolderTreeProps {
  treeId: string;
  editable?: boolean;
  onSelect?: (category: KnowledgeBaseCategory | null) => void;
}

const CategoryFolderTree = (props: CategoryFolderTreeProps) => {
  const { treeId, editable = true, onSelect } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const [auth] = useRecoilState(authAtom);
  const USER_ID = '22779486-f43a-4530-b77f-31a932dd0a23';

  //state
  const [openCategory, setOpenCategory] = useState<KnowledgeBaseCategory | null | undefined>(null);
  const [openFolder, setOpenFolder] = useState<KnowledgeBaseCategory | null | undefined>(null);
  const [openCategoryArray, setOpenCategoryArray] = useState<string[]>([]);
  const [openFolderArray, setOpenFolderArray] = useState<string[]>([]);
  const [openDepth, setOpenDepth] = useState<number>(-1);
  const [treeData, setTreeData] = useState<KnowledgeBaseCategory[]>([]);
  const [deletedItem, setDeletedItem] = useState<any>(null);
  const [deletedDepth, setDeletedDepth] = useState<number>(-1);
  const [deletedParent, setDeletedParent] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null); //highlight
  const [paging, setPaging] = useState<{
    page: number;
    size: number;
  }>({
    page: 1,
    size: 99
  });

  //recoil
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: MENU_DESK_KNOWLEDGE, isOpenWrite: false, writeParam: {} });

  //mutation
  const { mDeleteCategory, mSortCategory, mUpdateCategory } = useKBCategoryMutation();
  const { mUpdateKB } = useKnowledgeBaseMutation();
  //hook to get categories-folders
  const {
    data: postData,
    isLoading: isCategoryLoading,
    isFetching,
    refetch: refetch
  } = useKnowledgeBaseCategories({
    categoryId: openCategory?.id || '',
    folderParentId: openFolder?.id || '',
    paging: paging
  });
  //hook to get KBs

  const listQuerySchema = `
  id
  subject
  category {
    id
    name
  }
  isPublish
  folder {
    id
    name
  }
  `;
  const filtersQuery: FilterInput = {
    keyword: '',
    paging: paging,
    query: getParseFilterQuery('', '', openFolder?.id, auth.user?.id ?? USER_ID)
  };
  const { data: listData, isLoading: isKBLoading } = useKnowledgeBaseList(listQuerySchema, {
    filter: filtersQuery
  });

  //set tree: category/folder
  useEffect(() => {
    const newItems = _.cloneDeep(treeData); // [...treeData];

    if (postData?.data) {

      if (openDepth === -1) {
        setTreeData(_.cloneDeep(postData.data));
        return;
      } else {
        //add to folder
        const openId = openDepth === 0 ? openCategory?.id ?? '' : openFolder?.id ?? '';
        let openNode = findNode(newItems, openId, {});
        if (openNode) {
          const nUniqueList = openNode.children
            ? getUniqueItemsById<KnowledgeBaseCategory>([...openNode.children, ...postData?.data])
            : postData?.data;
          openNode.children = nUniqueList;
        }
      }
    }
    if (listData?.data && openFolder) {

      if (openDepth === -1) {
        // setTreeData(_.cloneDeep(postData.data));
      } else {
        //add to folder
        var updatedList = listData?.data.map((item) => ({ ...item, type: 'TYPE_ARTICLE' }));
        const openId = openDepth === 0 ? openCategory?.id ?? '' : openFolder?.id ?? '';
        let openNode = findNode(newItems, openId, {});
        if (openNode) {
          const nUniqueList = openNode.children ? getUniqueItemsById<KnowledgeBase>([...openNode.children, ...updatedList]) : updatedList;
          openNode.children = nUniqueList;
        }
      }
    }
    setTreeData(newItems);
  }, [postData, listData]);
  // useEffect(() => {
  //   if (listData?.data && openFolder) {

  //     if (openDepth === -1) {
  //       // setTreeData(_.cloneDeep(postData.data));
  //     } else {
  //       //add to folder
  //       var updatedList = listData?.data.map((item) => ({ ...item, type: 'TYPE_ARTICLE' }));
  //       const newItems = _.cloneDeep(treeData); // [...treeData];
  //       const openId = openDepth === 0 ? openCategory?.id ?? '' : openFolder?.id ?? '';
  //       let openNode = findNode(newItems, openId, {});
  //       if (openNode) {
  //         const nUniqueList = openNode.children ? getUniqueItemsById<KnowledgeBase>([...openNode.children, ...updatedList]) : updatedList;
  //         openNode.children = nUniqueList;
  //         setTreeData(newItems);
  //       }
  //     }
  //   }
  // }, [listData]);

  //check create success
  useEffect(() => {
    if (mDeleteCategory.isSuccess) {
      const newItems = [...treeData];
      if (deletedDepth === 0) {
        //delete root
        const fIndex = newItems.findIndex((_ele: any) => _ele.id === deletedItem.id);
        newItems.splice(fIndex, 1);
      } else {
        //delete node
        const parentNode = findNode(newItems, deletedParent.id, {});
        const fIndex = parentNode.children.findIndex((_ele: any) => _ele.id === deletedItem.id);
        parentNode.children.splice(fIndex, 1);
      }
      setTreeData(newItems);
      //reset
      setDeletedDepth(-1);
      setDeletedItem(null);
      setDeletedParent(null);
    }
  }, [mDeleteCategory.isSuccess]);
  /** ===================================== ULTIL ==================================== */
  function getUniqueItemsById<T extends { id: string }>(items: T[]) {
    const arrUniq = [...new Map(items.map((v) => [v.id, v])).values()];
    return arrUniq;
  }
  /** ===================================== HANDLER ==================================== */
  //drag end
  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    if (type !== 'FOLDER0') {
      //re-order folder
      const newItems = [...treeData];
      const sourceNode = findNode(newItems, source.droppableId, {});
      const destinationNode = findNode(newItems, destination.droppableId, {});

      const [removedItem] = sourceNode?.children?.splice(source.index, 1);

      if (sourceNode) {
        if (destinationNode.children) {
          destinationNode.children.splice(destination.index, 0, removedItem);
        } else {
          destinationNode.children = [removedItem];
        }
      }


      setTreeData(newItems);
      if (removedItem.type === 'TYPE_ARTICLE') {
        const destinationItem = destinationNode.children[destination.index];

        mUpdateKB.mutate({
          knowledgebase: {
            category: destinationNode?.category,
            folder: { id: destinationNode?.id, name: destinationNode?.name },
            id: removedItem?.id
          }
        });
      } else {
        if (sourceNode.id === destinationNode.id) {
          //update to DB
          //1. if the same parent: sourceNode.id === destinationNode.id, sort
          const params = destinationNode.children.map((_ele: any) => _ele.id);
          mSortCategory.mutate({ ids: params });
        }
        //2. if different parent sourceNode.id !== destinationNode.id, update
        if (sourceNode.id !== destinationNode.id) {
          //change parent
          const destinationItem = destinationNode.children[destination.index];
          const params: any = {
            id: destinationItem.id,
            order: destination.index
          };
          if (destinationNode.category) {
            //destinationNode is folder
            params.category = {
              id: destinationNode.category.id,
              name: destinationNode.category.name
            };
            params.parent = {
              id: destinationNode.id,
              name: destinationNode.name
            };
          } else {
            //destinationNode is category
            params.category = {
              id: destinationNode.id,
              name: destinationNode.name
            };
          }
          mUpdateCategory.mutate({ category: params });

          //change sort
          //const sortParams = destinationNode.children.map((_ele: any) => _ele.id);
          //mSortCategory.mutate({ ids: sortParams });
        }
      }
    } else {
      //re-order root
      const newItems = [...treeData];
      const [removedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removedItem);
      setTreeData(newItems);
      //update to DB
      const params = newItems.map((_ele: any) => _ele.id);
      mSortCategory.mutate({ ids: params });
    }
  };

  //edit item
  const handleEditItem = (parent: any, item: KnowledgeBaseCategory, depth: number) => {
    if (depth === 0) {
      setWriteOption((curOption) => ({
        ...curOption,
        isOpenWrite: true,
        writeType: 'category',
        writeParam: item
      }));
    } else {
      setWriteOption((curOption) => ({
        ...curOption,
        isOpenWrite: true,
        writeType: 'folder',
        writeParam: { ...item, parent }
      }));
    }
  };

  //delete
  const handleDeleteItem = (parent: any, item: KnowledgeBaseCategory, depth: number) => {
    mDeleteCategory.mutate({ ids: [item.id] });
    setDeletedDepth(depth);
    setDeletedItem(item);
    setDeletedParent(parent);
  };

  //get folders
  const handleGetFolders = (parent: any, item: KnowledgeBaseCategory, depth: number) => {
    //-----------handle expand---------------------
    let newopenCategoryArray = openCategoryArray;
    let newopenFolderArray = openFolderArray;
    if (item?.type == CategoryParentType.CATEGORY) {
      if (newopenCategoryArray.includes(item.id)) {
        newopenCategoryArray = newopenCategoryArray.filter((id: any) => id !== item.id);
      } else {
        newopenCategoryArray.push(item.id);
      }
    }
    setOpenCategoryArray([...newopenCategoryArray]);
    if (item?.type == CategoryParentType.FOLDER) {
      if (newopenFolderArray.includes(item.id)) {
        newopenFolderArray = newopenFolderArray.filter((id: any) => id !== item.id);
      } else {
        newopenFolderArray.push(item.id);
      }
    }
    setOpenFolderArray([...newopenFolderArray]);
    //-----------------------------------------------
    setOpenDepth(depth);
    //if item is category and its has children we dont need fetch data to get children of it
    if (depth === 0 && !item?.children) {
      setOpenFolder(null);
      setOpenCategory(item); //item is category, parent = null
    } else if (item?.type == CategoryParentType.FOLDER) {
      setOpenFolder(item); //item is folder, parent is category or folder
      setOpenCategory(item.category);
    }
  };
  //new/update category
  const handleAfterCreateCategory = (category: KnowledgeBaseCategory) => {
    const newItems = [...treeData];
    const fIndex = newItems.findIndex((_ele: any) => _ele.id === category.id);
    if (fIndex > -1) {
      newItems[fIndex] = category;
    } else {
      newItems.push(category);
    }
    setTreeData(newItems);
  };

  //new/update folder
  const handleAfterCreateFolder = (folder: any) => {
    /**
     * folder belongs to folder (category/parent !== null) --> destination is parent
     * folder belongs to category (category !== null, parent === null) --> destination is category
     * source: findNode
     */
    const newItems = _.cloneDeep(treeData);
    //1. delete in source
    const folderNode = findNode(newItems, folder.id, {});
    if (folderNode?.id) {
      const sourceParentId = folderNode.parent ? folderNode.parent.id : folderNode.category.id; //belongs to folder or category
      const sourceParentNode = findNode(newItems, sourceParentId, {});
      const fFolderIdx = sourceParentNode.children.findIndex((_ele: any) => _ele.id === folder.id);
      if (fFolderIdx > -1) {
        sourceParentNode.children.splice(fFolderIdx, 1);
      }
    }
    //2. add to destination
    const destParentId = folder.parent ? folder.parent.id : folder.category.id; //belongs to folder or category
    const destParentNode = findNode(newItems, destParentId, {}); //this is new Parent
    if (destParentNode?.id) {
      if (destParentNode.children) {
        const fFolderIndex = destParentNode.children.findIndex((_ele: any) => _ele.id === folder.id);
        if (fFolderIndex > -1) {
          destParentNode.children[fFolderIndex] = folder;
        } else {
          destParentNode.children.push(folder);
        }
      } else {
        destParentNode.children = [folder];
      }
    }
    setTreeData(newItems);
  };

  //selected node
  const handleSelectNode = (item: KnowledgeBaseCategory) => {
    if (item.id !== selectedItem?.id) {
      setSelectedItem(item);
      onSelect && onSelect(item);
    } else {
      setSelectedItem(null);
      onSelect && onSelect(null);
    }
  };

  /** ===================================== DEBUG ==================================== */
  // console.log('~~~~~~ treeData', treeData);
  /** ===================================== END DEBUG ==================================== */

  /** ===================================== RENDER ==================================== */
  //render item
  const renderNode = (parent: any, node: any, depth: number, dragHandleProps: any) => {
    const isCategoryOpened = node.type == CategoryParentType.CATEGORY && openCategoryArray.includes(node.id);
    const isFolderOpened = node.type == CategoryParentType.FOLDER && openFolderArray.includes(node.id);
    const isOpened = isCategoryOpened || isFolderOpened;


    return (
      <ListItem
        sx={{
          dipslay: 'flex',
          alignItems: 'center',
          width: '100%',
          height: depth !== 2 ? '35px' : '20px',
          overflow: 'hidden',
          '&:hover .tree-btn-actions': {
            visibility: 'visible'
          },
          '&:hover': {
            backgroundColor: theme.palette.secondary.lighter
          },
          padding: 0,
          borderRadius: '0.25rem',
          marginBottom: '3px',
          position: 'relative',
          backgroundColor:
            selectedItem?.id === node.id && depth == 0
              ? lightBlue[100]
              : selectedItem?.category?.id === node.id
              ? lightBlue[100]
              : 'transparent',
          color: selectedItem?.id === node.id && depth !== 0 ? theme.palette.primary.main : theme.palette.text.primary
        }}
      >
        {editable && (
          <Tooltip title={t('ncrm_common_tooltip_title_drag_to_move')}>
            <IconButton className="tree-btn-actions" sx={{ visibility: 'hidden' }} disableRipple {...dragHandleProps}>
              <FormIcon icon="move" iconType="icon" size={14} />
            </IconButton>
          </Tooltip>
        )}
        {depth === 0 && (
          <>
            <IconButton disableRipple sx={{ cursor: 'default', paddingLeft: 0 }}>
              <FormIcon size={14} icon="category" iconType="icon" />
            </IconButton>
          </>
        )}
        {depth !== 0 && (
          <IconButton disableRipple sx={{ cursor: 'default', paddingLeft: 0 }}>
            {node?.type == 'TYPE_ARTICLE' ? (
              <>
                {node?.isPublish ? (
                  <FormIcon size={14} icon="article" iconType="icon" />
                ) : (
                  <FormIcon size={14} icon="draft_article" iconType="icon" color={'error'} />
                )}
              </>
            ) : (
              <FormIcon size={14} icon="kb_folder" iconType="icon" />
            )}
          </IconButton>
        )}

        <Box
          sx={{ display: 'flex', flexGrow: '1', cursor: 'pointer', textAlign: 'center' }}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectNode(node);
          }}
        >
          <Tooltip title={node?.name ?? node?.subject}>
            <Typography
              fontSize={depth == 0 ? 14 : 12}
              sx={{ wordBreak: 'no-break', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {node?.name?.length > 50 ? `${node.name.substring(0, 50)}...` : node?.name ?? node?.subject}
            </Typography>
          </Tooltip>

          {node?.display === DisplayType.PRIVATE && <HttpsOutlined sx={{ color: 'primary.main', fontSize: 20, marginLeft: '10px' }} />}
        </Box>
        <ButtonGroup
          size="small"
          className="tree-btn-actions"
          sx={{
            visibility: 'hidden',
            backgroundColor: theme.palette.secondary.lighter
          }}
        >
          {editable && (
            <>
              <Tooltip title={t('ncrm_common_tooltip_title_edit')}>
                <ToolTipButton
                  sx={{ height: '16px', width: '16px', mr: '6px' }}
                  size="small"
                  onClick={() => handleEditItem(parent, node, depth)}
                >
                  {/* <Edit2 /> */}
                  <EditOutlined sx={{ height: '16px', width: '16px' }} fontSize="small" color="inherit" />
                </ToolTipButton>
              </Tooltip>
              <Tooltip title={t('ncrm_common_tooltip_title_delete')}>
                <ToolTipButton sx={{ height: '16px', width: '16px' }} size="small" onClick={() => handleDeleteItem(parent, node, depth)}>
                  <DeleteOutline sx={{ height: '16px', width: '16px' }} fontSize="small" color="error" />
                </ToolTipButton>
              </Tooltip>
            </>
          )}
        </ButtonGroup>
        {node?.type !== 'TYPE_ARTICLE' && (node?.hasChild || depth < 2) && (
          <>
            {/* {isFetching && <CircularProgress />} */}
            <IconButton
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent'
                },
                marginLeft: '10px',
                ...(!(node?.hasChild || editable) && {
                  visibility: 'hidden'
                })
              }}
              size="small"
              onClick={(event: any) => {
                event.stopPropagation();
                handleGetFolders(parent, node, depth);
              }}
            >
              <ExpandMore
                sx={{
                  transform: 'rotate(-90deg)',
                  '&:hover': {
                    // color: theme.palette.secondary.dark,
                    transform: 'scale(1.125)'
                  },
                  color: theme.palette.secondary.dark,
                  fontSize: 17,
                  transition: 'all 0.1s ease-in-out',
                  ...(isOpened && {
                    transform: 'rotate(0deg)'
                  })
                }}
              />
            </IconButton>
          </>
        )}
      </ListItem>
    );
  };

  //empty node
  const renderEmptyNode = (parent: any) => {
    return (
      <>
        {(isCategoryLoading || isKBLoading) && parent.id == openFolder?.id ? (
          <Box sx={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={20} />
          </Box>
        ) : (
          <Draggable key={'-1'} draggableId={'-1'} index={-1} isDragDisabled={true}>
            {(provided, snapshot) => (
              <ListItem
                sx={{
                  display: 'flex',
                  height: '30px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'rgb(207 214 228 / 42%)',
                  backgroundColor: alpha(cyan[100], 0.42),
                  borderRadius: '0.25rem'
                }}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <FolderOutlined sx={{ width: '15px', marginRight: '5px' }} />
                <Typography fontSize={12} sx={{ textOverflow: 'ellipsis' }}>
                  {t('ncrm_desk_knowledge_base_no_folder')}
                </Typography>
                <Tooltip title={t('ncrm_common_tooltip_title_add')}>
                  <IconButton
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      },
                      padding: '6px 15px',
                      width: 'auto',
                      height: 'auto'
                    }}
                    color="primary"
                    onClick={() => {
                      //setSelectedFolder({ parent });
                      setWriteOption((curOption) => ({
                        ...curOption,
                        isOpenWrite: true,
                        writeType: 'folder',
                        writeParam: { parent }
                      }));
                    }}
                  >
                    <AddCircleOutline sx={{ fontSize: '17px' }} />
                  </IconButton>
                </Tooltip>
              </ListItem>
            )}
          </Draggable>
        )}
      </>
    );
  };

  //all tree
  //TODO: using isCombineEnabled prop to add parent-child, but NOW it doesn't support to move child to parent
  const renderTree = (parent: any, children: any[], depth: number) => {
    return (
      <>
        <Droppable droppableId={parent ? parent.id : 'node-root'} type={'FOLDER' + depth}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              sx={{
                padding: snapshot.isDraggingOver ? '0 0 0 5px' : 0,
                backgroundColor: snapshot.isDraggingOver ? alpha(cyan[200], 0.3) : 'transparent',
                overflowX: snapshot.isDraggingOver ? 'hidden' : 'auto',
                overflowY: 'auto'
              }}
            >
              {children.map((_item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <Draggable key={_item.id} draggableId={_item.id} index={index} isDragDisabled={!editable}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            ...provided.draggableProps.style,
                            padding: snapshot.isDragging ? 0 : '3px',
                            borderRadius: snapshot.isDragging ? '4px' : 0,
                            backgroundColor: snapshot.isDragging ? cyan[200] : 'transparent'
                          }}
                        >
                          {renderNode(parent, _item, depth, provided.dragHandleProps)}
                          <Collapse
                            timeout="auto"
                            key={'node' + treeId + _item.id}
                            in={
                              (_item.type == CategoryParentType.CATEGORY && openCategoryArray.includes(_item.id)) ||
                              (_item.type == CategoryParentType.FOLDER && openFolderArray.includes(_item.id))
                            }
                            sx={{ marginLeft: depth == 0 ? '5px' : '20px' }}
                          >
                            {renderTree(_item, _item?.children || [], depth + 1)}
                          </Collapse>
                        </Box>
                      )}
                    </Draggable>
                    {depth === 0 && <Divider />}
                  </React.Fragment>
                );
              })}
              {/* create an empty droppable area in case empty children depth === 1 && */}
              {children.length === 0 && editable && depth < 3 && renderEmptyNode(parent)}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </>
    );
  };

  //tree context
  const TreeMemo = useMemo(() => {
    return <DragDropContext onDragEnd={handleDragEnd}>{renderTree(null, treeData, 0)}</DragDropContext>;
  }, [treeData, isFetching, selectedItem, openCategoryArray.length, openFolderArray.length]);

  return (
    <Box sx={{ padding: '10px' }}>
      {mDeleteCategory.isLoading && <CircularProgress />}
      {treeData.length === 0 && isFetching && <CardSkeleton />}
      {treeData.length > 0 && TreeMemo}
      {treeData.length === 0 && !isFetching && <NoData icon="Folder" />}
      {writeOption.isOpenWrite && writeOption.writeType === 'category' && (
        <WriteCategoryForm
          isOpen={writeOption.isOpenWrite}
          onClose={() => {
            setWriteOption((curOption) => ({
              ...curOption,
              isOpenWrite: false
            }));
          }}
          data={writeOption.writeParam}
          onReload={handleAfterCreateCategory}
        />
      )}
      {writeOption.isOpenWrite && writeOption.writeType === 'folder' && (
        <WriteFolderForm
          isOpen={writeOption.isOpenWrite}
          onClose={() => {
            setWriteOption((curOption) => ({
              ...curOption,
              isOpenWrite: false
            }));
          }}
          data={writeOption.writeParam}
          onReload={handleAfterCreateFolder}
        />
      )}
    </Box>
  );
};

export default CategoryFolderTree;
