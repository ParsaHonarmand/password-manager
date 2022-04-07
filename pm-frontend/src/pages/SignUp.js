import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import { Help as HelpIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const apiEndpoint = "http://localhost:" + (process.env.PORT || 3001);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios
        .post(apiEndpoint + "/signup", {
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          password: data.get("password"),
          passphrase: data.get("passphrase"),
        })
        .then((res) => {
          if (res.status === 200) navigate("/");
        });
      localStorage.setItem("user", response.data.token);
    } catch (error) {
      console.log(error);
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
            <Grid container justifyContent="flex-end">
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
