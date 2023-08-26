import { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete, Download, Edit, Merge, ManageAccounts, GroupAdd, GroupRemove, Print } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import * as baseComponents from '@base/config/write-field/components';
import AssignRepModal from '@base/containers/AssignRepModal';
// import { useReadMutation } from '@base/hooks/mark-read-unread';
// import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
// import { MENU_CUSTOMER_ALL } from '@base/config/menus';
import { User } from '@base/types/user';
import ExportDataModal from '@base/containers/ExportData';
import { MENU_CUSTOMER } from '@base/config/menus';

//menu
import * as keyNames from '@customer/config/keyNames';
import { Customer } from '@customer/types/interface';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import useCustomerDelete from '@customer/hooks/useCustomerDelete';
import { useCustomerCreateAssignRep, useCustomerDeleteRep } from '@customer/hooks/useCustomerAssignReps';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL } from '@customer/config/constants';
import CustomerMergeModal from '@customer/containers/Merge';
import PrintPreviewList from '@customer/containers/PrintPreviewList';
import { useCustomerBulkUpdate } from '@customer/hooks/useCustomerUpdate';

interface FloatToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean;
  onReload?: () => void;
}

const FloatToolbar = (props: FloatToolbarProps) => {
  const { category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;
  const { t } = useTranslation();
  //state
  const [selectedItems, setSelectedItems] = useState<Customer[]>([]);
  const [showMerge, setShowMerge] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [repAction, setRepAction] = useState('');
  const [allReps, setAllReps] = useState<User[]>([]);
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;

  //get current reps
  useEffect(() => {
    if (repAction === 'CHANGE_REP' || repAction === 'DELETE_REP') {
      let newReps: User[] = [];
      itemsList.map((_item: any) => {
        if (checkedIds.includes(_item.id)) {
          _item.assignTo?.map((_assign: User) => {
            const fIdx = newReps.findIndex((_rep: User) => _rep.id === _assign.id);
            if (fIdx === -1) {
              newReps.push(_assign);
            }
          });
        }
      });
      setAllReps(newReps);
    }
  }, [showModal, repAction]);

  //get current selected
  useEffect(() => {
    const nPage = itemsList.filter((o: Customer) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedItems?.concat(nPage));
    setSelectedItems(nSelected.filter((o: Customer) => checkedIds.includes(o.id)));
  }, [itemsList, checkedIds]);

  //hooks
  const mDelete = useCustomerDelete({ category, onCancel, onReload });
  const mAssignRep = useCustomerCreateAssignRep({ onClose: () => setShowModal(false), onCancel, onReload });
  const mDeleteRep = useCustomerDeleteRep({ onClose: () => setShowModal(false), onCancel, onReload });
  const mBulkUpdate = useCustomerBulkUpdate({ onCancel, onReload });
  //const { mUpdate: mReadUpdate } = useReadMutation();

  //restore deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
  };

  //open List Print Preview
  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  //assign reps
  const handleAssignChange = (selectedReps: User[]) => {
    if (selectedReps && selectedReps.length > 0) {
      if (repAction === 'CHANGE_REP' || repAction === 'ADD_REP') {
        const params: any = {
          ids: checkedIds,
          assignTo: selectedReps.map((_rep: User) => ({
            user: {
              id: _rep.id,
              name: _rep.name
            },
            group: { id: '', name: '' }
          }))
        };
        mAssignRep.mutate(params);
      }
    }
    if (repAction === 'DELETE_REP') {
      const remainRepIds = selectedReps.map((_rep: any) => _rep.id);
      const deletedReps = allReps.filter((_ele: any) => !remainRepIds.includes(_ele.id));
      if (deletedReps.length > 0) {
        const params: any = {
          ids: checkedIds,
          repIds: deletedReps.map((_rep: any) => _rep.id)
        };
        mDeleteRep.mutate(params);
      }
    }
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];
  //bulk update
  quickButtons = quickButtons.concat([
    {
      label: 'Bulk Update',
      value: 'BULK_UPDATE',
      icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'ncrm_customer_filter_customertype',
          value: keyNames.KEY_NAME_CUSTOMER_TYPE,
          component: baseComponents.DataSourceSelect,
          componentProps: {
            single: true,
            sourceKey: 'customer_category',
            sourceType: 'field',
            keyOptionValue: 'keyName',
            keyOptionLabel: 'languageKey'
          },
          getValue: (value: any) => {
            return value?.keyName || '';
          }
          // setValue: (value: string) => {
          //   return value;
          // }
        },
        {
          label: 'ncrm_customer_filter_industry',
          value: keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
          component: baseComponents.DataSourceSelect,
          componentProps: {
            single: false,
            sourceKey: 'industry',
            sourceType: 'field',
            keyOptionValue: 'keyName',
            keyOptionLabel: 'languageKey'
          },
          getValue: (value: any) => {
            return value && value.length > 0
              ? value.map((_ele: any) => ({
                  id: _ele.keyName,
                  name: _ele.languageKey
                }))
              : null;
          },
          setValue: (value: any) => {
            return value ? value.map((_ele: any) => _ele.id) : [];
          }
        },
        {
          label: 'ncrm_customer_filter_rating',
          value: keyNames.KEY_NAME_CUSTOMER_RATING,
          component: baseComponents.DataSourceSelect,
          componentProps: {
            single: true,
            sourceKey: 'customer_rating',
            sourceType: 'field',
            keyOptionValue: 'id',
            keyOptionLabel: 'languageKey'
          },
          getValue: (value: any) => {
            return value
              ? {
                  id: value.id,
                  name: t(value.languageKey)
                }
              : null;
          }
          // setValue: (value: string) => {
          //   return value?.split(',') || [];
          // }
        },
        {
          label: 'Parent Account',
          value: keyNames.KEY_NAME_CUSTOMER_PARENT_ACCOUNT,
          component: CustomerAutoComplete,
          componentProps: {
            single: true,
            category: CUSTOMER_CATEGORY_ACCOUNT
          },
          getValue: (value: any) => {
            return value
              ? {
                  id: value.id,
                  name: value.name
                }
              : null;
          }
          // setValue: (value: string) => {
          //   //return value ? value.split(',') : [];
          // }
        },
        {
          label: 'SLA',
          value: keyNames.KEY_NAME_CUSTOMER_SLA,
          component: baseComponents.DataSourceSelect,
          componentProps: {
            single: true,
            sourceType: 'setting',
            sourceKey: 'sla',
            sourceMenu: 'desk',
            keyOptionValue: 'sla',
            keyOptionLabel: 'sla'
          },
          getValue: (value: any) => {
            return value?.sla || '';
          }
          // setValue: (value: string) => {
          //   return value;
          // }
        }
      ],
      excuteMoreAction: (value: any) => {
        //console.log('excuteMoreAction value', value);
        const params: any = {};
        Object.keys(value).map((_keyName: string) => {
          if (value[_keyName]) {
            params[_keyName] = value[_keyName];
          }
        });
        //params
        if (Object.keys(params).length > 0) {
          mBulkUpdate.mutate({ ids: checkedIds, customer: params });
        }
      }
    }
  ]);

  //add merge
  if (category !== CUSTOMER_CATEGORY_ALL && checkedIds.length > 1) {
    quickButtons.push({
      label: 'ncrm_common_merge',
      value: 'MERGE',
      icon: <Merge fontSize="small" />,
      onClick: () => setShowMerge(true)
    });
  }

  //rep actions
  quickButtons = quickButtons.concat([
    {
      label: 'Change Reps',
      value: 'CHANGE_REP',
      icon: <ManageAccounts fontSize="small" />,
      onClick: () => {
        setShowModal(true);
        setRepAction('CHANGE_REP');
      }
    },
    {
      label: 'Add Reps',
      value: 'ADD_REP',
      icon: <GroupAdd fontSize="small" />,
      onClick: () => {
        setShowModal(true);
        setAllReps([]);
        setRepAction('ADD_REP');
      }
    },
    {
      label: 'Delete Reps',
      value: 'DELETE_REP',
      icon: <GroupRemove fontSize="small" />,
      onClick: () => {
        setShowModal(true);
        setRepAction('DELETE_REP');
      }
    },
    // {
    //   label: 'ncrm_common_mark_as_read',
    //   value: 'LOG_ACTION_MARK_AS_READ',
    //   icon: <CheckCircleOutlined fontSize="small" />,
    //   onClick: () => {
    //     const logView = {
    //       action: 'LOG_ACTION_MARK_AS_READ',
    //       menu: `${MENU_CUSTOMER}_${category}`,
    //       ids: checkedIds
    //     };

    //     mReadUpdate.mutate(
    //       { logView },
    //       {
    //         onSuccess() {
    //           onCancel && onCancel();
    //           onReload && onReload();
    //         }
    //       }
    //     );
    //   }
    // },
    // {
    //   label: 'ncrm_common_mark_as_unread',
    //   value: 'LOG_ACTION_MARK_AS_UNREAD',
    //   icon: <CircleOutlined fontSize="small" />,
    //   onClick: () => {
    //     const logView = {
    //       action: 'LOG_ACTION_MARK_AS_UNREAD',
    //       menu: `${MENU_CUSTOMER}_${category}`,
    //       ids: checkedIds
    //     };

    //     mReadUpdate.mutate(
    //       { logView },
    //       {
    //         onSuccess() {
    //           onCancel && onCancel();
    //           onReload && onReload();
    //         }
    //       }
    //     );
    //   }
    // },
    // {
    //   label: 'ncrm_common_btn_print',
    //   value: 'PRINT',
    //   icon: <Print fontSize="small" />,
    //   onClick: handlePrintPreview //list
    // },
    {
      label: 'Export',
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => setShowExport(true)
    },
    {
      label: 'Delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    }
  ]);

  //get assign title
  const assignTitle = useMemo(() => {
    switch (repAction) {
      case 'CHANGE_REP':
        return 'Change Assign Rep';
      case 'DELETE_REP':
        return 'Delete Assign Rep';
      default:
        return 'Add Assign Rep';
    }
  }, [repAction]);

  return (
    <>
      <BaseListBottomToolbar
        visible={!!checkedIds?.length}
        items={quickButtons.map((_button: LabelValueIcon) => ({ ..._button, label: t(_button.label) }))}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
      <AssignRepModal
        title={assignTitle}
        isOpen={showModal}
        visibleSelect={repAction !== 'DELETE_REP'}
        onClose={() => setShowModal(false)}
        value={allReps}
        onChange={handleAssignChange}
        loading={mAssignRep.isLoading || mDeleteRep.isLoading}
      />
      <CustomerMergeModal
        isOpen={showMerge}
        category={category}
        onClose={() => setShowMerge(false)}
        defaultItems={itemsList.filter((_item: any) => checkedIds.includes(_item.id))}
        onReload={() => {
          onReload && onReload();
          onCancel([]);
        }}
      />
      <ExportDataModal menu={pageDataKey} isOpen={showExport} onClose={() => setShowExport(false)} onReload={onReload} />
      {showPrintPreview && (
        <PrintPreviewList onClose={() => setShowPrintPreview(false)} layoutData={selectedItems ?? []} isOpen={showPrintPreview} />
      )}
    </>
  );
};

export default FloatToolbar;
