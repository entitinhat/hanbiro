import React from "react";
import { TableContainer, Table, Paper, TableHead, useTheme, TableRow, TableCell, TableBody } from "@mui/material";
import { BillPaymentType } from "@settings/billing-license/types/bill-payment";
interface ShortTablePaymentShedule {
    props: any
}

const PaymentSheduleShortTable = ({ props }: ShortTablePaymentShedule) => {
    const { tableBody } = props;
    // console.log('tableBody: ', tableBody)
    const theme = useTheme();
    const border = `1px solid ${theme.palette.divider}`;
    const tableCellStyle = { border: border, "&::after": { display: "none" } }
    return (
        <TableContainer component={Paper} sx={{ boxShadow: "none", borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
            <Table sx={{ minWidth: 400, border: "unset" }} aria-label="simple table">
                <TableHead sx={{ border: 0, borderBottom: border }}>
                    <TableRow sx={{ borderLeft: 0, borderRight: 0, }}>
                        <TableCell sx={tableCellStyle} rowSpan={2}>Item</TableCell>
                        <TableCell sx={tableCellStyle} colSpan={2}>Billing Period</TableCell>
                    </TableRow>
                    <TableRow sx={{ borderLeft: 0, borderRight: 0 }}>
                        <TableCell sx={tableCellStyle}>2020</TableCell>
                        <TableCell sx={tableCellStyle}>2021</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableBody.map((tb: BillPaymentType) => {
                            return (
                                <TableRow sx={{ borderLeft: 0, borderRight: 0, '&.MuiTableRow-root:hover': { backgroundColor: "unset !important" } }} key={tb.id}>
                                    <TableCell sx={tableCellStyle}>{tb.item}</TableCell>
                                    <TableCell sx={tableCellStyle}>{tb.startOn}</TableCell>
                                    <TableCell sx={tableCellStyle}>{tb.endOn}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default PaymentSheduleShortTable;