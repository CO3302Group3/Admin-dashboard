import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  IconButton
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  SystemUpdate as SystemUpdateIcon,
  ReportProblem as ReportProblemIcon,
  Close as CloseIcon,
  Send as SendIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import BackButton from '../components/BackButton';

const Notifications = () => {
  const theme = useTheme();

  // State for Dialogs
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [otaOpen, setOtaOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  // State for Broadcast Form
  const [broadcastData, setBroadcastData] = useState({ title: '', message: '', target: 'all' });

  // State for OTA Form
  const [otaData, setOtaData] = useState({ version: '', description: '' });

  // Handlers
  const handleBroadcastSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER_IP}/device_notification/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Assuming Bearer token, or pass as query/body depending on backend
        },
        body: JSON.stringify({
          title: broadcastData.title,
          message: broadcastData.message,
          target_audience: broadcastData.target,
          token: token // Sending token in body as well just in case, consistent with other endpoints
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      console.log('Broadcast Sent:', broadcastData);
      alert(`Broadcast Sent Successfully: ${broadcastData.title}`);
      setBroadcastOpen(false);
      setBroadcastData({ title: '', message: '', target: 'all' }); // Reset form

    } catch (error) {
      console.error("Failed to send broadcast:", error);
      alert(`Failed to send broadcast: ${error.message}`);
    }
  };

  const handleOtaSubmit = () => {
    console.log('Pushing OTA Update:', otaData);
    alert(`OTA Update Pushed: ${otaData.version}`);
    setOtaOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a237e 100%)`,
        pt: 5,
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <BackButton />
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
            mb: 6,
          }}
        >
          🔔 Notification Center
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Broadcast Card */}
          <Grid item xs={12} md={4}>
            <NotificationCard
              icon={<CampaignIcon sx={{ fontSize: 60, color: '#00e5ff' }} />}
              title="Broadcast Notifications"
              description="Send important announcements to all users or specific groups instantly."
              buttonText="Send Broadcast"
              onClick={() => setBroadcastOpen(true)}
            />
          </Grid>

          {/* OTA Card */}
          <Grid item xs={12} md={4}>
            <NotificationCard
              icon={<SystemUpdateIcon sx={{ fontSize: 60, color: '#7c4dff' }} />}
              title="OTA Firmware Updates"
              description="Deploy over-the-air updates to connected devices remotely."
              buttonText="Push Update"
              onClick={() => setOtaOpen(true)}
            />
          </Grid>

          {/* Action Card */}
          <Grid item xs={12} md={4}>
            <NotificationCard
              icon={<ReportProblemIcon sx={{ fontSize: 60, color: '#ff9100' }} />}
              title="Take Action"
              description="Review and resolve reported issues and system alerts."
              buttonText="Review Reports"
              onClick={() => setActionOpen(true)}
            />
          </Grid>
        </Grid>

        {/* --- DIALOGS --- */}

        {/* Broadcast Dialog */}
        <CustomDialog
          open={broadcastOpen}
          onClose={() => setBroadcastOpen(false)}
          title="📣 Send Broadcast"
        >
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={broadcastData.title}
            onChange={(e) => setBroadcastData({ ...broadcastData, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={broadcastData.message}
            onChange={(e) => setBroadcastData({ ...broadcastData, message: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Target Audience</InputLabel>
            <Select
              value={broadcastData.target}
              label="Target Audience"
              onChange={(e) => setBroadcastData({ ...broadcastData, target: e.target.value })}
            >
              <MenuItem value="all">All Users</MenuItem>
              <MenuItem value="admins">Admins Only</MenuItem>
              <MenuItem value="agents">Agents Only</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleBroadcastSubmit}
              sx={{ background: 'linear-gradient(90deg, #00e5ff, #00b0ff)' }}
            >
              Send Now
            </Button>
          </Box>
        </CustomDialog>

        {/* OTA Dialog */}
        <CustomDialog
          open={otaOpen}
          onClose={() => setOtaOpen(false)}
          title="🛠️ Push OTA Update"
        >
          <TextField
            fullWidth
            label="Firmware Version (e.g., v1.2.0)"
            variant="outlined"
            margin="normal"
            value={otaData.version}
            onChange={(e) => setOtaData({ ...otaData, version: e.target.value })}
          />
          <TextField
            fullWidth
            label="Update Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            value={otaData.description}
            onChange={(e) => setOtaData({ ...otaData, description: e.target.value })}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleOtaSubmit}
              color="secondary"
            >
              Deploy Update
            </Button>
          </Box>
        </CustomDialog>

        {/* Action Dialog */}
        <CustomDialog
          open={actionOpen}
          onClose={() => setActionOpen(false)}
          title="⚙️ Pending Actions"
        >
          <Typography variant="body1" color="text.secondary">
            No critical issues reported at the moment.
          </Typography>
        </CustomDialog>

      </Container>
    </Box>
  );
};

// --- Reusable Components ---

const NotificationCard = ({ icon, title, description, buttonText, onClick }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      p: 3,
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
      }
    }}
  >
    <Box sx={{ mb: 2 }}>{icon}</Box>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
      {description}
    </Typography>
    <Button variant="contained" fullWidth onClick={onClick}>
      {buttonText}
    </Button>
  </Card>
);

const CustomDialog = ({ open, onClose, title, children }) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{
      sx: {
        background: '#1e1e2f',
        color: 'white',
        borderRadius: 3,
        border: '1px solid rgba(255,255,255,0.1)'
      }
    }}
  >
    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {title}
      <IconButton onClick={onClose} sx={{ color: 'grey.500' }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      {children}
    </DialogContent>
  </Dialog>
);

export default Notifications;
