import {
  Box, Button, CircularProgress, TextField,
  Typography
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
const axios = require("axios");

export default function PasswordAdder() {
  const [submitted, setSubmitted] = useState(false);
  const [authToken, setAuthToken] = useState();
  const apiEndpoint = "http://localhost:" + (process.env.PORT || 3001);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  const addPassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(!submitted);
    const reqBody = {
      website: data.get("website"),
      username: data.get("username"),
      password: data.get("password"),
    }
    try {
      const res = await axios.post(
        apiEndpoint + "/addPassword",
        reqBody,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      if (res.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.log("Error adding password")
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="form" onSubmit={addPassword} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="website"
          label="Website"
          name="website"
          autoComplete="website"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          name="username"
          label="Username"
          id="username"
          autoComplete="username"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
          Save login
        </Button>
      </Box>
      {submitted && (
        <>
          <Typography>Encrypting...</Typography>
          <CircularProgress />
        </>
      )}
    </Box>
  );
}
