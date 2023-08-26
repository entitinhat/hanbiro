import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import { KnowledgeBaseCategory, KnowledgeBaseFolder } from '@desk/knowledge-base/types/knowledge';
import { Button, Grid, Stack } from '@mui/material';
import React, { Suspense, useMemo, useState } from 'react';
import CategoryFolderTree from '../CategoryFolderTree';
import KBCategoryAutoComplete from '../KBCategoryAutoComplete';

interface KBCategoryModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: (submitVal: KnowledgeBaseCategory) => void;
}

const KBCategoryModal = (props: KBCategoryModal) => {
  const { isOpen, onClose, onSave } = props;
  const [submitValue, setSubmitValue] = useState<KnowledgeBaseCategory | null>();
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              <SpanLang keyLang="ncrm_common_btn_cancel" />
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => {
                if (submitValue) {
                  onSave && onSave(submitValue);
                  onClose();
                }
              }}
              disabled={submitValue ? false : true}
            >
              <SpanLang keyLang="ncrm_common_btn_save" />
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [submitValue]);
  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={<SpanLang keyLang={`ncrm_desk_knowledge_form_move_to`} />}
        isOpen={isOpen}
        size="sm"
        fullScreen={false}
        onClose={onClose}
        footer={Footer}
      >
        <CategoryFolderTree
          treeId=""
          editable={false}
          onSelect={(categoryVal: KnowledgeBaseCategory | null) => {
            setSubmitValue(categoryVal);
          }}
        />
      </MiModal>
    </Suspense>
  );
};
export default KBCategoryModal;
