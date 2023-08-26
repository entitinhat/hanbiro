import { useEffect, useMemo, useState } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import { concat } from 'lodash';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// mui import
import { Stack } from '@mui/material';

// project import
import CtaQrCodePreview from '@base/containers/QrCodePreview';
import CtaTextPreview from '@settings/digital/cta/components/CtaTextPreview';
import CtaImagePreview from '@settings/digital/cta/components/CtaImagePreview';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

//menu
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { MENU_SETTING_CTA } from '@base/config/menus';
import * as constants from '@settings/digital/cta/config/constants';
import * as keyNames from '@settings/digital/cta/config/keyNames';
import { queryKeys } from '../../config/queryKeys';
import { t } from 'i18next';

interface LeftProps {
  layoutData: PageLayoutData;
  onRefetch?: () => void;
}

const LINK_PREVIEW_KEYS: string[] = [
  keyNames.KEY_SETTING_CTA_VALUE,
  keyNames.KEY_SETTING_CTA_IMAGE_URL,
  keyNames.KEY_SETTING_CTA_PREVIEW,
  keyNames.KEY_SETTING_CTA_NAME
];

const IMAGE_PREVIEW_KEYS: string[] = [
  keyNames.KEY_SETTING_CTA_IMAGE_SIZE,
  keyNames.KEY_SETTING_CTA_IMAGE_ALT,
  keyNames.KEY_SETTING_CTA_PREVIEW
];

const TEXT_PREVIEW_KEYS: string[] = [
  keyNames.KEY_SETTING_CTA_TEXT_VALUE,
  keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR,
  keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR,
  keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE,
  keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT,
  keyNames.KEY_SETTING_CTA_TEXT_ROUNDED
];

const LANDINGPAGE_FIELDS: string[] = [
  keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE,
  keyNames.KEY_SETTING_CTA_LANDINGPAGE,
  keyNames.KEY_SETTING_CTA_LANDINGPAGE_TITLE
];

const SITE_FIELDS: string[] = [keyNames.KEY_SETTING_CTA_SITE_TYPE, keyNames.KEY_SETTING_CTA_SITE, keyNames.KEY_SETTING_CTA_SITE_TITLE];

const SURVEY_FIELDS: string[] = [
  keyNames.KEY_SETTING_CTA_SURVEY_TYPE,
  keyNames.KEY_SETTING_CTA_SURVEY,
  keyNames.KEY_SETTING_CTA_SURVEY_TITLE
];

const INTERNAL_FIELDS: string[] = [keyNames.KEY_SETTING_CTA_CONTENT_TYPE, ...LANDINGPAGE_FIELDS, ...SITE_FIELDS, ...SURVEY_FIELDS];

const EXTERNAL_FIELDS: string[] = [keyNames.KEY_SETTING_CTA_EXT_SITE_NAME, keyNames.KEY_SETTING_CTA_LINK_URL];

const Left = (props: LeftProps) => {
  const { layoutData, onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  // state
  const [ignoreFields, setIgnoreFields] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const ctaData = queryClient.getQueryData<any>([queryKeys.ctaGet, menuSourceId, 'view']);
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  // get fields by group
  const ctaType = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_TYPE);
  const contentType = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_CONTENT_TYPE);
  const linkUrl = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_LINK_URL);
  const linkType = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_LINK_TYPE);

  console.log('...CTA...', ctaData, basicFields);

  const customFields = useMemo(() => {
    return basicFields?.map((field) => {
      if (linkType?.data?.value === constants.SETTING_CTA_LINK_TYPE_INTERNAL && EXTERNAL_FIELDS.includes(field.keyName)) {
        return false;
      }

      if (linkType?.data?.value === constants.SETTING_CTA_LINK_TYPE_EXTERNAL && INTERNAL_FIELDS.includes(field.keyName)) {
        return false;
      }

      if (
        contentType?.data?.value == constants.SETTING_CTA_CONTENT_TYPE_LANDING_PAGE &&
        (SITE_FIELDS.includes(field.keyName) || SURVEY_FIELDS.includes(field.keyName))
      ) {
        return false;
      }

      if (
        contentType?.data?.value == constants.SETTING_CTA_CONTENT_TYPE_SITE &&
        (LANDINGPAGE_FIELDS.includes(field.keyName) || SURVEY_FIELDS.includes(field.keyName))
      ) {
        return false;
      }

      if (
        contentType?.data?.value == constants.SETTING_CTA_CONTENT_TYPE_SURVEY &&
        (SITE_FIELDS.includes(field.keyName) || LANDINGPAGE_FIELDS.includes(field.keyName))
      ) {
        return false;
      }

      return {
        ...field,
        config: {
          ...field.config,
          refetchQueryKey: [MENU_SETTING_CTA, menuSourceId, 'view']
        }
      };
    });
  }, [basicFields, linkType, contentType]);

  useEffect(() => {
    if (ctaType?.data?.value === constants.SETTING_CTA_TYPE_IMAGE) {
      setIgnoreFields(concat(LINK_PREVIEW_KEYS, TEXT_PREVIEW_KEYS));
    } else if (ctaType?.data?.value === constants.SETTING_CTA_TYPE_TEXT) {
      setIgnoreFields(concat(LINK_PREVIEW_KEYS, IMAGE_PREVIEW_KEYS));
    } else {
      setIgnoreFields(concat(LINK_PREVIEW_KEYS, TEXT_PREVIEW_KEYS, IMAGE_PREVIEW_KEYS));
    }
  }, [ctaType]);

  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.ctaUpdate], (old: any) => {
        return { ...old, ...value };
      });
    }

    onRefetch && onRefetch();
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {};

  const ImageCtaPreview = () => {
    const imgUrl = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_IMAGE_URL);
    const imgSize = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_IMAGE_SIZE);
    const imgAlt = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_IMAGE_ALT);

    const imgSrc = imgUrl?.data ?? '';
    return <CtaImagePreview imgSrc={imgSrc} imgSize={imgSize?.data} imgAlt={imgAlt?.data} />;
  };

  const TextCtaPreview = () => {
    const bgColor = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR);
    const textColor = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR);
    const bdRounded = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_TEXT_ROUNDED);
    const fontSize = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE);
    const fontWeight = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT);
    const btnValue = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_SETTING_CTA_TEXT_VALUE);
    return (
      <CtaTextPreview
        txtValue={btnValue?.data}
        bgColor={bgColor?.data}
        textColor={textColor?.data}
        bdRounded={bdRounded?.data}
        fontSize={fontSize?.data}
        fontWeight={fontWeight?.data}
      />
    );
  };

  //view fields render
  const FieldsMemo = useMemo(() => {
    return (
      <>
        {(ctaType?.data?.value == constants.SETTING_CTA_TYPE_IMAGE ||
          ctaType?.data?.value == constants.SETTING_CTA_TYPE_TEXT ||
          ctaType?.data?.value == constants.SETTING_CTA_TYPE_QRCODE) && (
          <Stack justifyContent="center" alignItems="center" sx={{ width: '100%', minHeight: '200px' }}>
            {ctaType?.data?.value == constants.SETTING_CTA_TYPE_IMAGE && <ImageCtaPreview />}
            {ctaType?.data?.value == constants.SETTING_CTA_TYPE_TEXT && <TextCtaPreview />}
            {ctaType?.data?.value == constants.SETTING_CTA_TYPE_QRCODE && (
              <CtaQrCodePreview id={menuSourceId} linkUrl={linkUrl?.data?.link ?? ''} />
            )}
          </Stack>
        )}

        {basicFields.length ? (
          <ViewFields
            fields={customFields}
            ignoreFields={ignoreFields}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            divider
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: FieldsMemo
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
