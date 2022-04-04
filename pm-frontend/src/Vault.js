import * as React from "react";
import { useState, useEffect } from "react";
import PasswordAdder from "./components/PasswordAdder";
import LoginPrompt from "./components/LoginPrompt";
import {
  TextField,
  Autocomplete,
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const axios = require("axios");

export default function PasswordGetter() {
  const [validInput, setValidInput] = useState(false);
  const [selectedSite, setSelectedSite] = useState();
  const [revealed, setRevealed] = useState(false);
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("Found user", foundUser);
      setUser(foundUser);
      setLoggedIn(true);
    }
  }, []);

  const revealPassword = (site) => {
    console.log("Revealing " + site.label);
    setRevealed(true);
    axios.post(
      "http://localhost:3001/passwords/reveal",
      {
        requestedSite: site,
      },
      {
        headers: {
          token: "JWT_TOKEN_HERE",
        },
      }
    );
  };

  const deleteEntry = (site) => {
    console.log("Deleting " + site.label);
    axios.post(
      "http://localhost:3001/passwords/delete",
      {
        requestedSite: site,
      },
      {
        headers: {
          token: "JWT_TOKEN_HERE",
        },
      }
    );
  };

  const editEntry = (site) => {
    console.log("Editing " + site.label);
    axios.post(
      "http://localhost:3001/passwords/delete",
      {
        requestedSite: site,
      },
      {
        headers: {
          token: "JWT_TOKEN_HERE",
        },
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LoginPrompt open={!loggedIn} />;
      <PasswordAdder sx={{ mb: 2 }} />
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        style={{ color: "#404040" }}
      >
        Search for a login:
      </Typography>
      <Autocomplete
        autoComplete={true}
        autoHighlight={true}
        autoSelect={true}
        id="logins"
        options={savedLogins}
        getOptionLabel={(option) => option.label}
        sx={{ width: 300 }}
        onChange={(event, value, reason) => {
          setValidInput(true);
          setRevealed(false);
          setSelectedSite(value);
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.label}
            <Box sx={{ marginLeft: "auto" }}>
              <IconButton color="primary" onClick={() => editEntry(option)}>
                <EditIcon />
              </IconButton>

              <IconButton color="error" onClick={() => deleteEntry(option)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Login" variant="standard" />
        )}
      />
      <Box
        sx={{
          display: "flex",
          //flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => revealPassword(selectedSite)}
          disabled={!validInput}
          variant={validInput ? "contained" : "outlined"}
          sx={{ mt: 2, mb: 2, mr: 2 }}
        >
          Reveal
        </Button>

        <Button
          onClick={() => deleteEntry(selectedSite)}
          disabled={!validInput}
          variant={validInput ? "contained" : "outlined"}
          sx={{ mt: 2, mb: 2 }}
        >
          Delete This Entry
        </Button>
      </Box>
      {revealed ? (
        <Box alignItems={"center"} sx={{ ml: "auto", mr: "auto", mt: 4 }}>
          <Grid container spacing={1} columns={4}>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
              <Typography>Website:</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{selectedSite.label}</Typography>
            </Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
              <Typography>Username:</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>N/A</Typography>
            </Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={1}>
              <Typography>Password:</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography>{selectedSite.password}</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() =>
                  navigator.clipboard.writeText(selectedSite.password)
                }
              >
                <ContentCopyIcon sx={{ fontSize: 15 }}></ContentCopyIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      {/* <List style={{ maxHeight: "400px", overflow: "auto" }}>
        You can scroll to a specific cell by calling apiRef.current.scrollToIndexes()
        {savedLogins.map((login) => LoginListItem(login.label, login.passwor))}
      </List> */}
    </Box>
  );
}

const savedLogins = [
  { label: "Google", password: "www.Google.com" },
  { label: "Facebook", password: "www.Facebook.com" },
  { label: "Instagram", password: "www.Instagram.com" },
  { label: "Firefox", password: "www.Firefox.com" },
  { label: "Snapchat", password: "www.Snapchat.com" },
  { label: "Reddit", password: "www.Reddit.com" },
  { label: "D2L", password: "www.D2L.com" },
  { label: "ucalgary", password: "www.ucalgary.ca" },
  { label: "Miniclip", password: "www.miniclip.com" },
  { label: "Cool Math Games", password: "www.Cool Math Games.com" },
];
