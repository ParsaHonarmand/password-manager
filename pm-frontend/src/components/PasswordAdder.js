import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Help as HelpIcon } from "@mui/icons-material";
import * as React from "react";
import { useEffect, useState } from "react";
const axios = require("axios");

export default function PasswordAdder(props) {
  const [submitted, setSubmitted] = useState(false);
  const [authToken, setAuthToken] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const apiEndpoint = "http://localhost:" + (process.env.PORT || 3001);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  const generatePassword = async (event) => {
    try {
      const res = await axios.post("http://localhost:3001/generatePassword", {
        length: 18,
        type: "word",
      });
      setEnteredPassword(res.data);
    } catch (error) {
      console.log("Failed to generate password");
      console.log(error);
    }
  };

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

    const reqBody = {
      website: data.get("website"),
      username: data.get("username"),
      password: data.get("password"),
    };

    try {
      await axios.post(apiEndpoint + "/addPassword", reqBody, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSubmitted(false);
      props.addCallback(reqBody.website);
      alert("Success");
    } catch (error) {
      console.log("Error adding password: " + error);
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
          value={enteredPassword}
          onChange={(event) => {
            setEnteredPassword(event.target.value);
          }}
          autoComplete="current-password"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Tooltip
            sx={{ mb: 1 }}
            title={
              <h3>
                What makes a password good?
                <p></p>
                Make your password at least 8 characters long! The longer your
                password is, the more possible combinations of characters are
                there. So the more characters you use, the safer it is.
                <p></p>
                Use as many different characters as possible! Do not only use
                alphanumeric characters, also include special characters,
                punctuation and spaces! The more complex your password is, the
                safer it is.
                <p></p>
                Do not reuse passwords! Once one login is hacked, the hacker has
                access to all other logins, too. Do you really want that?
                <p></p>
                Do not use simple words or names! Your password should never be
                your username, the name of the website or a simple word from a
                dictionary! These will always be the first things a hacker
                exploits.
              </h3>
            }
            followCursor
          >
            <Typography>
              <HelpIcon sx={{ mr: 1 }} />
              Password Advice
            </Typography>
          </Tooltip>
          <Box display="flex" flexDirection="row">
            <Typography>
              Can't think of a password? Try our{" "}
              <a href="/generator">password generator</a> <a href>or simply </a>
              <a
                style={{ cursor: "pointer", textDecoration: "underline" }}
                href
                onClick={generatePassword}
              >
                {" "}
                generate a strong password
              </a>
            </Typography>
          </Box>
          <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
            Save login
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
