import * as React from "react";
import { useState, useEffect } from "react";
import PasswordAdder from "../components/PasswordAdder";
import LoginPrompt from "../components/LoginPrompt";
import {
  TextField,
  Autocomplete,
  Box,
  Grid,
  Typography,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
const axios = require("axios");

export default function PasswordGetter() {
  const [validInput, setValidInput] = useState(false);
  const [showEditPop, setShowEditPop] = useState(false);
  const [showDeletePop, setShowDeletePop] = useState(false);
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState();
  const [savedSites, setSavedSites] = useState();

  const [revealedPass, setRevealedPass] = useState();
  const [selectedSite, setSelectedSite] = useState();
  const [revealed, setRevealed] = useState(false);

  const popupStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("Found user", foundUser);
      setUser(foundUser);
      setLoggedIn(true);
    }
    setAuthToken(localStorage.getItem("authToken"));

    async function getAllSites() {
      try {
        const response = await axios.get(
          "http://localhost:3001/sites",
          {
            headers: {
              token: authToken,
            },
          }
        );
        setSavedSites(response.data.sites);
      } catch (error) {
        console.log(error);
      }
    }
    getAllSites();

    // !testing only
    // TODO: delete
    setSavedSites([
      "Google",
      "Facebook",
      "Instagram",
      "Firefox",
      "Snapchat",
      "Reddit",
      "D2L",
      "ucalgary",
      "Miniclip",
      "Cool Math Games",
    ])
  }, []);

  const revealPassword = async (site) => {
    console.log("Revealing " + site);
    try {
      const res = await axios.get(
        "http://localhost:3001/passwords/reveal",
        {
          requestedSite: site,
        },
        {
          headers: {
            token: authToken,
          },
        }
      );
      setRevealedPass(res.data.password);
      setRevealed(true);
    } catch (error) {
      console.log("Error");
    }
  };

  const deleteEntry = async (site) => {
    console.log("Deleting " + site);
    try {
      const response = await axios.delete(
        "http://localhost:3001/passwords/delete",
        {
          requestedSite: site,
        },
        {
          headers: {
            token: authToken,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /*   const editEntry = (site) => {
    console.log("Editing " + site);
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
  }; */

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{ color: "#404040", mt: 5 }}
      >
        Save a password:
      </Typography>

      <PasswordAdder sx={{ mb: 2 }} />

      <Modal open={showEditPop}>
        <Box sx={popupStyle}>
          <IconButton
            color="primary"
            style={{ marginLeft: "auto" }}
            onClick={() => setShowEditPop(false)}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{ color: "#404040", mt: 1 }}
          >
            Edit this entry:
          </Typography>

          <PasswordAdder />
        </Box>
      </Modal>

      <Modal open={showDeletePop}>
        <Box sx={popupStyle} alignItems="center">
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            style={{ color: "#404040" }}
          >
            Are you sure you want to delete this entry?
          </Typography>

          <Button
            color="primary"
            onClick={() => {
              deleteEntry(selectedSite);
              setShowDeletePop(false);
            }}
          >
            Yes
          </Button>

          <Button color="error" onClick={() => setShowDeletePop(false)}>
            No
          </Button>
        </Box>
      </Modal>

      <LoginPrompt open={!loggedIn} />

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
        options={savedSites}
        getOptionLabel={(option) => option}
        sx={{ width: 300 }}
        onChange={(event, value, reason) => {
          setValidInput(true);
          setRevealed(false);
          setSelectedSite(value);
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option}
            <Box sx={{ marginLeft: "auto" }}>
              <IconButton color="primary" onClick={() => setShowEditPop(true)}>
                <EditIcon />
              </IconButton>

              <IconButton color="error" onClick={() => setShowDeletePop(true)}>
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
          onClick={() => setShowDeletePop(true)}
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
              <Typography>{revealedPass}</Typography>
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
    </Box>
  );
}

// const savedSites = [
//   { label: "Google", password: "www.Google.com" },
//   { label: "Facebook", password: "www.Facebook.com" },
//   { label: "Instagram", password: "www.Instagram.com" },
//   { label: "Firefox", password: "www.Firefox.com" },
//   { label: "Snapchat", password: "www.Snapchat.com" },
//   { label: "Reddit", password: "www.Reddit.com" },
//   { label: "D2L", password: "www.D2L.com" },
//   { label: "ucalgary", password: "www.ucalgary.ca" },
//   { label: "Miniclip", password: "www.miniclip.com" },
//   { label: "Cool Math Games", password: "www.Cool Math Games.com" },
// ];
