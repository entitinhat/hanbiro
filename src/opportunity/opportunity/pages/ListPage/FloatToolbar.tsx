import { useEffect, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

//project
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { Delete, Download, Edit } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import * as baseComponents from '@base/config/write-field/components';
import ExportDataModal from '@base/containers/ExportData';
import { MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';

//menu
import { Opportunity } from '@opportunity/types/interfaces';
import * as keyNames from '@opportunity/config/keyNames';
import * as components from '@opportunity/config/write-field/components';
import useOpportunityDelete from '@opportunity/hooks/useOpportunityDelete';
import { useOpportunityBulkUpdate } from '@opportunity/hooks/useOpportunityUpdate';

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
  const [selectedItems, setSelectedItems] = useState<Opportunity[]>([]);
  const [showExport, setShowExport] = useState(false);

  //get current selected
  useEffect(() => {
    const nPage = itemsList.filter((o: Opportunity) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedItems?.concat(nPage));
    setSelectedItems(nSelected.filter((o: Opportunity) => checkedIds.includes(o.id)));
  }, [itemsList, checkedIds]);

  //hooks
  const mDelete = useOpportunityDelete({ onCancel, onReload });
  const mBulkUpdate = useOpportunityBulkUpdate({ onCancel, onReload });

  //restore deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];
  //more
  quickButtons = quickButtons.concat([
    {
      label: 'Bulk Update',
      value: 'BULK_UPDATE',
      icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'Mark as Opened',
          value: keyNames.KEY_NAME_OPPORTUNITY_OPENED, //?
          component: baseComponents.SwitchWrite,
          componentProps: {}
          // getValue: (value: any) => {
          //   return value?.keyName || '';
          // }
          // setValue: (value: string) => {
          //   return value;
          // }
        },
        {
          label: 'Mark as Cancelled',
          value: keyNames.KEY_NAME_OPPORTUNITY_CANCELLED, //?
          component: baseComponents.SwitchWrite,
          componentProps: {}
        },
        {
          label: 'Mark as Hold',
          value: keyNames.KEY_NAME_OPPORTUNITY_HOLD,
          component: baseComponents.SwitchWrite,
          componentProps: {},
          getValue: (value: boolean) => {
            return value ? 'CLOSE_TYPE_HOLD' : '';
          },
          setValue: (value: string) => {
            return value === 'CLOSE_TYPE_HOLD' ? true : false;
          }
        },
        {
          label: 'Sales Rep',
          value: keyNames.KEY_NAME_OPPORTUNITY_SALES_REP,
          component: components.UserAutoComplete,
          componentProps: {
            single: false,
            showAvatar: true
          },
          getValue: (value: any) => {
            return value && value.length > 0 ? value.map((_ele: any) => ({ user: { id: _ele.id, name: _ele.name } })) : [];
          },
          setValue: (value: any) => {
            return value && value.length > 0 ? value.map((_ele: any) => ({ ..._ele.user })) : [];
          }
        },
        {
          label: 'Referrer',
          value: keyNames.KEY_NAME_OPPORTUNITY_REFERRER,
          component: components.CustomerAutoComplete,
          componentProps: {
            single: true
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
          label: 'Product',
          value: keyNames.KEY_NAME_OPPORTUNITY_PRODUCT,
          component: components.ProductAutoComplete,
          componentProps: {
            single: false
          },
          getValue: (value: any) => {
            return value && value.length > 0 ? value.map((_ele: any) => ({ id: _ele.id, name: _ele.name })) : [];
          }
          // setValue: (value: any) => {
          //   return value || [];
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
        //console.log('bulk params', params);
        if (Object.keys(params).length > 0) {
          mBulkUpdate.mutate({ ids: checkedIds, opportunity: params });
        }
      }
    },
    {
      label: 'Delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    },
    {
      label: 'Export',
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => setShowExport(true)
    }
  ]);

  return (
    <>
      <BaseListBottomToolbar
        visible={!!checkedIds?.length}
        items={quickButtons.map((_button: LabelValueIcon) => ({ ..._button, label: t(_button.label) }))}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
      <ExportDataModal menu={MENU_OPPORTUNITY_OPPORTUNITY} isOpen={showExport} onClose={() => setShowExport(false)} onReload={onReload} />
    </>
  );
};

export default FloatToolbar;
