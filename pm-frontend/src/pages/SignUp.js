import { Help as HelpIcon } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [emailTaken, setEmailTaken] = useState(false);
  const apiEndpoint = "http://localhost:" + (process.env.PORT || 3001);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const pass = data.get("password");
    console.log(pass);
    const pass2 = data.get("password-verify");
    console.log(pass2);
    if (pass !== pass2) {
      alert("Passwords do not match");
      return;
    }
    if (pass2.length < 8) {
      alert("Password must be at least 8 characters");
    }

    const reqBody = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      passphrase: data.get("passphrase"),
    };
    try {
      const res = await axios.post(apiEndpoint + "/signup", reqBody);
      localStorage.setItem(
        "user",
        "not null"
      );
      localStorage.setItem("email", reqBody.email);
      localStorage.setItem("authToken", res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      setEmailTaken(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {emailTaken ? (
                <Typography color="error" sx={{ ml: 3, mt: 2 }}>
                  Email address taken.
                </Typography>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password-verify"
                  label="Re-enter Password"
                  type="password"
                  id="password-verify"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passphrase"
                  label="Passphrase"
                  type="passphrase"
                  id="passphrase"
                  autoComplete="new-passphrase"
                />
                <Tooltip
                  title="you will enter your password once when you log on to our service. You will be required to use your passphrase every time you want to reveal one of your saved logins, as an extra layer of security"
                  followCursor
                >
                  <Typography>
                    <HelpIcon />
                    What's the difference?
                  </Typography>
                </Tooltip>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // href="/"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container spacing={2}>
              <Grid item>
                <Link
                  href="https://pages.nist.gov/800-63-3/sp800-63b.html"
                  variant="body2"
                  target="_blank"
                >
                  NIST password guidelines
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
