import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ReportOverview = ({ report }) => {
  if (!report || report.length === 0) return null;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>Storage ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>City</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>Country</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>Street</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>Capacity</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>Current Parts</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>Occupancy (%)</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "black" }}>Total Weight (kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.map((item) => (
            <TableRow key={item.storageId}>
              <TableCell sx={{ color: "black" }}>{item.storageId}</TableCell>
              <TableCell sx={{ color: "black" }}>{item.cityName}</TableCell>
              <TableCell sx={{ color: "black" }}>{item.countryIso}</TableCell>
              <TableCell sx={{ color: "black" }}>{item.streetName}</TableCell>
              <TableCell sx={{ color: "black" }}>{item.capacity}</TableCell>
              <TableCell sx={{ color: "black" }}>{item.currentPartsCount}</TableCell>
              <TableCell sx={{ color: "black" }}>{item.occupancyPercent}%</TableCell>
              <TableCell sx={{ color: "black" }}>{item.totalWeight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportOverview;
