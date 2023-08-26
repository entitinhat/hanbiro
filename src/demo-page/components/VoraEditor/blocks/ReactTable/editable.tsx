import React, { useState } from 'react';

// third-party
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';

// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import {
  Box,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  ButtonGroup,
  IconButton
} from '@mui/material';
import { AddOutlined, ArrowBack, ArrowDownward, ArrowForward, ArrowUpward, Close, DeleteOutline, DragIndicator } from '@mui/icons-material';

//local
import Dropdown, { LabelValueIcon } from './Dropdown';

//constants
const ROW_HEIGHT = 54;
const ROW_ACTIONS = [
  { label: 'Add row to above', value: 'rowabove', icon: <ArrowUpward /> },
  { label: 'Add row to below', value: 'rowbelow', icon: <ArrowDownward /> },
  { label: 'Delete row', value: 'deleterow', icon: <Close /> }
];

const COLUMN_ACTIONS = [
  { label: 'Add column to left', value: 'colleft', icon: <ArrowBack /> },
  { label: 'Add column to right', value: 'colright', icon: <ArrowForward /> },
  { label: 'Delete column', value: 'deletecol', icon: <Close /> }
];

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

interface ReactEditable8Props {
  sx?: any;
  readOnly?: boolean;
  withHeadings?: boolean;
  stColumns: string[];
  data: any[]; //[object, object]
  setData: (val: any[]) => void;
  setHeader?: (cols: string[]) => void;
}

const ReactEditable = (props: ReactEditable8Props) => {
  const { readOnly, withHeadings = true, stColumns, data, setData, setHeader, sx } = props;
  const theme = useTheme();
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // Give our default column cell renderer editing superpowers!
  const columnRender: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('row index', index);
      //console.log('column id', id);
      const initialValue = getValue();

      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue || '');

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

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
          <TextField
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true,
              readOnly
            }}
            sx={{
              '& .MuiInputBase-root.Mui-focused': {
                border: `1px solid ${theme.palette.primary[400]}`,
                borderRadius: 1,
                p: 0.5
              }
            }}
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        </Stack>
      );
    }
  };

  //define table columns
  const columns = React.useMemo<ColumnDef<any>[]>(() => {
    return stColumns.map((_col, cIdx) => ({
      accessorKey: `c${cIdx + 1}`,
      //header: () => <span>{_col}</span>
      header: ({ column: { id }, table }) => {
        const [value, setValue] = React.useState(_col || '');

        // When the input is blurred, we'll call our table meta's updateData function
        const onBlur = () => {
          if (table.options.meta?.updateHeaderData) {
            table.options.meta.updateHeaderData(cIdx, value);
          }
        };

        return (
          <TextField
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true,
              readOnly
            }}
            sx={{
              '& .MuiInputBase-root.Mui-focused': {
                border: `1px solid ${theme.palette.primary[400]}`,
                borderRadius: 1,
                p: 0.5
              }
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        );
      }
    }));
  }, [stColumns]);

  //table instant
  const table = useReactTable({
    data,
    columns,
    defaultColumn: columnRender,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateTableData: (value) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        setData(value as any);
      },
      updateCellData: (rowIndex, columnId, value) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        const old = [...data];
        const newData = old.map((row: any, index: number) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex]!,
              [columnId]: value
            };
          }
          return row;
        });
        //console.log('newData', newData);
        setData(newData);
      },
      removeTableRow: (rowIndex, columnId) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        const newData = [...data];
        newData.splice(rowIndex, 1);
        setData(newData);
      },
      updateHeaderData: (colIndex, value) => {
        // Skip index reset until after next rerender
        skipAutoResetPageIndex();
        const newCols = [...stColumns];
        newCols[colIndex] = value as string;
        setHeader && setHeader(newCols);
        //setHeader && setHeader(colIndex, value);
      }
    },
    debugTable: false
  });

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredRow, setHoveredRow] = useState(-1);
  const [hoveredColumn, setHoveredColumn] = useState(-1);
  const [toolboxColLeftPos, setToolboxColLeftPos] = useState(0);
  const [toolboxRowTopPos, setToolboxRowTopPos] = useState(0);

  //mouse hover - display toolbox
  const openHover = (event: any, rIdx: number, ceIdx: number) => {
    //console.log('mouse event', rIdx, ceIdx);
    const curHoveredRow = rIdx + 1;
    const curHoveredColum = ceIdx + 1;

    setHoveredRow(rIdx + 1);
    setHoveredColumn(curHoveredColum);

    //calculate left position for toolbox column
    if (curHoveredColum > 0 && curHoveredColum <= columns.length) {
      const left = 1 + (curHoveredColum - 1) * 2;
      setToolboxColLeftPos(left);
    }

    //calculate top position for toolbox row
    if (curHoveredRow > 0 && curHoveredRow <= data.length) {
      let y1 = Math.ceil((event.screenY - event.clientY) / 2);
      //console.log('mouse event y1', y1);
      if (!withHeadings) {
        y1 = y1 - Math.ceil(ROW_HEIGHT / 1.2);
      }
      const top = y1 + Math.ceil(ROW_HEIGHT / 2) * (1 + (curHoveredRow - 1) * 2);
      setToolboxRowTopPos(top);
    }

    setIsHovered(true);
  };

  //TODO: how to know to close toolbox
  const closeHover = () => {
    //setIsHovered(true)
  };

  //add/remove row
  const handleRowChange = (action: string) => {
    const newData = [...data];
    let newEmptyRow: any = {};
    stColumns.map((_col, index) => {
      newEmptyRow[`c${index + 1}`] = '';
    });

    switch (action) {
      case 'rowabove':
        newData.splice(hoveredRow - 1, 0, newEmptyRow);
        setData(newData);
        break;
      case 'rowbelow':
        newData.splice(hoveredRow, 0, newEmptyRow);
        setData(newData);
        break;
      case 'deleterow':
        newData.splice(hoveredRow - 1, 1);
        setData(newData);
        break;
    }
  };

  //add/remove column
  const handleColumnChange = (action: string) => {
    const newCols = [...stColumns];

    switch (action) {
      case 'colleft':
        newCols.splice(hoveredColumn - 1, 0, '');
        setHeader && setHeader(newCols);
        break;
      case 'colright':
        newCols.splice(hoveredColumn, 0, '');
        setHeader && setHeader(newCols);
        break;
      case 'deletecol':
        newCols.splice(hoveredColumn - 1, 1);
        setHeader && setHeader(newCols);
        break;
    }
  };

  //add last row
  const handleAddLastRow = () => {
    const newData = [...data];
    let newEmptyRow: any = {};
    columns.map((_col, index) => {
      newEmptyRow[`c${index + 1}`] = '';
    });
    newData.push(newEmptyRow);
    setData(newData);
  };

  //console.log('withHeadings', withHeadings);
  //console.log('table data', data);
  //render
  return (
    // <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}`, ...sx }}>
    <>
      <Table size="small" sx={{ tableLayout: 'auto' }} onMouseLeave={closeHover}>
        {withHeadings && (
          <TableHead sx={{ bgcolor: theme.palette.grey[100], borderBottom: `1px solid ${theme.palette.divider}` }}>
            {table.getHeaderGroups().map((headerGroup: any, groupIdx: number) => (
              <TableRow key={groupIdx}>
                {headerGroup.headers.map((header: any, cIdx: number) => {
                  //console.log('table header', header);
                  //console.log('getCanSort', header.column.getCanSort());
                  //console.log('getIsSorted', header.column.getIsSorted());
                  return (
                    <TableCell
                      key={`${groupIdx}-${cIdx}`}
                      colSpan={header.colSpan}
                      sx={{
                        width: header?.column?.columnDef?.width ?? header?.column?.getSize(),
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                        // sx={{ display: 'inline-flex' }}
                      >
                        <Box sx={{ fontSize: 14, textTransform: 'capitalize' }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Box>
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
        )}
        <TableBody>
          {table.getRowModel().rows.map((row: any, rIdx: number) => {
            return (
              <TableRow
                key={rIdx}
                sx={{
                  height: ROW_HEIGHT,
                  bgcolor: row.getIsSelected() ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                }}
              >
                {row.getVisibleCells().map((cell: any, ceIdx: number) => {
                  return (
                    <TableCell
                      onMouseEnter={(event: any) => openHover(event, rIdx, ceIdx)}
                      sx={{ border: `1px solid ${theme.palette.divider}` }}
                      key={ceIdx}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {!readOnly && (
        <>
          {data.length == 0 && (
            <Box>
              <IconButton color="primary" onClick={handleAddLastRow}>
                <AddOutlined fontSize="small" />
              </IconButton>
            </Box>
          )}
          <Box
            sx={{
              display: isHovered ? 'block' : 'none',
              position: 'absolute',
              top: '-10px',
              left: `calc(((100% - 34px) / ${columns.length * 2}) * ${toolboxColLeftPos})`
            }}
          >
            <Dropdown
              onChange={(v: LabelValueIcon) => handleColumnChange(v.value)}
              items={COLUMN_ACTIONS}
              disabledValues={stColumns.length === 1 ? ['deletecol'] : []}
              icon={<DragIndicator fontSize="small" />}
              //color="secondary"
            />
          </Box>
          <Box
            sx={{
              display: isHovered && data.length > 0 ? 'block' : 'none',
              position: 'absolute',
              top: `${toolboxRowTopPos}px`,
              right: '-32px'
            }}
          >
            <Dropdown
              onChange={(v: LabelValueIcon) => handleRowChange(v.value)}
              items={ROW_ACTIONS}
              icon={<DragIndicator fontSize="small" />}
              //color="secondary"
            />
          </Box>
        </>
      )}
    </>
    // </TableContainer>
  );
};

export default ReactEditable;
