import MainCard from '@base/components/App/MainCard';
import VoraEditor from '@demo-page/components/VoraEditor';
import { Box, Container } from '@mui/material';
import React from 'react';

const EditorPage = () => {
  return (
    <MainCard sx={{ m: 2, height: 'calc(100vh - 120px)' }} title="Vora Editor - developing from Editorjs">
      <React.Fragment>
        <Container sx={{ p: 2, backgroundColor: '#d4ecff', minHeight: '100vh' }} maxWidth="xl">
          <Box
            sx={{
              //px: 9,
              backgroundColor: '#ffffff',
              border: '1px solid #cccccc'
            }}
          >
            <VoraEditor />
          </Box>
        </Container>
      </React.Fragment>
    </MainCard>
  );
};

export default EditorPage;
