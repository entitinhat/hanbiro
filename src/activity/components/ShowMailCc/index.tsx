import { Box, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

interface Cc {
  cc: boolean;
  bcc: boolean;
}

interface showMailCcProps {
  value: Cc
  onChange: (val: Cc) => void;
}

const ShowMailCc = ({ value, onChange }: showMailCcProps) => {
  const onChangeCc = useCallback((source: string) => {
    if (source == 'cc') {
      onChange({ ...value, cc: !value.cc })
    } else {
      onChange({ ...value, bcc: !value.bcc })
    }
  }, [value])

  return (
    <Stack direction={"row"} justifyContent={"end"}>
      <Box sx={{ cursor: "pointer", mr: 1 }} onClick={() => onChangeCc('cc')}>
        <Typography variant="inherit" color={'primary'}>Cc</Typography>
      </Box>
      <Box sx={{ cursor: "pointer" }} onClick={() => onChangeCc('bcc')}>
        <Typography variant="inherit" color={'primary'}>Bcc</Typography>
      </Box>
    </Stack>
  );
}

export default ShowMailCc;
