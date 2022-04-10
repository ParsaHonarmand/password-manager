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

  const addPassword = async (event) => {
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

    let reqBody;

    if (props.endpoint === "addPassword") {
      reqBody = {
        website: data.get("website"),
        username: data.get("username"),
        password: data.get("password"),
      };

      try {
        const res = await axios.post(
          apiEndpoint + "/" + props.endpoint,
          reqBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setSubmitted(false);
        props.addCallback(reqBody.website);
      } catch (error) {
        console.log("Error adding password: " + error);
      }
    } else {
      reqBody = {
        label: data.get("website"),
        newUsername: data.get("username"),
        newPassword: data.get("password"),
      };

      try {
        const res = await axios.put(
          apiEndpoint + "/" + props.endpoint,
          reqBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setSubmitted(false);
        props.modalCallback();
      } catch (error) {
        console.log("Error adding password: " + error);
      }
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
