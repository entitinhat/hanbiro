import { useMemo } from 'react';

import { PageLayoutData } from '@base/types/pagelayout';
import { Box, Stack, Typography } from '@mui/material';
import * as keyNames from '@settings/template/config/key-names';
import Title from '@base/containers/ViewField/Title';
import { queryKeys } from '@settings/template/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useListQueryKeyTemplate } from '@settings/template/hooks/useListQueryKeyTemplate';
import { GrapesTSViewField, SequenceFormView, QuoteViewField } from '@settings/template/config/view-fields/components';
import { MENU_TEMPLATE_QUOTE, MENU_TEMPLATE_SMS } from '@base/config/menus';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  GRAPEJS_TEMPLATE_TYPE_FULL,
  GRAPEJS_TEMPLATE_TYPE_MMS,
  GRAPEJS_TEMPLATE_TYPE_SMS
} from '@base/components/@hanbiro/GrapeTS/config/constants';
import { TEMPLATE_MESSAGE_MMS } from '@settings/template/config/constants';
interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  viewConfig: any;
  groupTemplate: string;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields, viewConfig, groupTemplate } = props;
  console.log(`~~~~Center Props`, props);
  const { data } = layoutData;

  const { t } = useTranslation();

  const filter = useListQueryKeyTemplate(menuSource, groupTemplate);
  const queryClient = useQueryClient();

  //constants
  const titleKey = keyNames.KEY_MENU_TEMPLATE_TITLE;
  const subTypeKey = keyNames.KEY_MENU_TEMPLATE_SUB_TYPE;
  const htmlKey = keyNames.KEY_MENU_TEMPLATE_DESGIN;

  const html = layoutData?.layout?.data[0]?.children?.find((_field: any) => _field?.keyName === htmlKey);
  const subType = layoutData?.layout?.data[0]?.children?.find((_field: any) => _field?.keyName === subTypeKey);

  const handleOnSave = async (keyName: string, isSuccess: boolean, value: any) => {
    let queryKey = [queryKeys.settingMenuTemplateNew, menuSourceId];
    let queryListKey = [queryKeys.settingMenuTemplatesGet, filter];
    if (isSuccess) {
      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          [keyName]: value[keyName]
        };
      });
      await queryClient.cancelQueries(queryListKey);
      queryClient.setQueryData(queryListKey, (old: any) => {
        const newData = [...old.data];
        const fIdx = newData.findIndex((_ele: any) => _ele.id === menuSourceId);
        if (newData[fIdx][keyName]) {
          newData[fIdx][keyName] = value[keyName];
        }
        return {
          data: newData,
          paging: old.paging
        };
      });
    }
  };

  const FieldsMemo = useMemo(() => {
    return (
      <Stack direction="row" alignItems="center">
        <Typography variant="h3" color="textPrimary">
          {t('ncrm_setting_template_subject')}
        </Typography>
        <Box
          sx={{
            h6: {
              fontSize: '1.5rem'
            },
            flex: 1,
            wordBreak: 'break-all'
          }}
        >
          <Title
            value={data?.[titleKey]}
            keyName={titleKey}
            menuSourceId={menuSourceId ?? ''}
            menuSource={menuSource ?? ''}
            userPermission={{ isEdit: true, isShow: true }}
            onSave={handleOnSave}
          />
        </Box>
      </Stack>
    );
  }, [ignoreFields, menuSource, menuSourceId, data?.[titleKey]]);

  const HTMLMemo = useMemo(() => {
    let htmlData = '';
    if (html == undefined || html?.data == '') {
      htmlData = JSON.stringify({ html: '', css: '' });
    } else {
      htmlData = html.data;
    }

    let subTypeData = '';
    if (subType == undefined || subType?.data == '') {
      subTypeData = 'Manual';
    } else {
      subTypeData = t(subType.data);
    }

    const config = viewConfig[keyNames.KEY_MENU_TEMPLATE_DESIGN];

    let configView = viewConfig[keyNames.KEY_MENU_TEMPLATE_DESIGN_VIEW];
    configView = { ...configView, viewData: config.viewData };
    console.log(`~~~~ subTypeData`, subTypeData);
    if (menuSource === MENU_TEMPLATE_QUOTE) {
      const value = !!htmlData ? JSON.parse(htmlData) : null;
      return (
        <QuoteViewField
          value={isArray(value) ? value : []}
          keyName={keyNames.KEY_MENU_TEMPLATE_DESIGN}
          userPermission={{ isEdit: true }}
          menuSource={menuSource}
          menuSourceId={menuSourceId}
          viewConfig={viewConfig}
          config={configView}
          onSave={handleOnSave}
          clickIconToEdit={true}
        />
      );
    } else if (subTypeData == 'Check list' || subTypeData == 'Sequence') {
      return (
        <SequenceFormView
          value={JSON.parse(htmlData)}
          keyName={keyNames.KEY_MENU_TEMPLATE_DESIGN}
          userPermission={{ isEdit: true }}
          menuSource={menuSource}
          menuSourceId={menuSourceId}
          viewConfig={viewConfig}
          config={configView}
          onSave={handleOnSave}
          clickIconToEdit={true}
        />
      );
    } else {
      return (
        <GrapesTSViewField
          keyName={keyNames.KEY_MENU_TEMPLATE_DESIGN}
          value={JSON.parse(htmlData)}
          userPermission={{ isEdit: true }}
          menuSource={menuSource}
          menuSourceId={menuSourceId}
          viewConfig={viewConfig}
          config={{
            ...configView,
            componentProps: {
              templateType:
                menuSource == MENU_TEMPLATE_SMS
                  ? data?.subType == TEMPLATE_MESSAGE_MMS
                    ? GRAPEJS_TEMPLATE_TYPE_MMS
                    : GRAPEJS_TEMPLATE_TYPE_SMS
                  : GRAPEJS_TEMPLATE_TYPE_FULL
            }
          }}
          onSave={handleOnSave}
          clickIconToEdit={true}
        />
      );
    }
  }, [html, subType, menuSource, menuSourceId]);

  return (
    <Box
      sx={{
        padding: '20px'
      }}
    >
      {FieldsMemo}
      {HTMLMemo}
    </Box>
  );
};

export default Center;
