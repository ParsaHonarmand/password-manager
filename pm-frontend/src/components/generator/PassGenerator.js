//import * as React from "react";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio, 
  Button,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function PassGenerator() {
  const [passType, setPassType] = useState("word");

  const [length, setValue] = React.useState(12);
  const [password, setPassword] = React.useState("");

  const handleLengthChange = (event, newValue) => {
    setValue(newValue);
  };

  const generatePassword = async (event) => {
    try {
      const res = await axios.post("http://localhost:3001/generatePassword", {length: length, type: passType})
      setPassword(res.data)
    } catch(error) {
      console.log("Failed to generate password")
      console.log(error)
    }
  }
  return (
    <Box>
      <FormControl sx={{ mt: 5 }}>
        <RadioGroup row name="row-radio-buttons-group">
          <FormControlLabel
            value="word"
            checked={passType === "word"}
            control={<Radio onChange={() => setPassType("word")} />}
            label="Word"
          />
          <FormControlLabel
            value="phrase"
            checked={passType === "phrase"}
            control={<Radio onChange={() => setPassType("phrase")} />}
            label="Phrase"
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
        sx={{ width: 1 / 2 }}
        valueLabelDisplay="on"
        value={length}
        onChange={handleLengthChange}
        min={8}
        max={20}
      />

      <Typography
        variant="h6"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        Password length: {length}
      </Typography>
      <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={generatePassword}
      >
        Submit
      </Button>
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
            height: "15vh",
            overflowY: "scroll"
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            style={{ 
              color: "#fff", 
              marginRight: "10px", 
              borderRight: "2px solid #fff", 
              padding: "10px",
            }}
          >
            Result
            <Button color="inherit">
              <ContentCopyIcon onClick={() => {navigator.clipboard.writeText(password)}} />
            </Button>
          </Typography>
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
