import SelectBox from '@base/components/@hanbiro/SelectBox';
import { MENU_SALES } from '@base/config/menus';
import { OptionValue } from '@base/types/common';
import { useMenuSetting } from '@settings/general/hooks/useMenuSetting';
import { WRITE_TYPE_LOST_REASON } from '@settings/preferences/config/lead/constants';
import { CollectionMethodSetting, LeadSettingValue } from '@settings/preferences/types/lead/lead';
import React, { useEffect, useState } from 'react';

const LostReasonAutoComplete = (props: any) => {
  const { onChange } = props;
  const [data, setData] = useState<LeadSettingValue[] | CollectionMethodSetting[]>([]);

  const { data: postData, refetch } = useMenuSetting({ key: WRITE_TYPE_LOST_REASON, menu: MENU_SALES });

  useEffect(() => {
    if (postData?.value) setData(JSON.parse(postData.value));
    else {
      setData([]);
    }
  }, [postData]);

  const handleOnChange = (newVal: OptionValue) => {
    onChange && onChange(newVal);
  };

  return (
    <SelectBox
      options={data?.map((v: LeadSettingValue) => ({ keyName: v?.id, languageKey: v?.name }))}
      value={undefined}
      onChange={handleOnChange}
    />
  );
};

export default LostReasonAutoComplete;
