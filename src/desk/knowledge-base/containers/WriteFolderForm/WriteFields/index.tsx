import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useKnowledgeBaseCategories } from '@desk/knowledge-base/hooks/useKnowledgeBaseCategories';
import { KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { Autocomplete, Box, CircularProgress, InputLabel, Stack, TextField, useTheme } from '@mui/material';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryAutoComplete from '../../CategoryAutoComplete';
import KBFolderAutoComplete from '../../KBFolderAutoComplete';


interface CategoryFolderSelect {
  value?: KnowledgeBaseCategory;
  onChange?: (nVal: KnowledgeBaseCategory) => void;
  addFolder?: boolean;
}
const CreateFolderSelect = (props: CategoryFolderSelect) => {
  const { value, onChange, addFolder } = props;
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeBaseCategory | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<KnowledgeBaseCategory | null>(null);

  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      if (value.category) {
        setSelectedCategory(value.category);
        if (value.parent) {
          //console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~setChildFolder for somereason', value?.parent);
          setSelectedFolder(value.parent);
        } else setSelectedFolder(value);
      } else {
        setSelectedCategory(value);
      }
    }
  }, [value]);
  const theme = useTheme();
  //translation hook
  const { t } = useTranslation();

  //Hanlders
  const handleChangeCategory = (value: KnowledgeBaseCategory) => {
    setSelectedCategory(value as KnowledgeBaseCategory);
    setSelectedFolder(null);
    onChange && onChange(value);
  };
  const handleChangeFolder = (value: KnowledgeBaseCategory) => {
    setSelectedFolder(value);
    onChange && onChange(value);
  };
  //==================DEBUG==============
  // //console.log('~~~~~~postData?.data category', postData?.data);
  //console.log('~~~~~~Selected Category', selectedCategory);
  //console.log('~~~~~~Selected ChildFolder', selectedChildFolder);

  //console.log('~~~~~~valuevaluevalue', value);
  // //console.log('~~~~~~searchText', searchText);

  //=====================================
  return (
    <Box>
      <CategoryAutoComplete
        value={selectedCategory}
        onChange={(nVal: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null) => {
          handleChangeCategory(nVal as KnowledgeBaseCategory);
        }}
      />
      <Stack spacing={0.5} sx={{ pt: 2 }}>
        <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Parent Folder'} />
        </InputLabel>
        <KBFolderAutoComplete
          value={selectedFolder}
          onChange={(nVal: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null) => {
            handleChangeFolder(nVal as KnowledgeBaseCategory);
          }}
          categoryId={selectedCategory?.id}
        />
      </Stack>
    </Box>
  );
};
export default CreateFolderSelect;
