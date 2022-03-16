import React, { useState } from "react";
import Axios from 'axios'
import {
  Box,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
} from "@mui/material";

export default function PassGenerator() {
  const [passType, setPassType] = useState("word");
  const [length, setLength] = useState(12);
  const [generatedPass, setGeneratedPass] = useState('')
  
  const generate = () => {
    const obj = {
      passType: passType, 
      length: length
    }
    // console.log(obj)
    Axios.get('http://localhost:3001/a').then((res) => {
      // setPassType(res.data)
      console.log(res.data)
      setGeneratedPass(res.data)
    })
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
      <Button color="secondary" variant="contained" onClick={generate}>
        Generate
      </Button>
      {generatedPass && ( <Typography mt={2} variant='h1'>{generatedPass}</Typography> )}
      <Button variant='contained' onClick={() => navigator.clipboard.writeText(generatedPass)}>copy</Button>

      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{color: "#404040" }}
      >
        Generated Pass{passType}:
      </Typography>

      <Typography
        variant="h6"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        password123
      </Typography>
    </Box>
  );
}
