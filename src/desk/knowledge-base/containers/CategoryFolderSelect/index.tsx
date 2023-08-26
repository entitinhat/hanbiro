import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useKnowledgeBaseCategories } from '@desk/knowledge-base/hooks/useKnowledgeBaseCategories';
import { KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { Autocomplete, Box, CircularProgress, InputLabel, Stack, TextField, useTheme } from '@mui/material';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryAutoComplete from '../CategoryAutoComplete';
import KBFolderAutoComplete from '../KBFolderAutoComplete';
import WriteFolderForm from '../WriteFolderForm';

interface CategoryFolderSelect {
  value?: KnowledgeBaseCategory;
  onChange?: (nVal: KnowledgeBaseCategory) => void;
  addFolder?: boolean;
  hideTitle?: boolean;
}
const CategoryFolderSelect = (props: CategoryFolderSelect) => {
  const { value, onChange, addFolder, hideTitle = false } = props;
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeBaseCategory | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<KnowledgeBaseCategory | null>(null);
  const [selectedChildFolder, setSelectedChildFolder] = useState<KnowledgeBaseCategory | null>(null);

  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      if (value.category) {
        setSelectedCategory(value.category);
        if (value.parent) {
          setSelectedFolder(value.parent);
          setSelectedChildFolder(value);
        } else setSelectedFolder(value);
      } else {
        setSelectedCategory(value);
      }
    }
  }, [value]);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const theme = useTheme();
  //translation hook
  const { t } = useTranslation();

  const newPlaceholder = `ncrm_desk_knowledge_category_auto_placeholder`;
  const noOptMsg = `ncrm_desk_knowledge_category_not_found_message`;
  const folderPlaceHolder = 'ncrm_desk_knowledge_category_auto_folder_placeholder';

  //Hanlders
  const handleChangeCategory = (value: KnowledgeBaseCategory) => {
    setSelectedCategory(value as KnowledgeBaseCategory);
    setSelectedFolder(null);
    setSelectedChildFolder(null);
    onChange && onChange(value);
  };
  const handleChangeFolder = (value: KnowledgeBaseCategory) => {
    setSelectedFolder(value);
    setSelectedChildFolder(null);
    onChange && onChange(value);
  };
  const handleChangeChildFolder = (value: KnowledgeBaseCategory) => {
    setSelectedChildFolder(value);
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
      <Stack spacing={0.5} sx={{ pt: hideTitle ? 0.5 : 2 }}>
        {!hideTitle && (
          <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Folder'} />
          </InputLabel>
        )}
        <KBFolderAutoComplete
          value={selectedFolder}
          onChange={(nVal: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null) => {
            handleChangeFolder(nVal as KnowledgeBaseCategory);
          }}
          categoryId={selectedCategory?.id}
        />
        {selectedFolder && (
          <KBFolderAutoComplete
            value={selectedChildFolder}
            onChange={(nVal: KnowledgeBaseCategory | KnowledgeBaseCategory[] | null) => {
              handleChangeChildFolder(nVal as KnowledgeBaseCategory);
            }}
            categoryId={selectedCategory?.id}
            folderParentId={selectedFolder?.id}
          />
        )}
      </Stack>
      {addFolder && (
        <Box ref={modalRef}>
          <WriteFolderForm
            isOpen={isOpenWrite}
            onClose={() => {
              setIsOpenWrite(false);
            }}
          />
        </Box>
      )}
    </Box>
  );
};
export default CategoryFolderSelect;
