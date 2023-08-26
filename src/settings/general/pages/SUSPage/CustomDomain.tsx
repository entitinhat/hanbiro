import React, { useEffect, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

//project
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
//import SpanLang from '@base/components/@hanbiro/SpanLang';
//import { nanoid } from '@base/utils/helpers';
import LoadingButton from '@base/components/@extended/LoadingButton';

//material
import { AddOutlined, ArrowForward, CopyAllOutlined, DeleteOutline, SaveOutlined, SearchOutlined } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

//menu
import Section from '@settings/preferences/components/Section';
import { useSUSCustomDomainCreate, useSUSCustomDomainDelete, useSUSCustomDomains } from '@settings/general/hooks/useSUS';
import CTAList from './CTAList';
import { SUS_DOMAIN, SUS_PATH_PREFIX } from './constants';

interface CustomLink {
  id: string;
  customLink: { domain: string; pathPrefix: string; urlSuffix: string };
  destination: string;
  cta: any;
}

const CustomDomain = (props: any) => {
  const {} = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const [linkItems, setLinkItems] = useState<CustomLink[]>([]);

  //get list
  const { data, isLoading } = useSUSCustomDomains();
  //console.log('domain list', data);

  //init list
  useEffect(() => {
    if (data?.data) {
      const newItems: CustomLink[] = [];
      data.data.map((_item: any) => {
        newItems.push({
          id: _item.id,
          customLink: {
            domain: _item.sUrl ? _item.sUrl.split('//')[1].split('/')[0] : '',
            pathPrefix: _item.sUrl ? _item.sUrl.split('//')[1].split('/')[1] : '',
            urlSuffix: _item.sUrl ? _item.sUrl.split('//')[1].split('/')[2] : ''
          },
          destination: _item.url,
          cta: { ..._item.cta, linkUrl: _item.url }
        });
      });
      setLinkItems(newItems);
    }
  }, [data]);

  //Give our default column cell renderer editing superpowers!
  const columnRender: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('row index', index);
      //console.log('column id', id);
      const initialValue = getValue();
      const curRow = table.options.data[index];
      //console.log('curRow', curRow);
      // We need to keep and update the state of the cell normally
      const [value, setValue] = useState<any>(initialValue || '');
      const [isOpenCTA, setIsOpenCTA] = useState(false);
      const mCreate = useSUSCustomDomainCreate();
      const mDelete = useSUSCustomDomainDelete();
      //console.log('cell value', value);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, { ...value, urlSuffix: value.urlSuffix.replaceAll(/ /g, '') });
      };

      // If the initialValue is changed external, sync it up with our state
      useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      //save success
      useEffect(() => {
        if (mCreate.isSuccess) {
          //console.log('mCreate', mCreate);
          const resp: any = mCreate.data;
          const rowId = resp?.suses && resp.suses.length > 0 ? resp.suses[0].id : '';
          table.options.meta?.updateCellData(index, 'id', rowId); //update table row id
        }
      }, [mCreate.isSuccess]);

      //delete success
      useEffect(() => {
        if (mDelete.isSuccess) {
          table.options.meta?.removeTableRow(index, id);
        }
      }, [mDelete.isSuccess]);

      //validate
      const isValid = () => {
        let valid = true;
        table.options.data.map((_item: any, _itemIdx: number) => {
          if (_itemIdx !== index) {
            //const tmpSuffix = _item.sUrl ? _item.sUrl.split('//')[1].split('/')[2] : '';
            if (_item.customLink.urlSuffix === curRow.customLink.urlSuffix) {
              valid = false;
            }
          }
        });
        if (curRow.destination.length === 0 || curRow.customLink.urlSuffix.length === 0) {
          valid = false;
        }
        return valid;
      };

      //save
      const handleSave = () => {
        if (curRow) {
          if (isValid()) {
            const params = [
              {
                backHalf: {
                  domain: curRow.customLink.domain,
                  pathPrefix: curRow.customLink.pathPrefix,
                  urlSuffix: curRow.customLink.urlSuffix.replaceAll(/ /g, '')
                },
                cta: { id: curRow.cta.id, name: curRow.cta.name }
              }
            ];
            mCreate.mutate({ suses: params });
          }
        }
      };

      //set new cta
      const handleCtaChange = (selectedCta: any) => {
        setValue(selectedCta);
        table.options.meta?.updateCellData(index, id, selectedCta);
      };

      return (
        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems={'center'}
          sx={{
            '&:hover #btn-group-edit': {
              display: 'block'
            }
          }}
        >
          {id === 'customLink' && (
            <Stack direction={'row'} justifyContent={'between'} alignItems="center" flexGrow={1}>
              <Stack direction={'row'} flexGrow={1} alignItems="center">
                {curRow.id === '' ? (
                  <>
                    <Typography>{`https://${value?.domain}/${value?.pathPrefix}/`}</Typography>
                    {/* <TextField sx={{ minWidth: '120px' }} variant="outlined" disabled value={value?.domain} />
                    <Typography>/</Typography>
                    <TextField sx={{ minWidth: '60px' }} variant="outlined" disabled value={value?.pathPrefix} />
                    <Typography>/</Typography> */}
                    <TextField
                      variant="outlined"
                      sx={{ minWidth: '60px' }}
                      inputProps={{
                        maxLength: 8
                      }}
                      value={value?.urlSuffix}
                      onChange={(e) => setValue({ ...value, urlSuffix: e.target.value })}
                      onBlur={onBlur}
                    />
                  </>
                ) : (
                  <Typography>{`https://${value?.domain}/${value?.pathPrefix}/${value?.urlSuffix}`}</Typography>
                )}
              </Stack>
              <Stack>
                <ArrowForward color="secondary" />
                {/* <IconButton color="secondary">
                  <CopyAllOutlined />
                </IconButton> */}
              </Stack>
            </Stack>
          )}
          {id === 'destination' && (
            <TextField
              //variant="standard"
              fullWidth
              sx={{ minWidth: '100px' }}
              InputProps={{
                //disableUnderline: true
                disabled: true
              }}
              value={value as string}
              //onChange={(e) => setValue(e.target.value)}
              //onBlur={onBlur}
            />
          )}
          {id === 'cta' && (
            <>
              <Typography>{value ? `${value?.name}` : ''}</Typography>
              <Stack direction={'row'} justifyContent="end" alignItems={'center'} spacing={1}>
                {curRow.id === '' && (
                  <>
                    {matchesMd ? (
                      <>
                        <IconButton size="small" onClick={() => setIsOpenCTA(true)}>
                          <SearchOutlined fontSize="small" color="secondary" />
                        </IconButton>
                        <IconButton size="small" onClick={handleSave}>
                          <SaveOutlined fontSize="small" color="primary" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          startIcon={<SearchOutlined />}
                          onClick={() => setIsOpenCTA(true)}
                        >
                          Select CTA
                        </Button>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          startIcon={<SaveOutlined />}
                          loading={mCreate.isLoading}
                          disabled={!isValid() || mCreate.isLoading}
                          onClick={handleSave}
                        >
                          Save
                        </LoadingButton>
                      </>
                    )}
                  </>
                )}
                {mDelete.isLoading ? (
                  <CircularProgress size={'1.5em'} />
                ) : (
                  <IconButton
                    size="small"
                    aria-label="delete"
                    color="error"
                    disabled={mDelete.isLoading}
                    onClick={(event: any) => {
                      event.stopPropagation();
                      if (curRow.id) {
                        const params = {
                          ids: [curRow.id]
                        };
                        mDelete.mutate(params);
                      } else {
                        table.options.meta?.removeTableRow(index, id);
                      }
                    }}
                  >
                    <DeleteOutline fontSize="small" color="error" />
                  </IconButton>
                )}
              </Stack>
              <CTAList isOpen={isOpenCTA} onClose={() => setIsOpenCTA(false)} onChange={handleCtaChange} />
            </>
          )}
        </Stack>
      );
    }
  };

  //build columns - personal
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'customLink',
        header: () => (
          <Stack component={'span'} direction="row">
            {t('Custom Link')}
            <Typography color={'error'}>*</Typography>
          </Stack>
        )
      },
      {
        accessorKey: 'destination',
        header: () => (
          <Stack component={'span'} direction="row">
            {t('Destination Url')}
            <Typography color={'error'}>*</Typography>
          </Stack>
        )
      },
      {
        accessorKey: 'cta',
        header: () => <Box component={'span'}>{t('CTA')}</Box>
      }
      // {
      //   accessorKey: 'action',
      //   header: () => <span></span>
      // }
    ],
    []
  );

  //create new row
  const handleAddRow = () => {
    const newItems = [...linkItems];
    newItems.push({ id: '', customLink: { domain: SUS_DOMAIN, pathPrefix: SUS_PATH_PREFIX, urlSuffix: '' }, destination: '', cta: null });
    setLinkItems(newItems);
  };

  //table value change
  const hanleTableValueChange = (newData: CustomLink[]) => {
    if (newData) {
      //set destination url based on cta
      const newItems = [...newData];
      newItems.map((_item: CustomLink) => {
        if (_item.cta) {
          _item.destination = _item.cta.linkUrl;
        }
      });
      setLinkItems(newItems);
    }
  };

  //console.log('linkItems', linkItems);
  return (
    <Section header={t('Custom Back-Halves (Insert your own words at the end of a link)')}>
      <Box sx={{ p: 2, maxHeight: 'calc(100vh - 400px)' }} className="scroll-box">
        <Stack spacing={1.5}>
          <Typography>
            <em>Example:</em> https://example.com/company-name/help
          </Typography>
          <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
            <Typography>This custom link can't use for PURLs</Typography>
            {/* <LoadingButton variant="contained" color="primary" startIcon={<SaveOutlined />} onClick={handleSave}>
              Save
            </LoadingButton> */}
          </Stack>
          <Box>
            <ReactEditable8
              paging={{ pageIndex: 0, pageSize: 100 }}
              editableColumn={columnRender}
              columns={columns}
              data={[...linkItems]}
              setData={(newData: CustomLink[]) => hanleTableValueChange(newData)}
            />
            <Button size="small" variant="text" startIcon={<AddOutlined />} sx={{ mt: 0.5 }} onClick={handleAddRow}>
              {t('ncrm_common_btn_add')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Section>
  );
};

export default CustomDomain;
