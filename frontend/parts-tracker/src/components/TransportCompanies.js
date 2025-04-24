import { useState, useEffect } from "react";
import { getTransportCompanies, deleteTransportCompany, addTransportCompany } from "../services/transportCompanyService"; 
import { FaTrash, FaPlus } from "react-icons/fa"; 
import { Button, Modal, Box, Typography, TextField, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const TransportCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [newCompany, setNewCompany] = useState({ name: "", description: "" });
  const [openAddModal, setOpenAddModal] = useState(false);

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
    setOpenModal(true); 
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTransportCompany(companyToDelete.id);
      setDeleteSuccess(true); 
      setCompanies(companies.filter((company) => company.id !== companyToDelete.id)); 
      setOpenModal(false); 

      toast.success('Transport company deleted successfully!');

    } catch (err) {
      setOpenModal(false); 
      setDeleteSuccess(false);

      toast.error('An error occurred! Try again later');

    } finally {
      setCompanyToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenModal(false); 
    setCompanyToDelete(null); 
  };

  const handleAddCompany = async () => {
    try {
      const response = await addTransportCompany(newCompany); 
      setCompanies([...companies, response]); 
      setNewCompany({ name: "", description: "" }); 
      setOpenAddModal(false);

      toast.success('Transport company added successfully!');

    } catch (err) {
      setOpenAddModal(false); 
      setNewCompany({ name: "", description: "" }); 

      toast.error('An error occurred! Try again later.');

    }
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setNewCompany({ name: "", description: "" });
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
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpenAddModal(true)} 
          startIcon={<FaPlus />}
        >
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

      <Modal open={openAddModal} onClose={handleAddModalClose}>
        <Box sx={{
          width: 300,
          padding: "20px",
          margin: "20% auto",
          backgroundColor: "white",
          borderRadius: "8px"
        }}>
          <Typography variant="h6" gutterBottom>Add Transport Company</Typography>
          <TextField
            label="Company Name"
            fullWidth
            margin="normal"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={newCompany.description}
            onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Button variant="contained" color="secondary" onClick={handleAddModalClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddCompany}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openModal} onClose={handleDeleteCancel}>
        <Box sx={{
          width: 300,
          padding: "20px",
          margin: "20% auto",
          backgroundColor: "white",
          borderRadius: "8px"
        }}>
          <Typography variant="h6" gutterBottom>Confirm Deletion</Typography>
          <Typography>Are you sure you want to delete {companyToDelete?.name}?</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Button variant="contained" color="secondary" onClick={handleDeleteCancel}>
              No
            </Button>
            <Button variant="contained" color="primary" onClick={handleDeleteConfirm}>
              Yes
            </Button>
          </Box>
          {deleteSuccess !== null && (
            <Typography variant="body2" sx={{ marginTop: "10px", color: deleteSuccess ? "green" : "red" }}>
              {deleteSuccess ? "Company successfully deleted." : "Failed to delete company."}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TransportCompanies;
