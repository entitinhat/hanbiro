import { useEffect, useState } from 'react';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';

import {
    LANDING_PAGE_PUBLISH_LATER,
    LANDING_PAGE_PUBLISH_PUBLISHED,
    LANDING_PAGE_PUBLISH_UNPUBLISH,
    LANDING_PAGE_PUBLISH_OPTIONS,
    LANDING_PAGE_PUBLISH_FIELDS_OPTIONS
} from '@settings/digital/landing-page/config/constants'
import { useTranslation } from 'react-i18next';

// import { RadioGroup } from '@base/components/form';
import { RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';

const Edit = (props: any) => {
  const { value, errors, onChange } = props;

  const [publish, setPublish] = useState(LANDING_PAGE_PUBLISH_UNPUBLISH);
//   const [publishDate, setPublishDate] = useState(new Date().toISOString());
  const [publishDate, setPublishDate] = useState<Date | null>(new Date());
  const { t } = useTranslation();
  let initDate = new Date()
  initDate.setDate(initDate.getDate() + 1);

  useEffect(() => {
    if (publish != value.publish) {
      setPublish(value.publish);
    }
    if (
      value.publishDate &&
      publishDate != value.publishDate &&
      value.publishDate != '0001-01-01T00:00:00Z'
    ) {
      setPublishDate(value.publishDate);
    }
  }, [value]);

  const handlePublishChange = (value: string) => {
    setPublish(value);

    onChange &&
      onChange({
        publish: value,
        publishDate: publishDate,
      });
  };

  const handlePublishDateChange = (date: Date | null) => {
    setPublishDate(date);

    onChange &&
      onChange({
        publish: publish,
        publishDate: date,
      });
  };

  return (
    <>
        <FormControl >
          <RadioGroup
            row
            value={publish}
            onChange={(e: any, value:any) => {
                console.log('value on change', value)
                handlePublishChange(value);
            }}
          >
            {LANDING_PAGE_PUBLISH_FIELDS_OPTIONS.map((v: any, idx: number) => (
              <FormControlLabel key={idx} control={<Radio />} value={v.value} label={t(v.label)} />
            ))}
          </ RadioGroup>
        </FormControl>
        {publish === LANDING_PAGE_PUBLISH_LATER && (
            <DatePicker 
            value={publishDate} 
            onChange={(date: Date | null) => {
              handlePublishDateChange(date)
              }}
              minDate={initDate}
            />
        )}
    </>
  );
};

export default Edit;
