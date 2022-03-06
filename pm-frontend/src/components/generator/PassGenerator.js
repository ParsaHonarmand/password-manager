import React, { useState } from "react";
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

export default function PassGenerator() {
  const [passType, setPassType] = useState("word");

  const [length, setValue] = React.useState(12);
  const handleLengthChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <FormControl sx={{ mt: 5 }}>
        <RadioGroup row name="row-radio-buttons-group">
          <FormControlLabel
            value="word"
            checked={passType === "word"}
            control={<Radio onChange={() => setPassType("word")} />}
            label="word"
          />
          <FormControlLabel
            value="phrase"
            checked={passType === "phrase"}
            control={<Radio onChange={() => setPassType("phrase")} />}
            label="phrase"
          />
        </RadioGroup>
      </FormControl>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        Generating pass{passType}
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
      <Button color="secondary" variant="contained">
        Generate
      </Button>
    </Box>
  );
}
