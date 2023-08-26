import React, { ReactNode, useEffect, useState } from 'react';
import Icon from '@base/assets/icons/svg-icons';
import { Box, Button, Divider, Grid, Stack, styled, Typography, useTheme } from '@mui/material';
import useDevice from '@base/hooks/useDevice';
import { PageLayoutData } from '@base/types/pagelayout';
import { useTranslation } from 'react-i18next';
import { getFieldLayoutDataByKeyNames } from '@base/utils/helpers/pageLayoutUtils';
import { BookOutlined, DislikeOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons';
import * as keyNames from '@desk/knowledge-base/config/keyNames';
import { AddOutlined, CopyAllOutlined, DensityMedium, PrintOutlined, SettingsOutlined } from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import Dropdown, { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import useSnackBar from '@base/hooks/useSnackBar';
import useCopyLink from '@base/hooks/shorten-url/useShortenUrls';
import useKBDelete from '@desk/knowledge-base/hooks/useKBDelete';
import useKBClone from '@desk/knowledge-base/hooks/useKBClone';
import useKBContentMutation from '@desk/knowledge-base/hooks/useKBContentMutation';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@base/config/queryClient';
import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import { DEFAULT_ROUTE } from '@desk/knowledge-base/config/constants';
import HttpsIcon from '@mui/icons-material/Https';
import MenuBookIcon from '@mui/icons-material/MenuBook';
interface TopProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  onRefresh?: (updateData: any) => void;
}
interface StatusFieldConfig {
  keyNames: string;
  label: string;
  icon: ReactNode;
  iconColor: string;
}
const reportKeyNames = [
  keyNames.KEY_KNOWLEDGE_BASE_VIEWED,
  keyNames.KEY_KNOWLEDGE_BASE_INSERTED,
  keyNames.KEY_KNOWLEDGE_BASE_HELPED,
  keyNames.KEY_KNOWLEDGE_BASE_NOTHELPED
];
const IconHeader = styled('div')(({ theme }) => ({
  width: '32px',
  opacity: '.6',
  height: '24px',
  color: theme.palette.common.white,
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  display: 'flex',
  borderRadius: '0.25rem'
}));
const TitleHeader = styled('div')(({ theme }) => ({
  fontSize: '12px',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}));

const Top = (props: TopProps) => {
  const { menuSource, menuSourceId, layoutData, onRefresh } = props;
  const { t } = useTranslation();

  const [status, setStatus] = useState<{ [x: string]: number }>({
    [keyNames.KEY_KNOWLEDGE_BASE_VIEWED]: 0,
    [keyNames.KEY_KNOWLEDGE_BASE_INSERTED]: 0,
    [keyNames.KEY_KNOWLEDGE_BASE_HELPED]: 0,
    [keyNames.KEY_KNOWLEDGE_BASE_NOTHELPED]: 0
  });
  const fields = getFieldLayoutDataByKeyNames(layoutData, reportKeyNames);
  // if (fields && fields.length) {
  //   fields.forEach((field: any) => {
  //     if (field.keyName == 'viewed') {
  //       viewed = field?.data ? field.data : 0;
  //     }
  //     if (field.keyName == 'inserted') {
  //       inserted = field?.data ? field.data : 0;
  //     }
  //     if (field.keyName == 'helped') {
  //       helped = field?.data ? field.data : 0;
  //     }
  //     if (field.keyName == 'notHelped') {
  //       notHelped = field?.data ? field.data : 0;
  //     }
  //   });
  // }
  useEffect(() => {
    if (fields && fields.length > 0) {
      let nStats = status;
      fields.forEach((field: any) => {
        // if (field.keyName == 'viewed') {
        //   viewed = field?.data ? field.data : 0;
        // }
        // if (field.keyName == 'inserted') {
        //   inserted = field?.data ? field.data : 0;
        // }
        // if (field.keyName == 'helped') {
        //   helped = field?.data ? field.data : 0;
        // }
        // if (field.keyName == 'notHelped') {
        //   notHelped = field?.data ? field.data : 0;
        // }
        if (field?.keyName) nStats[field.keyName] = field?.data ?? 0;
      });
      setStatus(nStats);
    }
  }, [fields]);
  const theme = useTheme();

  const StatusConfig: StatusFieldConfig[] = [
    {
      keyNames: keyNames.KEY_KNOWLEDGE_BASE_VIEWED,
      label: 'ncrm_desk_knowledge_base_report_viewed',
      icon: <EyeOutlined style={{ fontSize: '20px', color: theme.palette.primary.main }} />,
      iconColor: theme.palette.primary.lighter
    },
    {
      keyNames: keyNames.KEY_KNOWLEDGE_BASE_INSERTED,
      label: 'ncrm_desk_knowledge_base_report_inserted',
      icon: <BookOutlined style={{ fontSize: '20px', color: theme.palette.info.main }} />,
      iconColor: theme.palette.info.lighter
    },
    {
      keyNames: keyNames.KEY_KNOWLEDGE_BASE_HELPED,
      label: 'ncrm_desk_knowledge_base_report_helpful',
      icon: <LikeOutlined style={{ fontSize: '20px', color: theme.palette.success.main }} />,
      iconColor: theme.palette.success.lighter
    },
    {
      keyNames: keyNames.KEY_KNOWLEDGE_BASE_NOTHELPED,
      label: 'ncrm_desk_knowledge_base_report_not_helpful',
      icon: <DislikeOutlined style={{ fontSize: '20px', color: theme.palette.error.main }} />,
      iconColor: theme.palette.error.lighter
    }
  ];

  //SnackBars
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  //mutation
  const { mCopyLink } = useCopyLink();
  const { mDeleteKB } = useKBDelete();
  const { mCloneKB } = useKBClone();
  const { mChangePublishStatus } = useKBContentMutation();

  //MoreActions Calls
  const kbId = layoutData?.menuSourceId ?? '';
  const isPublish = layoutData?.data?.isPublish ?? false;

  const onChangePublishStatus = (isPublish: boolean) => {
    mChangePublishStatus.mutate(
      { ids: [kbId], isPublish: isPublish },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was saved!');
          // console.log('doisPublish', isPublish);
          onRefresh && onRefresh({ isPublish: isPublish });
        },
        onError: () => {
          enqueueErrorBar('There was an error!');
        }
      }
    );
  };

  const onClone = () => {
    mCloneKB.mutate(
      { id: kbId },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was saved!');
        }
      }
    );
  };

  const navigate = useNavigate();

  const goList = () => {
    queryClient.invalidateQueries([queryKeys.listKnowledgebases]);
    navigate(DEFAULT_ROUTE);
  };

  const onDelete = () => {
    mDeleteKB.mutate(
      { ids: [kbId] },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was removed!');
          goList();
        }
      }
    );
  };
  const onEdit = () => {};
  //==============
  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_common_edit',
      value: 'edit',
      onClick: () => onEdit()
    },
    {
      label: 'ncrm_common_clone',
      value: 'clone',
      onClick: () => onClone()
    },
    {
      label: 'ncrm_common_btn_delete',
      value: 'delete',
      onClick: () => {
        onDelete();
      }
    }
  ];
  const dropDownMoreOption: DropdownProps = {
    disableChangeTitle: true,
    items: moreActions || [],
    icon: <DensityMedium sx={{ fontSize: 16 }} />,
    minWidth: 320,
    size: 'small',
    variant: 'outlined',
    listTitle: {
      label: 'Desks Preferences',
      value: 'title',
      icon: <SettingsOutlined />
    },
    color: 'secondary'
  };

  const border = '2px solid ' + theme.palette.divider;
  const { isMobile } = useDevice();
  const handleMenuChange = (item: LabelValueIcon) => {
    item?.onClick && item.onClick();
  };
  //render
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flex: 1, py: 2, mx: 2 }}>
      <Grid container sx={{ border: border, py: 2, display: 'flex', flexWrap: 'nowrap' }}>
        {StatusConfig.map((config: StatusFieldConfig, index: number) => {
          return (
            <React.Fragment key={index}>
              <Grid
                item
                xs={isMobile ? 6 : 2.5}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
              >
                <IconHeader sx={{ backgroundColor: config.iconColor }}>{config.icon}</IconHeader>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography>{t(config.label)}</Typography>
                  <Typography
                    sx={{
                      text: 'semibold',
                      fontSize: '20px',
                      lineHeight: 1.1,
                      letterSpacing: '-1px',
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {status[config.keyNames]}
                  </Typography>
                </Box>
              </Grid>
              <Divider orientation="vertical" />
            </React.Fragment>
          );
        })}
        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 2 }}>
          <Stack spacing={1} direction="row">
            <Dropdown {...dropDownMoreOption} onChange={(value) => handleMenuChange(value)} />
            <Button
              variant="contained"
              startIcon={isPublish ? <HttpsIcon /> : <MenuBookIcon />}
              onClick={() => {
                const newStatus = !isPublish;
                onChangePublishStatus(newStatus);
              }}
              size="small"
              sx={{
                height: 32
              }}
            >
              <Typography component="span" sx={{ whiteSpace: 'nowrap' }}>
                {isPublish ? t(`Unpublish`) : t(`Publish`)}
              </Typography>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Top;
