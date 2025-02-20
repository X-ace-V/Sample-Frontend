import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material';
import { jsPDF } from 'jspdf';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Message to be displayed in the PDF.
    const pdfMessage = `It's just a dummy frontend. The functionality to generate a researched PDF based on your prompt is currently unavailable because our backend, while fully developed, isn’t yet connected to the frontend. For the hackathon, we are providing this link as a demonstration of the frontend. In the actual hackathon, our fully integrated application—with both complete frontend and backend functionality—will be available.`;

    // Create a new PDF document.
    const doc = new jsPDF({
      unit: 'pt',
      format: 'letter',
    });

    doc.setFontSize(12);
    doc.text(pdfMessage, 40, 60, { maxWidth: 520 });

    // Generate a Data URI string of the PDF and set it to state.
    const dataUri = doc.output('datauristring');
    setPdfUrl(dataUri);
  };

  return (
    <>
      {/* Reset default browser margins */}
      <CssBaseline />

      {/* NAVBAR WITH LOGO - spans full width and has a bottom shadow */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src="/logo.png" // Update if your file is named differently
            alt="Knoware Logo"
            sx={{ height: 80, mr: 2 }}
          />
        </Toolbar>
      </AppBar>

      {/* Main content, spaced below navbar */}
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Knoware: A Research Agent
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Enter your research topic below and our Agent will do deep, comprehensive research and provide a report.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <TextField
              label="Research Topic"
              placeholder="e.g., The Future of Renewable Energy"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth size="large">
              Generate Research Paper
            </Button>
          </Box>

          {/* Display the PDF preview and download button if a PDF has been generated */}
          {pdfUrl && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" align="center" gutterBottom>
                PDF Preview
              </Typography>
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                width="100%"
                height="500px"
                style={{ border: 'none' }}
              ></iframe>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="outlined" color="primary" href={pdfUrl} download="research.pdf">
                  Download PDF
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default App;
