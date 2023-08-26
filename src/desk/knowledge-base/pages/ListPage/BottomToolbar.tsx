import React, { useEffect, useState } from 'react';
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { RestoreFromTrashRounded, DeleteOutlined, CheckCircleOutlined, CircleOutlined } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import useKBMutation from '@desk/knowledge-base/hooks/useKBMutation';
import { CategoryParentType, IdsCategoryFolder, KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import KBCategoryModal from '@desk/knowledge-base/containers/KBCategoryModal';
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { useReadMutation } from '@base/hooks/mark-read-unread';
import CategoryFolderSelect from '@desk/knowledge-base/containers/CategoryFolderSelect';
import useKBContentMutation from '@desk/knowledge-base/hooks/useKBContentMutation';
import useSnackBar from '@base/hooks/useSnackBar';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  isGroupByDeleted?: boolean;
  refetch?: () => void;
}

const BottomToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, isGroupByDeleted, refetch, ...restProps } = props;
  const [isOpenModal, setOpenModal] = useState(false);
  const { listQueryKey } = useListQueryKeys(MENU_DESK_KNOWLEDGE);

  const { mDelete, mUpdateCategory, mRestore, mEmpty } = useKBMutation(listQueryKey);
  // const { mUpdate: mReadUpdate } = useReadMutation();
  const { mChangePublishStatus } = useKBContentMutation();
  //SnackBars
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const handleOnDeleteCheckedRow = (ids: string[]) => {
    mDelete.mutate({ ids });
  };
  useEffect(() => {
    if (mDelete.isSuccess) {
      refetch && refetch();
      onCancel();
    }
  }, [mDelete.isSuccess]);
  const onMoveTo = (ids: string[], category: KnowledgeBaseCategory | null) => {
    const params: IdsCategoryFolder = {
      ids: ids
    };
    if (category?.type == CategoryParentType.CATEGORY) {
      params.category = { id: category?.id, name: category?.name };
    } else {
      params.category = { id: category?.category?.id, name: category?.category?.name };
      params.folder = { id: category?.id, name: category?.name };
    }
    mUpdateCategory.mutate(params);
    onCancel();
  };

  const items: LabelValueIcon[] = [
    {
      label: 'Move to',
      value: 'MOVE_TO',
      // icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'Category/Folder', // Priority
          value: 'folder',
          component: CategoryFolderSelect,
          componentProps: {
            hideTitle: true
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        const params: any = {};
        Object.keys(value).map((_keyName: string) => {
          if (value[_keyName]) {
            params[_keyName] = value[_keyName];
          }
        });
        if (Object.keys(params).length > 0) {
          mUpdateCategory.mutate(
            { ids: checkedIds, folder: { id: params?.folder?.id, name: params?.folder?.name }, category: params?.folder?.category },
            {
              onSuccess() {
                enqueueSuccessBar('Data was saved!');

                onCancel && onCancel();
                refetch && refetch();
              }
            }
          );
        }
      }
    },
    {
      label: 'ncrm_desk_knowledge_mark_as_publish',
      value: 'LOG_ACTION_MARK_AS_PUBLISH',
      icon: <CheckCircleOutlined fontSize="small" />,
      onClick: () => {
        mChangePublishStatus.mutate(
          { ids: checkedIds, isPublish: true },
          {
            onSuccess() {
              enqueueSuccessBar('Data was saved!');

              onCancel && onCancel();
              refetch && refetch();
            }
          }
        );
      }
    },
    {
      label: 'ncrm_desk_knowledge_mark_as_draft',
      value: 'LOG_ACTION_MARK_AS_DRAFT',
      icon: <CircleOutlined fontSize="small" />,
      onClick: () => {
        mChangePublishStatus.mutate(
          { ids: checkedIds, isPublish: false },
          {
            onSuccess() {
              enqueueSuccessBar('Data was saved!');
              onCancel && onCancel();
              refetch && refetch();
            }
          }
        );
      }
    },
    {
      label: 'ncrm_desk_knowledge_base_quick_button_delete',
      value: 'DELETE',
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => {
        handleOnDeleteCheckedRow(checkedIds);
      }
    }
  ];

  const itemsGroupByDeleted: LabelValueIcon[] = [
    {
      label: 'ncrm_common_restore',
      value: 'RESTORE',
      icon: <RestoreFromTrashRounded fontSize="small" />,
      onClick: () => {
        mRestore.mutate(
          { ids: checkedIds },
          {
            onSuccess() {
              onCancel && onCancel();
            }
          }
        );
      }
    },
    {
      label: 'ncrm_common_btn_empty',
      value: 'EMPTY',
      icon: <DeleteOutlined fontSize="small" />,
      onClick: () => {
        mEmpty.mutate(
          { ids: checkedIds },
          {
            onSuccess() {
              onCancel && onCancel();
            }
          }
        );
      }
    }
  ];

  return (
    <>
      {checkedIds?.length > 0 && (
        <BaseListBottomToolbar
          visible={!!checkedIds?.length}
          items={isGroupByDeleted ? itemsGroupByDeleted : items}
          checkedIds={checkedIds}
          onCancel={onCancel}
          {...restProps}
        />
      )}

      {isOpenModal && (
        <KBCategoryModal
          isOpen={isOpenModal}
          onClose={() => {
            setOpenModal(false);
          }}
          onSave={(value: KnowledgeBaseCategory | null) => {
            onMoveTo(checkedIds, value);
          }}
        />
      )}
    </>
  );
};

export default BottomToolbar;
