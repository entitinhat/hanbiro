// import MUI components
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, TableContainer, styled, useTheme, Button } from '@mui/material';

// import types
import { TableData } from '@settings/billing-license/types/tableData';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#28334a' : '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#28334a !important' : '#ffffff'
  },
  '&:last-of-type': {
    border: `1px solid ${theme.palette.mode === 'dark' ? '#1d263b !important' : '#b4bdce'}`
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'dark' ? '#1d263b !important' : '#b4bdce'}`,
  '& .MuiTableCell-root': {
    padding: '12px !important'
  }
}));

const TableInformation = (props: any) => {
  const theme = useTheme();
  return (
    <>
      <TableContainer>
        <Table sx={{ borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px' }}>
          <TableHead sx={{ borderBottom: 0 }}>
            <StyledTableRow>
              <StyledTableCell colSpan={1} sx={{ '&::after': { display: 'none' } }} className="table-head col-6" align="left">
                Name
              </StyledTableCell>
              <StyledTableCell colSpan={1} sx={{ '&::after': { display: 'none' } }} className="table-head col-6" align="left">
                Role
              </StyledTableCell>
              <StyledTableCell colSpan={1} sx={{ '&::after': { display: 'none' } }} className="table-head col-6" align="left">
                Email
              </StyledTableCell>
              <StyledTableCell colSpan={1} sx={{ '&::after': { display: 'none' } }} className="table-head col-6" align="left">
                Phone
              </StyledTableCell>
              <StyledTableCell colSpan={1} sx={{ '&::after': { display: 'none' } }} className="table-head col-6" align="left">
                Mobile
              </StyledTableCell>
              <StyledTableCell colSpan={1} sx={{ '&::after': { display: 'none' } }} className="table-head col-6" align="left">
                Delete
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  <div style={{ padding: '10px' }}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                      </svg>
                    </div>
                    <p style={{ margin: '8px 0' }}>No data available.</p>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {props.data &&
              props.data.length > 0 &&
              props.data.map((row: TableData) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell colSpan={1} className="col-6" align="left">
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fieldset: {
                            borderColor: '#b4bdce'
                          },
                          '&:hover fieldset': {
                            borderColor: '#b4bdce'
                          }
                        }
                      }}
                      defaultValue={row.name}
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} className="col-6" align="left">
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fieldset: {
                            borderColor: '#b4bdce'
                          },
                          '&:hover fieldset': {
                            borderColor: '#b4bdce'
                          }
                        }
                      }}
                      defaultValue={row.role}
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} className="col-6" align="left">
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fieldset: {
                            borderColor: '#b4bdce'
                          },
                          '&:hover fieldset': {
                            borderColor: '#b4bdce'
                          }
                        }
                      }}
                      defaultValue={row.email}
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} className="col-6" align="left">
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fieldset: {
                            borderColor: '#b4bdce'
                          },
                          '&:hover fieldset': {
                            borderColor: '#b4bdce'
                          }
                        }
                      }}
                      defaultValue={row.phone}
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} className="col-6" align="left">
                    <TextField
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fieldset: {
                            borderColor: '#b4bdce'
                          },
                          '&:hover fieldset': {
                            borderColor: '#b4bdce'
                          }
                        }
                      }}
                      defaultValue={row.mobile}
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell colSpan={1} className="col-6" align="left">
                    <Button
                      variant="text"
                      sx={{
                        borderRadius: '4px',
                        padding: '4px',
                        transition: 'all 0.2s linear',
                        backgroundColor: theme.palette.mode === 'dark' ? '#3b4863' : '#fff',
                        color: theme.palette.mode === 'dark' ? '#efefef' : '#001737',
                        minWidth: '36px',
                        '& > .delete__svg': {
                          width: '14px',
                          height: '14px'
                        },
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark' ? '#28334a' : '#fff',
                          color: theme.palette.mode === 'dark' ? '#efefef' : '#001737',
                          '& > .delete__svg': {
                            transform: 'scale(1.5)'
                          }
                        }
                      }}
                      // className="delete__btn"
                      onClick={() => props.onClick(row.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="delete__svg"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableInformation;
