import React, { useEffect, useState } from 'react';
import { Template } from '@base/types/setting';
import { useMenuTemplate, useMenuTemplates } from '@base/services/settingService';
import { parserTemplateProperties } from '@base/utils/helpers/templatesUtils';
import { TemplateGroup, TemplateGroupNum } from '@base/types/app';
import { Box, Button, Grid, Autocomplete, TextField, ClickAwayListener } from '@mui/material';
import Icon from '@base/assets/icons/svg-icons';
import PreviewModal from './PreviewModal';
import { useTranslation } from 'react-i18next';
interface SelectTemplateProps {
  templateGroup: TemplateGroup;
  useTemplateId?: boolean;
  useItemTable?: boolean;
  useSelectBox?: boolean;
  value?: Template;
  options?: Template[];
  onChange: (params: any) => void;
  canChange?: boolean;
}
const SUPPORTED_TEMPLATE_GROUPS = [TemplateGroup.KNOWLEDGE, TemplateGroup.EMAIL, TemplateGroup.SMS, TemplateGroup.TASK, TemplateGroup.CALL];
const SelectTemplate: React.FC<SelectTemplateProps> = (props: SelectTemplateProps) => {
  const {
    templateGroup = TemplateGroup.KNOWLEDGE,
    useTemplateId = false,
    useItemTable = false,
    useSelectBox = false,
    value,
    options = [],
    onChange,
    canChange = true
  } = props;

  const [templateId, setTemplateId] = useState('');
  const { t } = useTranslation();
  const { data: templatesReps, isLoading: isLoadingList } = useMenuTemplates({
    templateGroup: TemplateGroupNum[templateGroup] ?? 0
  });
  const [itemSelected, setSelected] = useState<any>(t('value') || null);
  //lang
  const { data: templateReps, isLoading: isLoadingView } = useMenuTemplate(templateId, templateGroup);
  // const [show, setShown] = useState(false);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  //init when value changes
  useEffect(() => {
    if (value) {
      if (value?.id !== itemSelected?.id) {
        setSelected(value);
      }
    } else {
      setSelected(null); //{ id: '', name: 'No Selected' }
    }
  }, [value]);

  const onClose = () => {
    setIsOpenPreview(false);
  };
  const handleSave = () => {
    onChange && onChange(itemSelected);
    onClose();
  };
  const onSelect = (template: Template) => {
    if (useTemplateId) {
      setSelected(template);
      onChange && onChange(template.id);
      onClose();
      return;
    }
    onChange && onChange(template);
    setSelected(template);
    setIsGetting(true);
    setTemplateId(template.id);
  };
  useEffect(() => {
    if (templateReps && templateReps.options != '') {
      // setSelected(templateReps);
      setIsGetting(false);
      let nTplData = parserTemplateProperties(itemSelected, templateGroup);
      onChange && onChange(nTplData);
      onClose();
    }
  }, [templateReps]);

  if (SUPPORTED_TEMPLATE_GROUPS.indexOf(templateGroup) === -1) {
    return <span className="text-danger">Group is not available</span>;
  }
  const reuslt: any = templatesReps?.results;
  return (
    <Grid>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        {canChange && (
          <Button
            variant="text"
            onClick={() => {
              setIsOpenPreview(true);
              console.log(isOpenPreview);
            }}
            color="primary"
            size="small"
            sx={{ cursor: 'pointer', mt: '-30px', ml: 'auto', mb: '5px', p: '0px !important', fontSize: '12px !important' }}
          >
            {t('ncrm_generalsetting_view_template')}
          </Button>
        )}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Autocomplete
          disablePortal //fix zIndex
          getOptionLabel={(option: any) => t(option.name)}
          loading={isLoadingList}
          options={reuslt || []}
          onChange={(event: any, value) => {
            if (value) onSelect(value as Template);
          }}
          popupIcon={Icon('down')}
          value={itemSelected}
          renderInput={(params) => {
            return <TextField {...params} placeholder={t('ncrm_common_search_placeholder') ?? ''} />;
          }}
        />
      </Box>

      {isOpenPreview && (
        <PreviewModal
          isOpen={isOpenPreview}
          onClose={onClose}
          templateGroup={templateGroup}
          previewTemplate={itemSelected}
          onInsert={(insertedItem: Template) => {
            onSelect(insertedItem);
          }}
        />
      )}
    </Grid>
  );
};

export default SelectTemplate;
