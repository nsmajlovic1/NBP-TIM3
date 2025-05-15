import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ReportOverview = ({ report }) => {
  if (!report || report.length === 0) return null;

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Storage ID</strong></TableCell>
            <TableCell><strong>City</strong></TableCell>
            <TableCell><strong>Country</strong></TableCell>
            <TableCell><strong>Street</strong></TableCell>
            <TableCell><strong>Capacity</strong></TableCell>
            <TableCell><strong>Current Parts</strong></TableCell>
            <TableCell><strong>Occupancy (%)</strong></TableCell>
            <TableCell><strong>Total Weight (kg)</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.map((item) => (
            <TableRow key={item.storageId}>
              <TableCell>{item.storageId}</TableCell>
              <TableCell>{item.cityName}</TableCell>
              <TableCell>{item.countryIso}</TableCell>
              <TableCell>{item.streetName}</TableCell>
              <TableCell>{item.capacity}</TableCell>
              <TableCell>{item.currentPartsCount}</TableCell>
              <TableCell>{item.occupancyPercent}%</TableCell>
              <TableCell>{item.totalWeight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportOverview;
