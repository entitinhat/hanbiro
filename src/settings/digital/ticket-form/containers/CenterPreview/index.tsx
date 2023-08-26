import { useEffect, useMemo, useState, Suspense } from 'react';
import Box from '@mui/material/Box';

import { useStorageUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import { PageLayoutData } from '@base/types/pagelayout';
import { GrapesTS } from '@settings/digital/ticket-form/config/write-field/components';
import { Button } from '@mui/material';
import useSnackBar from '@base/hooks/useSnackBar';

// ------------------------------------------------
import { useTicketFormUpdate } from '@settings/digital/ticket-form/hooks/useTicketFormMutation';
import { useTranslation } from 'react-i18next';
import { GRAPEJS_TEMPLATE_TYPE_FORM } from '@base/components/@hanbiro/GrapeTS/config/constants';

interface CenterProps {
  menuSource?: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  viewConfig?: any;
  groupTemplate?: string;
}

const CenterPreview = (props: CenterProps) => {
  const { t } = useTranslation();
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const { layoutData, menuSource, menuSourceId, ignoreFields, groupTemplate } = props;

  const [htmlData, setHtmlData] = useState<string>(layoutData?.data?.html);
  const [htmlJson, setHtmlJson] = useState<any>(null);
  const [dataField, setDataField] = useState<any>(null);

  const mUpdate = useTicketFormUpdate();

  useEffect(() => {
    if (htmlData != '') {
      setHtmlJson(JSON.parse(htmlData));
    }
  }, [htmlData]);

  const mStorageUpLoad: any = useStorageUploadMutation<BaseMutationResponse>({
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Save Template failed: ' + JSON.parse(error).message);
      if (context.previous) {
        // queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSuccess: () => {
      // enqueueSuccessBar('Save data success!')
    }
  });

  const onChange = (data: any) => {
    setDataField(data);
  };

  const handleSavechange = () => {
    const fileData = JSON.stringify({
      html: dataField?.html,
      css: dataField?.css
    });
    const blob = new Blob([fileData], { type: 'application/json' });
    const fileName = htmlJson?.FieldName;
    const uploadFile = new File([blob], fileName);

    //Storage
    const fileFormData = new FormData();
    fileFormData.append('files', uploadFile);
    fileFormData.append('module', 'ticketform');
    mStorageUpLoad.mutate(fileFormData);
  };

  // upload success
  useEffect(() => {
    if (mStorageUpLoad.isSuccess) {
      if (mStorageUpLoad.data?.error != '') {
        enqueueErrorBar(mStorageUpLoad.data?.error);
      } else {
        //html update id
        const ticketForm = {
          id: menuSourceId,
          html: mStorageUpLoad.data?.data[0]
        };
        mUpdate.mutate({ ticketForm });
      }
    }
  }, [mStorageUpLoad.isSuccess]);

  return (
    <Box>
      {/* <Suspense fallback={<></>}> */}
      {htmlJson?.Html && (
        <GrapesTS
          storageId="ticket-form"
          height={'calc(100vh - 235px - 40px)'}
          value={{
            html: htmlJson?.Html,
            css: htmlJson?.Css
          }}
          onChange={onChange}
          templateType={GRAPEJS_TEMPLATE_TYPE_FORM}
        />
      )}
      {/* </Suspense> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: 1.25
        }}
      >
        <Button size="small" variant="contained" onClick={handleSavechange}>
          {t('ncrm_common_btn_save')}
        </Button>
      </Box>
    </Box>
  );
};

export default CenterPreview;
