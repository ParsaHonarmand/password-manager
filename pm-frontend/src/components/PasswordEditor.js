import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
const axios = require("axios");

export default function PasswordAdder(props) {
  const [submitted, setSubmitted] = useState(false);
  const [authToken, setAuthToken] = useState();
  const apiEndpoint = "http://localhost:" + (process.env.PORT || 3001);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  const editPassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inValid =
      !data.get("website") || !data.get("username") || !data.get("password");
    console.log(inValid);

    if (inValid) {
      alert("Please fill out all fields");
      return;
    }
    setSubmitted(true);

    const reqBody = {
      label: data.get("website"),
      newUsername: data.get("username"),
      newPassword: data.get("password"),
    };

    try {
      await axios.put(
        apiEndpoint + "/changePassword",
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSubmitted(false);
      props.modalCallback();
      alert("Success");
    } catch (error) {
      console.log("Error editing password: " + error);
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
      <Box component="form" onSubmit={editPassword} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="website"
          label="Website"
          name="website"
          autoComplete="website"
          value={props.website}
          disabled={true}
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          name="username"
          label="Username"
          id="username"
          autoComplete="username"
          value={props.username}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography>
            Can't think of a password? Try our{" "}
            <a href="/generator">password generator</a>
          </Typography>
          <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
            Edit login
          </Button>
        </Box>
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
