import { getFieldLayoutDataByKeyName } from '@base/utils/helpers/pageLayoutUtils';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import useKBContentMutation from '@desk/knowledge-base/hooks/useKBContentMutation';
import useSnackBar from '@base/hooks/useSnackBar';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';
import MainCard from '@base/components/App/MainCard';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
import ViewComment from '../ViewComment';
interface KnowledgeBaseContentProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  reloadKB?: (updateData: any) => void;
}
const KnowledgeBaseContent = (props: KnowledgeBaseContentProps) => {
  const { menuSource, menuSourceId, reloadKB, layoutData } = props;
  const { data } = layoutData;
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  const contentField = getFieldLayoutDataByKeyName(layoutData, 'content');
  const createdByField = getFieldLayoutDataByKeyName(layoutData, 'createdBy');
  const knowledgeNameField = getFieldLayoutDataByKeyName(layoutData, 'subject');

  const kbId = menuSourceId;
  const createdBy = createdByField?.data ?? '';
  // const [isPublish, setIsPublish] = useState(false);
  const isPublish = layoutData?.data?.isPublish ?? false;
  //@TODO get loginUser
  const isOwner = createdBy != '' ? true : false;
  // @TODO get admin role
  const isAdmin = true;
  const canPublish = isOwner && isAdmin;
  const [isChangingHelpful, setIsChangingHelpful] = useState(false);
  const [isChangingPublish, setIsChangingPublish] = useState(false);
  //mutation
  const { mChangePublishStatus, mChangeHelpFulStatus } = useKBContentMutation();
  //=======TO DO=====
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const onChangePublishStatus = (isPublish: boolean) => {
    setIsChangingPublish(true);

    mChangePublishStatus.mutate(
      { ids: [kbId], isPublish: isPublish },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was saved!');
          setIsChangingPublish(false);
          // console.log('doisPublish', isPublish);
          reloadKB && reloadKB({ isPublish: isPublish });
        },
        onError: () => {
          enqueueErrorBar('There was an error!');
          setIsChangingPublish(false);
          console.log('error roi help');
        }
      }
    );
  };
  const onChangeHelpfulStatus = (helpful: boolean) => {
    setIsChangingHelpful(true);
    mChangeHelpFulStatus.mutate(
      { ids: [kbId], helpful: helpful },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was saved!');
          setIsChangingHelpful(false);
          // +,- helped, notHelped
          let updateData = {};
          reloadKB && reloadKB(updateData);
        },
        onError: () => {
          enqueueErrorBar('There was an error!');
          setIsChangingHelpful(false);
        }
      }
    );
  };
  //=======TO DO=====

  const theme = useTheme();
  const border = '1px solid ' + theme.palette.divider;

  return (
    <>
      <Box className="scroll-box" sx={{ p: 0 }}>
        {/* <MainCard sx={{ overflowX: 'auto', '& .MuiCardContent-root': { p: isMobile ? 0 : 'auto' } }} id="test this">
          
        </MainCard> */}
        <ViewFields
          fields={[contentField]}
          column={1}
          ignoreFields={[]}
          menuSource={menuSource}
          menuSourceId={menuSourceId}
          readOnly={data?.restore?.id ? true : false}
        />
        <Box sx={{ p: 0, borderTop: border }}>
          <ViewComment menuSource={menuSource} knowledgeId={menuSourceId} knowledgeName={knowledgeNameField?.data} />
        </Box>
        {/* {isOwner && !data?.restore?.id && (
          <Box sx={{ display: 'flex', marginTop: '10px' }}>
            <LoadingButton
              sx={{
                '&:hover': {
                  borderColor: theme.palette.success.main,
                  backgroundColor: theme.palette.success.main,
                  color: theme.palette.common.white
                }
              }}
              variant="outlined"
              startIcon={<LikeOutlined />}
              loadingPosition="start"
              color="success"
              loading={isChangingHelpful}
              onClick={() => {
                onChangeHelpfulStatus(true);
              }}
            >
              {t('ncrm_desk_knowledge_btn_helpful')}
            </LoadingButton>

            <LoadingButton
              sx={{
                marginLeft: '5px',
                '&:hover': {
                  borderColor: theme.palette.error.main,
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.common.white
                }
              }}
              variant="outlined"
              startIcon={<DislikeOutlined />}
              loadingPosition="start"
              color="error"
              loading={isChangingHelpful}
              onClick={() => {
                onChangeHelpfulStatus(false);
              }}
            >
              {t('ncrm_desk_knowledge_btn_not_helpful')}
            </LoadingButton>
            {canPublish && !isPublish && (
              <LoadingButton
                sx={{
                  marginLeft: '5px',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white
                  }
                }}
                variant="outlined"
                color="primary"
                startIcon={<ArrowUpOutlined />}
                loadingPosition="start"
                loading={isChangingPublish}
                onClick={() => {
                  onChangePublishStatus(true);
                }}
              >
                {t('ncrm_desk_knowledge_btn_publish')}
              </LoadingButton>
            )}
            {canPublish && isPublish && (
              <LoadingButton
                sx={{
                  marginLeft: '5px',
                  color: theme.palette.secondary.main,
                  borderColor: theme.palette.secondary.main,
                  '&:hover': {
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.common.white
                  }
                }}
                variant="outlined"
                startIcon={<ArrowDownOutlined />}
                loading={isChangingPublish}
                color="secondary"
                onClick={() => {
                  onChangePublishStatus(false);
                }}
              >
                {t('ncrm_desk_knowledge_btn_unpublish')}
              </LoadingButton>
            )}
          </Box>
        )} */}
      </Box>
    </>
  );
};

export default KnowledgeBaseContent;
