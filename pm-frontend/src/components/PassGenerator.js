import React, { useState } from "react";
import axios from 'axios'
import {
  Stack,
  Box,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function PassGenerator() {
  const [passType, setPassType] = useState("word");
  const [length, setLength] = useState(12);
  const [password, setPassword] = React.useState("");
  
  const generatePassword = async (event) => {
    try {      
      const res = await axios.post("http://localhost:3001/generatePassword", {length: length, type: passType})
      setPassword(res.data)
    } catch(error) {
      console.log("Failed to generate password")
      console.log(error)
    }
  }

  const handleLengthChange = (event, newValue) => {
    setLength(newValue);
  };

  return (
    <Box>
      <FormControl sx={{ mt: 5 }}>
        <RadioGroup row name="row-radio-buttons-group">
          <FormControlLabel
            value="word"
            checked={passType === "word"}
            control={<Radio onChange={() => setPassType("word")} />}
            label="Password"
          />
          <FormControlLabel
            value="phrase"
            checked={passType === "phrase"}
            control={<Radio onChange={() => setPassType("phrase")} />}
            label="Passphrase"
          />
        </RadioGroup>
      </FormControl>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        Generating Pass{passType}
      </Typography>

      <Slider
        aria-label="Password Length"
        sx={{ width: 1 / 2, mt: 3 }}
        valueLabelDisplay="on"
        value={length}
        onChange={handleLengthChange}
        min={8}
        max={20}
        color="secondary"
      />

      <Typography
        variant="h6"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        Password length: {length}
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" marginTop={3} marginBottom={3}>
        <Button color="secondary" variant="contained" onClick={generatePassword}>Generate</Button>
        {password !== "" &&
          <IconButton color="inherit">
            <ContentCopyIcon onClick={() => {navigator.clipboard.writeText(password)}} />
          </IconButton>
        }
      </Stack>

      {password !== "" &&
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            bgcolor: "darkcyan",
            borderRadius: 1,
            width: "50%",
            margin: "auto",
            height: "fit-content",
            overflowY: "auto"
          }}
        >
          <Typography
            variant="h6"
            component="div"
            gutterBottom
            style={{ color: "#fff", margin: "auto", padding: "5px" }}
          >
            <b>{password}</b>
          </Typography>
        </Box>
      }
    </Box>
  );
}
