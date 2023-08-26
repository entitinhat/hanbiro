import { useMenuTemplates } from '@base/services/settingService';
import { TemplateGroupNum } from '@base/types/app';
import { Template } from '@base/types/setting';
import GrapesTSViewFieldView from '@base/containers/ViewField/GrapeTS/view';
import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Icon from '@base/assets/icons/svg-icons';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
import { Close } from '@mui/icons-material';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateGroup: string;
  previewTemplate?: Template;
  onInsert: (item: Template) => void;
}
const PreviewModal: React.FC<PreviewModalProps> = (props: PreviewModalProps) => {
  const { isOpen, onClose, templateGroup, onInsert, previewTemplate } = props;
  const { t } = useTranslation();

  const { data: templatesReps, isLoading: isLoadingList } = useMenuTemplates({
    templateGroup: TemplateGroupNum[templateGroup] ?? 0
  });

  let previewTemplateNotNull;
  if (previewTemplate?.html) previewTemplateNotNull = previewTemplate;
  else previewTemplateNotNull = { id: '', name: t('ncrm_common_template_auto_no_selected') };
  const [itemSelected, setSelected] = useState<Template>(
    previewTemplateNotNull ?? { id: '', name: t('ncrm_common_template_auto_no_selected') }
  );
  const [htmlJson, setHtmlJson] = useState(previewTemplate ? JSON.parse(previewTemplate.html ?? '{}') : { html: '', css: '' });
  const onSelect = (opt: Template) => {
    console.log('opt: ', opt);
    setSelected(opt);
    setHtmlJson(JSON.parse(opt.html ?? '{}'));
  };
  const handleSave = () => {
    if (itemSelected?.id !== '') {
      onInsert && onInsert(itemSelected);
      onClose();
    }
  };

  const theme = useTheme();
  //responsive
  const { isMobile } = useDevice();
  const result: any = templatesReps?.results;

  return (
    <>
      <Drawer anchor="right" open={true} sx={{ zIndex: theme.zIndex.modal }} onClose={() => onClose()}>
        <>
          <Typography
            id="modal-modal-title"
            variant="h4"
            fontWeight={500}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {t('ncrm_setting_template_preview_template')}
            <IconButton
              size="small"
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent !important'
                }
              }}
              onClick={() => onClose()}
            >
              <Close fontSize="small" />
            </IconButton>
          </Typography>
        </>
        <Stack
          component="form"
          sx={{ width: isMobile ? '100vw' : '40vw', height: '100vh' }}
          justifyContent="space-between"
          className="scroll-box"
          direction="column"
          divider={<Divider />}
        >
          <Stack spacing={3} sx={{ p: '15px' }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ flex: '0 0 33.3%' }}> {t('ncrm_generalsetting_template')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  getOptionLabel={(option: any) => t(option.name)}
                  options={result || []}
                  onChange={(event: any, value) => {
                    if (value) onSelect(value as Template);
                  }}
                  loading={isLoadingList}
                  popupIcon={Icon('down')}
                  value={itemSelected}
                  renderInput={(params) => {
                    return <TextField {...params} placeholder={'Select...'} />;
                  }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography sx={{ pb: 1 }}> {t('ncrm_generalsetting_template_preview')}</Typography>
              </Grid>
              <Grid item xs={6}>
                {itemSelected?.id != '' && <GrapesTSViewFieldView showTools={false} value={htmlJson} iframHeight={'calc(100vh - 300px)'} />}
              </Grid>
            </Grid>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" sx={{ px: '15px', py: '10px' }}>
            <Button size="small" variant="outlined" color="secondary" onClick={() => onClose()}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <Button size="small" sx={{ marginLeft: '5px' }} variant="contained" onClick={() => handleSave()}>
              {t('ncrm_common_btn_insert')}
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default PreviewModal;
