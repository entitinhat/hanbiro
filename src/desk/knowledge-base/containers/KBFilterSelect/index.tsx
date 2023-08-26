import React, { useState, useEffect, useRef, useMemo } from 'react';
import _ from 'lodash';
import { Autocomplete, Box, TextField, autocompleteClasses } from '@mui/material';
import FolderTreeArticiles from './FolderTreeArticiles';
import { DatabaseOutlined } from '@ant-design/icons';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { useTranslation } from 'react-i18next';

interface KnowledgeBaseFilterSelectProps {
  insertedIds: string[];
  onInsert: (article: KnowledgeBase) => void;
}
/**
 *
 * @param {*} props
 * @returns
 */
const KnowledgeBaseFilterSelect: React.FC<KnowledgeBaseFilterSelectProps> = (props) => {
  const { onInsert, insertedIds } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [insertedIDS, setInsertedIDS] = useState(insertedIds);
  const dropdownRef = useRef<any>(null);
  const {t} = useTranslation()
  // outside click dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef && !dropdownRef?.current?.contains(event?.target)) {
        setShowDropdown(false);
      }
    };
    window?.addEventListener('mousedown', handleClickOutside);
    return () => {
      window?.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  const ListboxComponent = useMemo(() => {
    return React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(props, ref) {
      return (
        <Box ref={ref}>
          <FolderTreeArticiles onInsert={onInsert} insertedIds={insertedIDS} />
        </Box>
      );
    });
  }, [insertedIDS.length]);

  useEffect(() => {
    setInsertedIDS(()=>[...insertedIds])
  },[showDropdown])
  //render
  return (
    <Box ref={dropdownRef}>
      <Autocomplete
        componentsProps={{
          paper: {
            sx: {
              overflow: 'visible'
            }
          },
          popper: {
            keepMounted: true,
            disablePortal: true
          }
        }}
        disablePortal
        multiple
        disableCloseOnSelect
        disableClearable
        sx={{
          [`& .${autocompleteClasses.popupIndicator}`]: {
            transform: 'none'
          }
        }}
        open={showDropdown}
        onOpen={() => {
          setShowDropdown(true);
        }}
        onClose={(event: any) => {
          if (event.type == 'mousedown' || event.type == 'click') {
            setShowDropdown(false);
          }
        }}
        options={['']}
        popupIcon={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '5px', borderLeft: '1px solid gray' }}>
            <DatabaseOutlined />
          </Box>
        }
        renderInput={({ inputProps, ...rest }) => (
          <TextField
            {...rest}
            inputProps={{
              ...inputProps,
              readOnly: true
            }}
            placeholder={showDropdown ? '' : t('ncrm_desk_ticket_search_knowledge_base') as string} //'Search Knowledge Base'
          />
        )}
        ListboxComponent={ListboxComponent}
        getOptionLabel={(option) => ''}
        isOptionEqualToValue={(option, value) => true}
      ></Autocomplete>
    </Box>
  );
};

export default KnowledgeBaseFilterSelect;
