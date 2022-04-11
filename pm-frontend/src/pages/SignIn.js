import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(true);

  const navigate = useNavigate();
  const apiEndpoint = "http://localhost:" + (process.env.PORT || 3001);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let reqBody = {
      email: data.get("email"),
      password: data.get("password"),
    };
    // example of how to hit the api endpoint.
    // should use post here and send the email/password instead
    try {
      const res = await axios.post(apiEndpoint + "/login", reqBody);
      console.log("Setting localStorage");
      console.log(res.data);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "Tim", id: 123 })
      );
      localStorage.setItem("email", reqBody.email);
      localStorage.setItem("authToken", res.data.token);
      navigate("/");
    } catch (error) {
      setValidUser(false);
      console.log("Failed to login");
      console.log(error);
    }
  };

  useEffect(() => {
    const foundToken = localStorage.getItem("authToken");
    if (foundToken != null) {
      navigate("/");
    }
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
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
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            style={{ color: "#404040" }}
          >
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {!validUser ? (
              <Typography color="error">
                We couldn't find that username and password combination in our
                records.
              </Typography>)
            : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
