import { Box, FormControl, InputLabel, MenuItem, Select, Pagination } from "@mui/material";

const PaginationControls = ({ pagination, onPageChange, onSizeChange }) => {
  const handleSizeChange = (event) => {
    onSizeChange(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        pt: 2,
        pb: 1,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 10,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Items per page</InputLabel>
        <Select
          value={pagination.size}
          label="Items per page"
          onChange={handleSizeChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>

      <Pagination
        count={pagination.totalPages}
        page={pagination.page + 1}
        onChange={(event, value) => onPageChange(value - 1)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default PaginationControls;