import { useState, useEffect } from "react";
import { getTransportCompanies, deleteTransportCompany } from "../services/transportCompanyService";
import { FaTrash } from "react-icons/fa";
import { Button, Modal, Box, Typography, CircularProgress } from "@mui/material";

const TransportCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTransportCompanies();
        setCompanies(data.content);
      } catch (err) {
        setError(true);
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
      alert("Transport company successfully deleted!");
    } catch (err) {
      setDeleteSuccess(false);
      alert("Transport company couldn't be deleted. Try again later");
    } finally {
      setOpenModal(false);
      setCompanyToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenModal(false);
    setCompanyToDelete(null);
  };

  return (
    <div style={{ fontFamily: "Roboto" }}>
      <h2>Transport Companies</h2>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Unable to load transport companies at the moment. Please try again later.
        </Typography>
      ) : companies.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          There are currently no transport companies to display.
        </Typography>
      ) : (
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
      )}

      <Modal open={openModal} onClose={handleDeleteCancel}>
        <Box sx={{
          width: 300,
          padding: "20px",
          margin: "20% auto",
          backgroundColor: "white",
          borderRadius: "8px",
          fontFamily: "Roboto"
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
