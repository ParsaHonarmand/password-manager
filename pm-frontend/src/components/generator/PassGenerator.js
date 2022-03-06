//import * as React from "react";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  Link,
  Slider,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";

export default function PassGenerator() {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const [passType, setPassType] = useState("word");

  const [length, setValue] = React.useState(12);
  const handleLengthChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Radio
        checked={selectedValue === "a"}
        onChange={() => setSelectedValue("a")}
        value="a"
        name="radio-buttons"
        inputProps={{ "aria-label": "A" }}
      />
      <Radio
        checked={selectedValue === "b"}
        onChange={() => setSelectedValue("b")}
        value="b"
        name="radio-buttons"
        inputProps={{ "aria-label": "B" }}
      />
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        Generating Pass{passType}
      </Typography>

      <Stack alignItems="center">
        <Slider
          aria-label="Password Length"
          sx={{ width: 1 / 2 }}
          valueLabelDisplay="on"
          value={length}
          onChange={handleLengthChange}
          min={8}
          max={20}
        />
      </Stack>

      <p>Password Length: {length}</p>

      <h1>Generated Password:</h1>
      <p>password123</p>
    </Box>
  );
}
