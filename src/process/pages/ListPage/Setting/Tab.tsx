import _ from 'lodash';
import { useParams } from 'react-router-dom';

import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_PROCESS_BUSINESS } from '@base/config/menus';
import { useGetDefinedItems } from '@process/hooks/useDefinedItem';
import { GET_DEFINED_ITEMS } from '@process/services/custom';
import { DefinedItemType } from '@process/types/settings';
import { SettingType } from '@process/types/settings';

import PageBody from './Body';
import { getFields } from './Helper';

interface SettingTabProps {
  selectedTab: SettingType;
  selectedType: DefinedItemType;
  isSplitMode: boolean;
}

const SettingTab = (props: SettingTabProps) => {
  const { isSplitMode, selectedTab, selectedType } = props;
  const { category = MENU_PROCESS_BUSINESS } = useParams();
  const fields = getFields(selectedTab);

  const { results: listData } = useGetDefinedItems(
    GET_DEFINED_ITEMS,
    selectedTab,
    {
      type: selectedType
    },
    {
      staleTime: LIST_STALE_TIME
    }
  );

  return (
    <>
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={fields || []}
        itemsList={listData?.results ?? []}
        selectedTab={selectedTab}
      />
    </>
  );
};

export default SettingTab;
