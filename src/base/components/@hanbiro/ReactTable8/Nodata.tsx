import { TableCell, TableRow } from "@mui/material";
import NoData from "../NoData";

interface NodataProps {
  colspan: number;
}

function Nodata({colspan}: NodataProps) {
  return (
    <TableRow>
      <TableCell colSpan={colspan}>
        <NoData />
      </TableCell>
    </TableRow>
  );
}

export default Nodata;
