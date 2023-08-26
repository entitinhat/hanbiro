import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

//mui-material
import { Delete, RestoreFromTrashRounded, DeleteOutlined, Edit } from '@mui/icons-material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { CrownOutlined } from '@ant-design/icons';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { MENU_SALES, MENU_LEAD } from '@base/config/menus';
import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon } from '@base/types/app';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { WRITE_TYPE_COLLECTION } from '@settings/preferences/config/lead/constants';

//lead
import LeadMergeModal from '@lead/containers/Merge';
import CollectionMethodAutoComplete from '@lead/containers/CollectionMethodAutoComplete';
import LeadQualify from '@lead/containers/Qualify';
import { useLeadsMutation } from '@lead/hooks/useLeadsMutation';
import { LEAD_TYPE_DISQUALIFIED, LEAD_TYPE_UNQUALIFIED } from '@lead/config/constants';
import { isDeleteList } from './Helper';
interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  itemsList?: any[];
  isGroupByDeleted?: boolean;
  onReload?: () => void;
}

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;
  const layoutKey: string = `${MENU_SALES}_${MENU_LEAD}`;
  const { filterValues } = useListPageSettings(layoutKey);
  const groupBy = filterValues?.groupBy;
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);
  const { t } = useTranslation();
  const { mUpdateLeads, mDeleteLeads } = useLeadsMutation();

  //state
  const [showQualify, setShowQualify] = useState<boolean>(false);
  const [showMerge, setShowMerge] = useState(false);

  const handleClose = () => {
    setShowQualify(false);
  };

  const handleSave = () => {};

  useEffect(() => {
    if (mUpdateLeads.isSuccess || mDeleteLeads.isSuccess) {
      // Reload
      onCancel && onCancel();
      onReload && onReload();
    }
  }, [mUpdateLeads.isSuccess, mDeleteLeads.isSuccess]);

  //buttons
  let quickButtons: LabelValueIcon[] = [
    {
      label: 'ncrm_common_bulk_update',
      value: 'BulkUpdate',
      icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'sales_lead_field_basic_collectionmethod',
          value: 'collectionMethod',
          component: CollectionMethodAutoComplete,
          componentProps: {
            settingKey: WRITE_TYPE_COLLECTION, 
            placeholder: 'Select Collection Method'
          },
          getValue: (componentValue: any) => {
            return { id: componentValue?.id, name: componentValue?.name };
          },
          setValue: (value: any) => {
            return value ? value?.id : null;
          }
        },
        {
          label: 'sales_lead_field_basic_assignto',
          value: 'assignTo',
          component: UserAutoComplete,
          componentProps: {
            showAvatar: true,
            single: true
          },
          getValue: (componentValue: any) => {
            return {
              user: {
                id: componentValue?.id,
                name: componentValue?.name
              },
              group: {}
            };
          },
          setValue: (value?: any) => {
            return value?.user?.id ?? '';
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        //API to excute
        console.log('Apply value Value', value, 'to', checkedIds);

        mUpdateLeads.mutate({ lead:value, ids: checkedIds });
        // Reload
        onCancel && onCancel();
        onReload && onReload();
      }
    },
    {
      label: 'ncrm_sales_lead_qualify',
      value: 'qualify',
      icon: <PlaylistAddCheckIcon fontSize="small" />,
      onClick: () => {
        setShowQualify && setShowQualify(true);
      }
    },
    {
      label: 'ncrm_sales_lead_unqualify',
      value: 'unqualify',
      icon: <ContentPasteSearchIcon fontSize="small" />,
      onClick: () => {
        mUpdateLeads.mutate({ lead:{ type: LEAD_TYPE_UNQUALIFIED }, ids: checkedIds });
        // Reload
        onCancel && onCancel();
        onReload && onReload();
      }
    },
    // {
    //   label: 'ncrm_sales_lead_add_to_marketing_list',
    //   value: '',
    //   icon: <ListAltIcon fontSize="small" />,
    //   onClick: () => {}
    // },
    {
      label: 'sales_lead_field_basic_isprioritize',
      value: 'prioritize',
      icon: <CrownOutlined style={{ color: '#FAAD14' }} />,
      onClick: () => {
        mUpdateLeads.mutate({ lead:{ "isPrioritize": true }, ids: checkedIds });
      }
    },
    {
      label: 'ncrm_common_export',
      value: 'Export',
      icon: Icon('download'),
      onClick: () => {}
    },
    {
      label: 'ncrm_common_btn_delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {
        mDeleteLeads.mutate({ ids: checkedIds });
      }
    }
  ];

  const deleteToolbars: LabelValueIcon[] = [
    {
      label: 'ncrm_common_btn_restore',
      value: 'RESTORE',
      icon: <RestoreFromTrashRounded fontSize="small" />,
      onClick: () => {}
    },
    {
      label: 'ncrm_common_btn_empty',
      value: 'EMPTY',
      icon: <DeleteOutlined fontSize="small" />,
      onClick: () => {}
    }
  ];

  return (
    <>
      <BaseListBottomToolbar
        sx={{
          '& .MuiList-root': {
            minWidth: 340
          }
        }}
        visible={!!checkedIds?.length}
        items={isDeleteGroup ? deleteToolbars : quickButtons}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />

      {showQualify && (
      <LeadQualify 
        isOpen={showQualify}
        onClose={(qualifyData: any) => {
          console.log('showQualify', qualifyData);
          handleClose();
        }}
        leadId={checkedIds}
        leadData={itemsList}
        onCancel={onCancel}
        onReload={onReload}
       />)}
      <LeadMergeModal
        isOpen={showMerge}
        category={'all'}
        onClose={() => setShowMerge(false)}
        //defaultItems={[]}
        onReload={() => {
          onReload && onReload();
        }}
      />
    </>
  );
};

export default ListBottomToolbar;
