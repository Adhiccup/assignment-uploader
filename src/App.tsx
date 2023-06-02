import React, { useState, useEffect } from "react";

import { Button, Box, Typography, LinearProgress } from "@mui/material";

import IconWord from './images/icon-word.svg';

const containerUploadStyle = {
  width: '580px',
  height: '212px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#A7E0CF',
  flexDirection: 'column',
  margin: 'auto',
  padding: '0 40px',
  borderRadius: '12px',
  border: "2px dotted #1A2741",
};

const buttonStyle = {
  textTransform: 'initial',
  borderRadius: '6px',
  color: '#1A2741',
  height: '60px',
  width: '195px',
  fontSize: '22px',
  fontWeight: '700',
  border: '2px solid #1A2741',
  "&:hover": {
    backgroundColor: '#1A2741',
    color: 'white',
  },
}

const textUploadStyle = {
  fontWeight: 400,
  fontSize: '22px',
  color: '#1A2741',
  lineHeight: '32px',
  fontStyle: 'normal',
  fontFamily: 'Raleway',
  fontFeatureSettings: '"pnum" on, "lnum" on',
  textAlign: 'center'
}

const textDropStyle = {
  color: '#1A2741',
  textAlign: 'center',
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeightL: '24px',
  fontWeight: '400'
}

const containerStyle = {
  width: '580px',
  height: '222px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#A7E0CF',
  flexDirection: 'column',
  margin: 'auto',
  padding: '0 40px',
  borderRadius: '12px',
  border: "2px dotted #1A2741",
  borderSpacing: '2px'
};


const progressTextStyle = {
  color: '#1A2741',
  fontSize: '22px',
  fontWeight: '700',
  fontStyle: 'normal'
}


const cancelStyle = {
  textTransform: 'initial',
  fontWeight: 700,
  fontSize: '16px',
  color: '#1A2741',
  textDecorationLine: 'underline',
  "&:hover": {
    backgroundColor: '#A7E0CF',
    color: '#1A2741',
  },
};

const textStyle = {
  fontWeight: 700,
  fontSize: '16px',
  color: '#07875E',
};

export default function App() {
  const [progress, setProgress] = React.useState(0);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return oldProgress;
        }
        const diff = Math.random() * 10;
        return Math.floor(Math.min(oldProgress + diff, 100));
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleCancel = () => {
    setShowComponent(!showComponent);
  }

  const handleClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.addEventListener('change', (event) => {
      setShowComponent(!showComponent);
    });
    fileInput.click();
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setShowComponent(!showComponent);
  };

  const Upload = () => (
    <Box onClick={handleClick} onDragOver={handleDragOver} onDrop={handleDrop} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#A7E0CF', padding: '5px', margin: 'auto', display: 'table', borderRadius: '12px' }}>
      <Box sx={containerUploadStyle}>
        <Box marginBottom='15px'>
          <Typography sx={textUploadStyle}>
            Add file to check container or start
          </Typography>
          <Typography sx={textUploadStyle}>
            signing by uploading documents
          </Typography>
        </Box>
        <Box marginBottom='16px'>
          <Button variant="outlined" sx={buttonStyle}>
            <img src={IconWord} style={{ marginLeft: '3px', marginRight: '8px', width: '21px', height: '25px' }} alt="" />
            Add file(s)
          </Button>
        </Box>
        <Box>
          <Typography sx={textDropStyle}>
            or drop document(s) here
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const Uploading = () => (
    <Box padding='5px' sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#A7E0CF', padding: '5px', margin: 'auto', display: 'table', borderRadius: '12px' }}>
      <Box sx={containerStyle}>
        <Box>
          <Typography sx={textStyle} gutterBottom align="center">
            Uploading file(s)
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <LinearProgress variant="determinate" value={progress} sx={{ background: 'white', height: '6px', width: '452px', borderRadius: '10px', flex: 1, marginRight: '16px', '& .MuiLinearProgress-bar': { backgroundColor: '#28AB82' } }} />
          <Typography sx={progressTextStyle}>
            {progress}%
          </Typography>
        </Box>
        <Box>
          <Button sx={cancelStyle} onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {showComponent && Uploading()}
      {!showComponent && Upload()}
    </>
  );
}

