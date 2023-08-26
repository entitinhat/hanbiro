// import React
import React, { MutableRefObject } from 'react';

// import MUI components
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// import css

// Custom component
const DivLogo = styled('div')(({ theme }) => ({
  color: `${theme.palette.mode === 'dark' ? 'white' : 'rgb(50, 51, 56)'} `,
  borderRadius: '5px',
  textAlign: 'center',
  width: '100%',
  border: `2px dashed ${theme.palette.mode === 'dark' ? '#606a7e' : '#b4bdce'}`,
  '&:hover': {
    borderColor: `${theme.palette.mode === 'dark' ? '#1c2537' : '#e2e5ed'} `,
    backgroundColor: `${theme.palette.mode === 'dark' ? '#28334a' : '#fff'}`
  }
}));

const DragDropFiles = () => {
  const [file, setFile] = React.useState<any>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const inputRef = React.useRef() as MutableRefObject<HTMLInputElement>;

  // triggers the input when the button is clicked
  const handleClick = (e: any) => {
    e.preventDefault();
    if (inputRef !== null) inputRef.current.click();
  };

  // triggers when file is selected with click
  const handleChange = (e: any) => {
    // console.log(e.target?.files[0]);
    if (e.target?.files && e.target?.files[0]) {
      setFile(e.target?.files[0]);
      return;
    }
    setFile(null);
  };

  React.useEffect(() => {
    if (!file) {
      setImage(null);
      return;
    }
    // create the image
    const objectUrl: any = URL.createObjectURL(file);
    setImage(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // console.log(image);

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setImage(null);
  };

  const dragOver = (e: any) => {
    e.preventDefault();
    const uploadLogo = document.querySelector('.upload__svg');
    uploadLogo?.classList.add('upload__svg--drop');
  };

  const dragEnter = (e: any) => {
    e.preventDefault();
    // const uploadLogo = document.querySelector('.upload__logo');
    const uploadLogo = document.querySelector('.upload__svg');
    uploadLogo?.classList?.remove('upload__svg--drop');
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
    // const uploadLogo = document.querySelector('.upload__logo');
    const uploadLogo = document.querySelector('.upload__svg');
    uploadLogo?.classList?.remove('upload__svg--drop');
  };

  const fileDrop = (e: any) => {
    e.preventDefault();
    // const file = e.dataTransfer.files;
    // console.log(e.dataTransfer.files[0]);
    setFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      {!image && (
        <Box
          tabIndex={0}
          className="upload__logo"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onSubmit={(e) => e.preventDefault()}
          width="fit-content"
        >
          <DivLogo className="upload__svg" onClick={handleClick}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 16 12 12 8 16"></polyline>
              <line x1="12" y1="12" x2="12" y2="21"></line>
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
              <polyline points="16 16 12 12 8 16"></polyline>
            </svg>
            <p className="text">Drag & Drop Files</p>
            <Box className="text">
              <strong>0 B</strong>
              <span> / 9.54MB</span>
            </Box>
          </DivLogo>

          <input type="file" accept="image/*" className="upload__input" hidden tabIndex={-1} ref={inputRef} onChange={handleChange} />
        </Box>
      )}
      {image && (
        <Box className="remove__logo">
          <button className="remove__svg" onClick={handleDrop}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
          <img src={image} alt="" className="img__preview" />
        </Box>
      )}
    </>
  );
};

export default DragDropFiles;
