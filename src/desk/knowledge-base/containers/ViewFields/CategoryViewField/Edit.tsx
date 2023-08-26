import React, { useEffect, useState } from 'react';
import KBCategoryAutoComplete from '@desk/knowledge-base/containers/KBCategoryAutoComplete';
import { Box, InputLabel, Stack, useTheme } from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import KBFolderAutoComplete from '../../KBFolderAutoComplete';
import { KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import CategoryAutoComplete from '../../CategoryAutoComplete';

interface EditProps {
  value: KnowledgeBaseCategory;
  onChange?: (nVal: KnowledgeBaseCategory) => void;
}
const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return (
    <Box>
      <CategoryAutoComplete
        value={value}
        onChange={(nVal: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null) => {
          onChange && onChange(nVal as KnowledgeBaseCategory);
        }}
      />
    </Box>
  );
};

export default Edit;
