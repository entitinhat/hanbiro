import NoData from '@base/components/@hanbiro/NoData';
import CopyAllOutlinedIcon from '@mui/icons-material/CopyAllOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import { keyNames, menuData } from '@base/containers/TranslatorEditor/TranslatorEditorModal/config';

/**
 */
const LanguageListSearch: React.FC<any> = (props: any) => {
  const { dataListSearch, isLoading, setValue, openWrite } = props;

  const theme = useTheme();

  const handleModifedLangValue = (type: string, data: any) => {
    for (const key in data) {
      if (key === keyNames.KEY_NAME_TRANSLATOR_EDITOR_MENU) {
        const vEdit = menuData.find((item: any) => item.value === data[key]);
        setValue(key, {
          ...vEdit,
          keyName: vEdit?.value,
          languageKey: vEdit?.label
        });
      } else if (key === keyNames.KEY_NAME_TRANSLATOR_EDITOR_ID) {
        if (type === 'edit') {
          console.log('setValue', key, data[key]);
          setValue(key, data[key]);
        } else {
          setValue(key, '');
        }
      } else if (key === keyNames.KEY_NAME_TRANSLATOR_EDITOR_LANGKEY) {
        if (type === 'edit') {
          console.log('setValue', key, data[key]);
          setValue(key, data[key]);
        } else {
          setValue(key, data[key] + '_copy');
        }
      } else {
        setValue(key, data[key]);
      }
    }
    openWrite && openWrite();
  };

  //main render
  return (
    <Box sx={{ mt: 2, position: 'relative', width: 'fit-content', minWidth: '100%' }}>
      <Box className="scroll-box" sx={{ position: 'relative', minWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderLeft: `1px solid ${theme.palette.divider}` }}>Type</TableCell>
              <TableCell>Menu</TableCell>
              <TableCell>Lang Key</TableCell>
              <TableCell>English</TableCell>
              <TableCell>Korea</TableCell>
              <TableCell>Vietnamese</TableCell>
              <TableCell>Japan</TableCell>
              <TableCell>China(ch)</TableCell>
              <TableCell>China(zh)</TableCell>
              <TableCell>Indonesia</TableCell>
              {dataListSearch?.length > 0 && <TableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataListSearch?.length > 0 &&
              dataListSearch?.map((item: any, index: number) => {
                return (
                  <TableRow key={index} sx={{ '& td': { whiteSpace: 'nowrap', borderLeft: `1px solid ${theme.palette.divider}` } }}>
                    <TableCell>{item.system || 'All'}</TableCell>
                    <TableCell>{item.menu}</TableCell>
                    <TableCell>{item.langKey}</TableCell>
                    <TableCell>{item.en}</TableCell>
                    <TableCell>{item.ko}</TableCell>
                    <TableCell>{item.vi}</TableCell>
                    <TableCell>{item.jp}</TableCell>
                    <TableCell>{item.ch}</TableCell>
                    <TableCell>{item.zh || ''}</TableCell>
                    <TableCell>{item.ido}</TableCell>
                    <TableCell sx={{ pr: '12px!important', borderRight: `1px solid ${theme.palette.divider}` }}>
                      <Stack direction={'row'} justifyContent={'center'} px={1.5}>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleModifedLangValue('edit', item)} color="primary">
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Copy">
                          <IconButton onClick={() => handleModifedLangValue('copy', item)} color="primary">
                            <CopyAllOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            {dataListSearch?.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={11}>
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default LanguageListSearch;
