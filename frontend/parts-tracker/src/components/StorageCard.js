import { useState, useEffect } from 'react'; 
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  Dialog, 
  DialogTitle,
  DialogContent,
  CircularProgress,
  Box,
  DialogActions
} from '@mui/material';
import { toast } from 'react-toastify';
import { uploadStorageImage } from '../services/imageService';

const StorageCard = ({ storage, isSelected, onClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [storageImageUrl, setStorageImageUrl] = useState(null);

  const { streetName, cityName, countryIso } = storage.location;
  const {
    name: teamName,
    description: teamDescription,
    countryIso: teamCountry,
  } = storage.team;

  useEffect(() => {
    if (storage.image) {
      const url = URL.createObjectURL(storage.image);
      setStorageImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setStorageImageUrl(null);
      };
    } else {
      setStorageImageUrl(null);
    }
  }, [storage.image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Only JPG and PNG images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await uploadStorageImage(storage.id, selectedFile); 

      toast.success('Image uploaded successfully!');
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || 'Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedFile(null);
    setFileName('');
    setImagePreview('');
    setModalOpen(false);
  };

  return (
    <>
      <Card
        onClick={onClick}
        sx={{
          border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
          cursor: "pointer",
          transition: "0.3s",
          "&:hover": { boxShadow: 3 },
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          height: "auto",
          minHeight: 180,
        }}
      >

        <Box
          sx={{
            width: '100%',
            height: 150,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {storageImageUrl ? (
            <img
              src={storageImageUrl}
              alt={`Storage ${storage.id}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
              No image available
            </Typography>
          )}
        </Box>

        <CardContent sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
          <div>
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              <strong>ID:</strong> {storage.id}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              <strong>Address:</strong> {`${streetName}, ${cityName}, ${countryIso}`}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              <strong>Capacity:</strong> {storage.capacity}
            </Typography>
          </div>

          <Paper elevation={1} sx={{
            mt: 2,
            p: 1.5,
            backgroundColor: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
            maxHeight: 100,
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}>
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              <strong>Team:</strong> {teamName} ({teamCountry})
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>
              <strong>Description:</strong> {teamDescription}
            </Typography>
          </Paper>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, alignSelf: "start" }}
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            Upload Image
          </Button>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" component="label" fullWidth>
              Choose Image
              <input 
                type="file" 
                hidden 
                accept="image/png, image/jpeg" 
                onChange={handleFileChange} 
              />
            </Button>
            
            {fileName && (
              <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                Selected file: {fileName}
              </Typography>
            )}
            
            {imagePreview && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: 2,
                mb: 2,
                maxHeight: '300px',
                overflow: 'hidden'
              }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px',
                    borderRadius: '4px'
                  }} 
                />
              </Box>
            )}
            
            <Typography variant="caption" color="textSecondary">
              Allowed formats: JPG, PNG (max 5MB)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCloseModal} 
            variant="outlined" 
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!selectedFile || isUploading}
            startIcon={isUploading ? <CircularProgress size={20} /> : null}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StorageCard;
