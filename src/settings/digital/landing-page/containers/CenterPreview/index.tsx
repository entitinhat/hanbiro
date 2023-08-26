import { useEffect, useState, Suspense } from 'react';
import Box from '@mui/material/Box';
// import { useStateWithCallbackLazy } from 'use-state-with-callback';

import { useDownloadObjectMutation, useStorageDownloadMutation, useStorageUploadMutation } from '@base/hooks/forms/useFileUploadMutation';
import { BaseMutationResponse } from '@base/types/response';
import { PageLayoutData } from '@base/types/pagelayout';
import { GrapesTS } from '@settings/digital/landing-page/config/write-field/components';
// import GrapesTSViewField from '@base/containers/ViewField/GrapeTS';
import { Button } from '@mui/material';
import useSnackBar from '@base/hooks/useSnackBar';

// ------------------------------------------------
import { useLandingPageUpdate } from '@settings/digital/landing-page/hooks/useLandingPageMutations';
import { useTranslation } from 'react-i18next';
interface CenterPreviewProps {
  layoutData: PageLayoutData;
}

interface CenterProps {
  menuSource?: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  viewConfig?: any;
  groupTemplate?: string;
  refetch?: any;
}

// const CenterPreview = (props: CenterPreviewProps) => {
const CenterPreview = (props: CenterProps) => {
  // const { layoutData } = props
  const { layoutData, menuSource, menuSourceId, ignoreFields, groupTemplate, refetch } = props;
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const [htmlData, setHtmlData] = useState<any>(layoutData?.data?.html);
  const [htmlJson, setHtmlJson] = useState<any>(null);
  const [dataField, setDataField] = useState<any>(null);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  // const [ dataField, setDataField ] = useStateWithCallbackLazy<any>(null)
  const mUpdate = useLandingPageUpdate();
  const { t } = useTranslation();

  const mStorageDownload: any = useStorageDownloadMutation<BaseMutationResponse>({
    onSuccess: (data: any, variables: any, context: any) => {
      setHtmlJson(JSON.parse(data));
    },
    onError: (error: any, variables: any, context: any) => {
      console.log('There is an error during uploading: ' + JSON.parse(error).message);
    }
  });

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

  useEffect(() => {
    if (htmlData) {
      const params = {
        filename: htmlData,
        module: 'landingpage'
      };
      mStorageDownload.mutate(params);
    }
  }, [htmlData]);

  const onChange = (data: any) => {
    setDataField(data);
  };

  useEffect(() => {
    if (isEdited) {
      handleSavechange();
    }
  }, [dataField, isEdited]);

  const handleSaveState = () => {
    setIsEdited(true);
  };

  const handleSavechange = () => {
    // setTimeout(() => {

    const fileData = JSON.stringify({
      html: dataField.html,
      css: dataField.css
    });
    const blob = new Blob([fileData], { type: 'application/json' });
    const fileName = htmlData;
    const uploadFile = new File([blob], fileName);

    //Storage
    const fileFormData = new FormData();
    fileFormData.append('files', uploadFile);
    fileFormData.append('module', 'landingpage');
    mStorageUpLoad.mutate(fileFormData);
    // }, SET_TIMEOUT);
  };

  // upload success
  useEffect(() => {
    if (mStorageUpLoad.isSuccess) {
      if (mStorageUpLoad.data?.error != '') {
        enqueueErrorBar(mStorageUpLoad.data?.error);
      } else {
        //html update id
        const landingPage = {
          id: menuSourceId,
          html: mStorageUpLoad.data?.data[0]
        };
        mUpdate.mutate({ landingPage });
      }
    }
  }, [mStorageUpLoad.isSuccess]);

  //ReLoad after Save
  useEffect(() => {
    if (mUpdate.isSuccess) {
      refetch();
    }
  }, [mUpdate.isSuccess]);

  return (
    <Box>
      {!mStorageDownload.isLoading && (
        <Suspense fallback={<></>}>
          <GrapesTS
            height={'calc(100vh - 235px - 40px)'}
            // storageId={`landingpage-edit-gts-${layoutData?.data?.html}`}
            storageId={'landingpage-view-gts'}
            value={htmlJson}
            onChange={onChange}
            templateType="landingpage"
          />
        </Suspense>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: 1.25
        }}
      >
        <Button size="small" variant="contained" onClick={handleSaveState}>
          {t('ncrm_common_btn_save')}
        </Button>
      </Box>
    </Box>
  );
};

export default CenterPreview;
