import * as React from "react";
import { useState } from "react";
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  Button,
} from "@mui/material";

export default function PasswordGetter() {
  const [validInput, setValidInput] = useState("");
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        Search for a login:
      </Typography>
      <Autocomplete
        // disablePortal
        id="logins"
        options={savedLogins}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Login"
            variant="standard"
            onChange={(event) => {
              setValidInput(event.target.value);
              console.log(event.target.value);
            }}
          />
        )}
      />
      <Button
        variant={validInput ? "contained" : "outlined"}
        sx={{ mt: 2, mb: 2 }}
      >
        Show Password
      </Button>
    </Box>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const savedLogins = [
  { label: "Google", password: "password123" },
  { label: "Facebook", password: "password123" },
  { label: "Instagram", password: "password123" },
  { label: "Firefox", password: "password123" },
  { label: "Snapchat", password: "password123" },
  { label: "Reddit", password: "password123" },
  { label: "D2L", password: "password123" },
  { label: "ucalgary.ca", password: "password123" },
  { label: "miniclip.com", password: "password123" },
  { label: "Cool Math Games", password: "password123" },
];
