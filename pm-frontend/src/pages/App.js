import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
//import Box from '@mui/material/Box'
import { blueGrey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import PasswordIcon from "@mui/icons-material/Password";
import IconButton from "@mui/material/IconButton";
import { textAlign } from "@mui/system";

function App() {
  return (
    <Stack
      direction="row"
      spacing={5}
      alignItems="center"
      justifyContent="center"
      marginTop={5}
      marginBottom={5}
    >
      <Button
        variant="contained"
        href="/vault"
        sx={{ height: 100, width: 250 }}
        style={{ background: "darkcyan" }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <LockIcon sx={{ fontSize: 70, color: blueGrey[900] }}></LockIcon>
          <Typography
            variant="h5"
            sx={{ color: "#fffff", textAlign: "center" }}
          >
            Password Vault
          </Typography>
        </Stack>
      </Button>

      <Button
        variant="contained"
        href="/generator"
        sx={{ height: 100, width: 250 }}
        style={{ background: "darkcyan" }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <PasswordIcon
            sx={{ fontSize: 70, color: blueGrey[900] }}
          ></PasswordIcon>
          <Typography
            variant="h5"
            sx={{ color: "#fffff", textAlign: "center" }}
          >
            Password Generator
          </Typography>
        </Stack>
      </Button>
    </Stack>
  );
}

export default App;
