//import * as React from "react";
import React, { useState } from 'react';
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
  Stack
} from "@mui/material";

export default function PassGenerator() {
  const [passType,setPassType]=useState('word');
  const handleChange=(e)=>{
       setPassType( e.target.value);
  }
  const [length, setValue] = React.useState(12);
  const handleLengthChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <form>
          <input type="radio" value="word" id="password" defaultChecked
            onChange={handleChange} name="passType" />
          <label for="password">Password</label>

        <input type="radio" value="phrase" id="passphrase"
          onChange={handleChange} name="passType"/>
        <label for="passphrase">Passphrase</label>
      </form>

    <p>Generating Pass{passType}</p>

    <Stack alignItems="center">
      <Slider aria-label="Password Length" sx={{ width: 1/2 }} valueLabelDisplay="on" value={length} onChange={handleLengthChange} min={8}/>    
    </Stack>

    <p>Password Length: {length}</p>

    <h1>Generated Password:</h1>
    <p>password123</p>
  </div>
  );
}
