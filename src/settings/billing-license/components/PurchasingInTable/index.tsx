import { Drawer, Box, Card, CardContent, Typography, useTheme, Stack, Autocomplete, TextField, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CardActions, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import DatePicker from "@base/components/@hanbiro/Date/DatePicker";
import { FormIcon } from "@base/components/@hanbiro/FormIcon";
interface PurchasingTableModal {
    dataHeader: any;
    action: boolean;
    purchasingData: any;
    close: () => void;
}
const PurchasingTableModal = (props: PurchasingTableModal) => {
    const styleDrawer = {
        position: 'absolute' as 'absolute',
        width: '400px',
        top: '0',
        bottom: '0',
        right: '0',
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column'
    };
    const { dataHeader, action, purchasingData, close } = props;
    const theme = useTheme();
    const border = `1px solid ${theme.palette.divider}`;
    const colorText = '#8392a5';
    const optionAutoComplete = [{}];
    const date = new Date();
    const [dateValue, setDateValue] = useState(date);
    const tableHeader = dataHeader

    const colorIcon = theme.palette.mode === 'dark' ? '#fff' : '#8392a5';
    return (
        <div>
            <Drawer
                anchor="right"
                open={action}
                onClose={close}
                PaperProps={{
                    sx: {
                        width: '400px',
                        height: '100vh'
                    }
                }}
            >
                <Box sx={styleDrawer}>
                    <Card sx={{ height: "100% !important", padding: "0 !important" }}>
                        <CardContent sx={{ borderBottom: border }}>
                            <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>Purchasing</Typography>
                        </CardContent>
                        <CardContent sx={{ borderBottom: border, height: "calc(100vh - 130px)" }}>
                            {purchasingData === "Monthly" || purchasingData === "" ? <Stack direction="column" spacing={2} fontSize={"0.875rem"}>
                                <Typography sx={{ color: colorText }}>Item Name</Typography>
                                <Typography>10G Storage</Typography>
                                <Typography sx={{ color: colorText }}>Billing Plan</Typography>
                                <Autocomplete
                                    options={optionAutoComplete}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <Typography sx={{ color: colorText }}>Billing Plan</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={dateValue} onChange={(newValue: any) => {
                                        setDateValue(newValue);
                                    }} />
                                </LocalizationProvider>
                                <Typography sx={{ color: colorText }}>End on</Typography>
                                <Typography>2021/07/27</Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ boxShadow: "unset" }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ width: "130px", border: border, '&::after': { display: "none" } }}>User</TableCell>
                                                <TableCell sx={{ border: border, '&::after': { display: "none" } }}>Term</TableCell>
                                                <TableCell sx={{ border: border, '&::after': { display: "none" } }}>Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow sx={{
                                                '&.MuiTableRow-root:hover': {
                                                    backgroundColor: "unset !important"
                                                },
                                            }}>
                                                <TableCell sx={{ border: border }}>
                                                    <TextField size="small" variant="outlined" type="number" />
                                                </TableCell>
                                                <TableCell sx={{ border: border }}>6 months 10 days	</TableCell>
                                                <TableCell sx={{ border: border }}></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack> :
                                <Stack direction="column" spacing={2}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {
                                                        tableHeader.map((tb: any, index: any) => {
                                                            return (
                                                                <TableCell sx={{ border: border, borderBottom: 0, '&::after': { display: "none" } }} key={index}>
                                                                    {tb.name}
                                                                </TableCell>
                                                            )
                                                        })
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    sx={{
                                                        '&.MuiTableRow-root:hover': {
                                                            backgroundColor: 'unset !important'
                                                        }, borderBottom: border
                                                    }}>
                                                    <TableCell colSpan={tableHeader.length} sx={{ textAlign: "center", border: border, borderBottom: 0, color: colorText }}>
                                                        {/* <DataBaseIcon fillColor={colorText} size={60} /> */}
                                                        <Box sx={{ fill: colorIcon }}>
                                                            <FormIcon icon="database" iconType="icon" size={50} />
                                                        </Box>
                                                        <Typography >No data available.</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Box sx={{ width: "30%" }}>
                                            <Typography>Sub-Total</Typography>
                                            <Typography>Tax</Typography>
                                            <hr style={{ border: border }} />
                                            <Typography sx={{ fontWeight: "bold" }}>Total</Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            }
                        </CardContent>
                        {
                            purchasingData === "Monthly" || purchasingData === "" ?
                                <CardActions sx={{ float: "right", padding: 2 }}>
                                    <Button sx={{ border: border, color: "#7987a1" }} variant="outlined" onClick={close}>Cancle</Button>
                                    <Button variant="contained">Make Payment</Button>
                                </CardActions> :
                                <CardActions sx={{ float: "right" }}>
                                    <Button sx={{ border: border, color: "#7987a1" }} variant="outlined" onClick={close}>Cancle</Button>
                                    <Button variant="contained">Save</Button>
                                </CardActions>
                        }
                    </Card>
                </Box>
            </Drawer>
        </div >
    )
}
export default PurchasingTableModal;