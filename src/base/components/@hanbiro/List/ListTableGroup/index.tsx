import { useTranslation } from 'react-i18next';

import NoData from '@base/components/@hanbiro/NoData';

import { AccordionDetails, AccordionSummary, alpha, Box, Stack, StackProps, styled, Typography, useTheme, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

import ListTable, { ListTableProps } from '../ListTable';
import ListPagination from '../ListPagination';
import ListTableHeader from '../ListTable/ListTableHeader';
import { groupByKeyName } from '../helper';
import { LabelValue } from '@base/types/app';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: 0,
  borderBottom: '1px solid' + theme.palette.divider,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '& .MuiAccordionDetails-root': {
    border: 'none !important',
    padding: 0
  }
}));

interface ListTableGroupingProps {
  sx?: StackProps['sx'];
  data: any; //items
  groupKey: string;
  groupKeyValue?: string;
  groupKeyLabel?: string;
  tableProps: ListTableProps;
  listTableHeaderProps?: any;
  configAccordionSummary?: LabelValue[]; // to parse display groupKey from value to label if want to display AccordionSummary not just value
}

const ListTableGrouping = (props: ListTableGroupingProps) => {
  const { sx, data, groupKey, groupKeyValue, groupKeyLabel, tableProps, listTableHeaderProps, configAccordionSummary } = props;
  const { sxPaging, pagingProps, onPageChange } = tableProps;
  const theme = useTheme();
  const { t } = useTranslation();

  //grouping data
  const groupedItems = groupByKeyName({ data, keyName: groupKey, keyOptionValue: groupKeyValue });

  return (
    <Stack
      sx={
        {
          // px: 2,
          // mb: 4
        }
      }
      // spacing={2}
    >
      {listTableHeaderProps && (
        <Box sx={{ px: 2, height: 54 }}>
          <ListTableHeader {...listTableHeaderProps} />
        </Box>
      )}
      {data?.length == 0 && (
        <Box
          sx={{
            mx: 2,
            border: '1px solid' + theme.palette.divider,
            borderTop: 0
          }}
        >
          <NoData />
        </Box>
      )}
      {groupedItems.map((_item: any, index: number) => {
        return (
          <Box
            sx={{
              px: 2,
              '& .Mui-expanded': {
                color: `${theme.palette.primary.main} !important`
              },
              '& .MuiAccordionSummary-root': {
                flexDirection: 'row-reverse',
                '& .MuiAccordionSummary-content': {
                  marginLeft: 0
                },
                p: 2.75,
                pl: 6
              }
            }}
            key={index} //_item[keyName]?.[keyOptionValue]
          >
            <Accordion
              // defaultExpanded
              defaultExpanded={index == 0} //expanded the first child
              // expanded={expanded == item[keyNameToWrap][fieldToWrap]} // expanded per rows
              // onChange={handleChangeExpanded(item[keyNameToWrap][fieldToWrap])}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
                // sx={{
                //   // bgcolor: theme.palette.primary.lighter
                //   bgcolor: alpha(theme.palette.primary.lighter, 0.35)
                // }}
                expandIcon={
                  <Button
                    size="small"
                    endIcon={
                      <ExpandMoreIcon
                        sx={{
                          transition: 'all ease .3s'
                        }}
                      />
                    }
                    color="secondary"
                    variant="text"
                    disableRipple={true}
                    sx={{
                      '&::after': {
                        boxShadow: 'none'
                      },
                      '&:active::after': {
                        boxShadow: 'none'
                      },
                      '&:hover': {
                        backgroundColor: 'inherit'
                      }
                    }}
                  >
                    {configAccordionSummary ? (
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Typography fontWeight={400} color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                          {configAccordionSummary.find((_ele: LabelValue) => _ele.value == _item[groupKey])?.label +
                            ` ( ${_item.data.length} )`}
                        </Typography>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Typography fontWeight={400} color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                          {`${groupKeyLabel ? t(_item[groupKey]?.[groupKeyLabel]) : _item[groupKey]} ( ${_item.data.length} )`}
                        </Typography>
                      </Stack>
                    )}
                  </Button>
                }
                sx={{
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    transition: 'none',
                    '&.Mui-expanded': {
                      transform: 'none',
                      '& .MuiSvgIcon-root': {
                        transform: 'rotate(-180deg)'
                      }
                    }
                  },
                  bgcolor: '#F2F0F9' //alpha(theme.palette.primary.lighter, 0.35)
                }}
              >
                {/* <Stack direction="row" spacing={1.25} alignItems="center">
                  <Typography variant="h6" color="textPrimary">
                    {`${_item[groupKey]?.[groupKeyLabel]} ( ${_item.data.length} )`}
                  </Typography>
                </Stack> */}
              </AccordionSummary>
              <AccordionDetails>
                <ListTable
                  {...tableProps}
                  rows={_item.data || []}
                  pagingProps={undefined} //hide paging
                  sx={{
                    px: 0,
                    mb: 0,
                    borderRadius: 0,
                    border: 'none !important',
                    '& .MuiPaper-rounded': {
                      border: 'none',
                      borderRadius: 0
                    }
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
      {pagingProps && (
        <ListPagination
          gotoPage={(page: number) => onPageChange && onPageChange(page, pagingProps.pageSize)}
          setPageSize={(size: number, pageIndex) => onPageChange && onPageChange(pageIndex ?? pagingProps.pageIndex, size)}
          pageSize={pagingProps.pageSize}
          pageIndex={pagingProps.pageIndex}
          pageTotal={pagingProps.pageTotal}
          pageCount={pagingProps.pageCount}
          sx={sxPaging}
        />
      )}
    </Stack>
  );
};

export default ListTableGrouping;
