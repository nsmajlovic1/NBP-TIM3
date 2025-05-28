import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  Typography
} from '@mui/material';

const ImageUploadModal = ({ 
  open, 
  onClose, 
  fileName,
  onFileChange,
  onSubmit,
  isUploading = false
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Image</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Button variant="outlined" component="label">
            Choose Image
            <input 
              type="file" 
              hidden 
              accept="image/png, image/jpeg" 
              onChange={onFileChange} 
            />
          </Button>
          {fileName && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected file: {fileName}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          disabled={!fileName || isUploading}
          startIcon={isUploading ? <CircularProgress size={20} /> : null}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadModal;