import { useEffect, useState } from "react";
import { getTransportCompanies } from "../services/transportCompanyService"; 
import { Box, Typography, Paper } from "@mui/material"; 

const TransportCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getTransportCompanies(); 
        if (Array.isArray(data.content)) {
          setCompanies(data.content); 
        } else {
          throw new Error("Received data.content is not an array");
        }
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCompanies(); 
  }, []);

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>; 

  return (
    <div>
      <h2 style={{ fontFamily: "'Roboto', sans-serif" }}>Transport Companies</h2>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {companies.map((company, index) => (
          <Paper
            key={company.id}
            sx={{
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontFamily: "'Roboto', sans-serif",
              boxShadow: 3, 
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6">
              {index + 1}. {company.name}
            </Typography>
            <Typography>{company.description}</Typography>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default TransportCompanies;
