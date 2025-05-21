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
    <TableContainer
      sx={{
        maxHeight: "370px",
        overflowY: "auto",
        marginBottom: "40px",
        scrollbarWidth: "none", 
        "&::-webkit-scrollbar": {
          display: "none", 
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {[
              "Storage ID",
              "City",
              "Country",
              "Street",
              "Capacity",
              "Current Parts",
              "Occupancy (%)",
              "Total Weight (kg)",
            ].map((header) => (
              <TableCell
                key={header}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                {header}
              </TableCell>
            ))}
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
