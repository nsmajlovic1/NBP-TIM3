import { useState, useEffect } from "react";
import { getTransportCompanies, deleteTransportCompany, addTransportCompany } from "../services/transportCompanyService";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Button, CircularProgress, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
import AddTransportCompanyModal from "./AddTransportCompanyModal";

const TransportCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTransportCompanies();
        setCompanies(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTransportCompany(companyToDelete.id);
      setCompanies(companies.filter((company) => company.id !== companyToDelete.id));
      setOpenDeleteModal(false);
      toast.success('Transport company deleted successfully!');
    } catch (err) {
      setOpenDeleteModal(false);
      toast.error('An error occurred! Try again later');
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
    setCompanyToDelete(null);
  };

  const handleAddCompany = async (newCompany) => {
    try {
      const response = await addTransportCompany(newCompany);
      setCompanies([...companies, response]);
      setOpenAddModal(false);
      toast.success('Transport company added successfully!');
    } catch (err) {
      setOpenAddModal(false);
      toast.error('An error occurred! Try again later.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <div style={{ fontFamily: "Roboto" }}>Transport companies couldn't be loaded. Try again later.</div>;

  return (
    <div style={{ fontFamily: "Roboto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Transport Companies</h2>
        <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)} startIcon={<FaPlus />}>
          Add Company
        </Button>
      </div>

      {companies.length === 0 && (
        <Typography variant="body1" color="textSecondary">
          There are currently no transport companies to display.
        </Typography>
      )}

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {companies.map((company, index) => (
          <li
            key={company.id}
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px"
            }}
          >
            <div>
              <strong>{index + 1}. {company.name}</strong>
              <p>{company.description}</p>
            </div>
            <Button onClick={() => handleDeleteClick(company)} style={{ color: "red" }}>
              <FaTrash size={20} />
            </Button>
          </li>
        ))}
      </ul>

      <AddTransportCompanyModal open={openAddModal} onClose={() => setOpenAddModal(false)} onCompanyAdded={handleAddCompany} />

      <Dialog open={openDeleteModal} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {companyToDelete?.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">No</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransportCompanies;
