import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  useTheme
} from '@mui/material';
import {
  ReceiptLong as ReceiptLongIcon,
  Atm as AtmIcon,
  Assessment as AssessmentIcon,
  HistoryEdu as HistoryEduIcon,
  Percent as PercentIcon,
  PriceChange as PriceChangeIcon
} from '@mui/icons-material';
import BackButton from '../components/BackButton';

const Transactions = () => {
  const theme = useTheme();

  const menuItems = [
    {
      title: 'Monitor Transactions',
      description: 'Track all system payments, receipts, and transaction logs.',
      icon: <ReceiptLongIcon sx={{ fontSize: 50, color: '#00e5ff' }} />,
      btnText: 'Open',
      btnColor: 'primary'
    },
    {
      title: 'Agent Withdrawals',
      description: 'Approve or reject agent withdrawal requests securely.',
      icon: <AtmIcon sx={{ fontSize: 50, color: '#00e676' }} />,
      btnText: 'Withdrawals',
      btnColor: 'success'
    },
    {
      title: 'Financial Reports',
      description: 'View detailed monthly or yearly income & expense reports.',
      icon: <AssessmentIcon sx={{ fontSize: 50, color: '#d500f9' }} />,
      btnText: 'Generate',
      btnColor: 'secondary'
    },
    {
      title: 'Audit Logs',
      description: 'Review system activity and access logs for financial tracking.',
      icon: <HistoryEduIcon sx={{ fontSize: 50, color: '#ff9100' }} />,
      btnText: 'View Logs',
      btnColor: 'warning'
    },
    {
      title: 'Commission Rates',
      description: 'Modify commission settings for agents and transactions.',
      icon: <PercentIcon sx={{ fontSize: 50, color: '#2979ff' }} />,
      btnText: 'Set Rates',
      btnColor: 'info'
    },
    {
      title: 'Pricing Rules',
      description: 'Control how pricing is calculated for slots and penalties.',
      icon: <PriceChangeIcon sx={{ fontSize: 50, color: '#ff1744' }} />,
      btnText: 'Update Rules',
      btnColor: 'error'
    }
  ];

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
            background: 'linear-gradient(45deg, #ffd700, #ff8f00)', // Gold/Orange gradient for money
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
            textShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
          }}
        >
          💰 Transaction Management
        </Typography>

        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 30px ${theme.palette[item.btnColor]?.main || '#fff'}40`,
                  }
                }}
              >
                <Box sx={{ mb: 2, p: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                  {item.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                  {item.description}
                </Typography>
                <Button
                  variant="outlined"
                  color={item.btnColor}
                  fullWidth
                  sx={{ borderRadius: '20px', fontWeight: 'bold' }}
                >
                  {item.btnText}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Transactions;
