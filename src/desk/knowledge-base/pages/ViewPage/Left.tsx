import { useMemo } from 'react';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// mui import
import { Box, useTheme } from '@mui/material';

// project import
import * as keyNames from '@desk/ticket/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import KnowledgeBaseReport from '@desk/knowledge-base/containers/KBReport';
import Attachments from '@base/containers/Attachments';
import { useTranslation } from 'react-i18next';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields, onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  const theme = useTheme();
  const { t } = useTranslation();
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    console.log('...Ticket > View > handleOnSave ', keyName, isSuccess, value);
    onRefetch && onRefetch();
  };

  const handleOnClose = (keyName: string, value: any) => {
    console.log('...Ticket > View > handleOnClose ', keyName, value);
  };

  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
            ignoreFields={[...(ignoreFields ?? []), keyNames.KEY_TICKET_SUBJECT, keyNames.KEY_TICKET_ATTACHMENT]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            readOnly={data?.restore?.id ? true : false}
            divider
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: FieldsMemo
        }
      ]
    }
    // {
    //   title: t('ncrm_desk_knowledge_view_attachment'),
    //   sections: [
    //     {
    //       component: (
    //         <Box sx={{ p: 2, borderTop: '0px' }}>
    //           {' '}
    //           <Attachments menuSource={menuSource} menuSourceId={menuSourceId ?? ''} />{' '}
    //         </Box>
    //       )
    //     }
    //   ]
    // }
  ];

  return <ViewLeft items={leftItems} />;
};

export default Left;
