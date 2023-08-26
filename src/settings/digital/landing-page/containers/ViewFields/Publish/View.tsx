import { useEffect, useState } from 'react';
import { TextView } from '@base/config/view-field/components';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { useTranslation } from 'react-i18next';

import { LANDING_PAGE_PUBLISH_FIELDS_OPTIONS, LANDING_PAGE_PUBLISH_UNPUBLISH } from '@settings/digital/landing-page/config/constants'

const View= (props: any) => {
  const { value, keyname, menuSourceId, menuSource } = props;
  console.log('value in left', value)
  const [valueString, setValueString] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    let _string = t(LANDING_PAGE_PUBLISH_FIELDS_OPTIONS.find((item: any) => item.value == value.publish ).label);

    if (value?.publish != LANDING_PAGE_PUBLISH_UNPUBLISH) {
      _string =
          ` ${t('ncrm_generalsetting_landing_page_publish_published')} ` +
          convertDateTimeServerToClient({
            date: value?.publishDate,
            isTime: true,
            humanize: true,
          }) ?? '';
    }
    setValueString(_string);
  }, [value]);

  return <TextView 
            value={valueString}
            keyName = {keyname}
            menuSourceId = {menuSourceId}
            menuSource = {menuSource}
        />;
};

export default View;
