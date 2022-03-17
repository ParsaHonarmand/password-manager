import * as React from "react";
import { useState } from "react";
import PasswordAdder from "./components/PasswordAdder";
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  Button,
  //List,
  //ListItemButton,
  //ListItemText,
  //IconButton,
  //ListItem,
  //ListItemAvatar,
  //Avatar,
  //InputAdornment,
} from "@mui/material";
import {
  //Folder as FolderIcon,
  //Delete as DeleteIcon,
  //Visibility as VisibilityIcon,
  //VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
const axios = require("axios");

export default function PasswordGetter() {
  const [validInput, setValidInput] = useState(false);
  const [selectedSite, setSelectedSite] = useState("");
  const revealPassword = (site) => {
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
        id="logins"
        options={savedLogins}
        sx={{ width: 300 }}
        onInputChange={(event, newInputValue) => {
          setValidInput(newInputValue);
          setSelectedSite(newInputValue);
          console.log(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Login"
            variant="standard"
            onChange={(event, newValue) => {
              setValidInput(newValue);
              console.log(newValue);
            }}
          />
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
          onClick={revealPassword(selectedSite)}
          disabled={!validInput}
          variant={validInput ? "contained" : "outlined"}
          sx={{ mt: 2, mb: 2, mr: 2 }}
        >
          Reveal
        </Button>

        <Button
          onClick={deleteEntry(selectedSite)}
          disabled={!validInput}
          variant={validInput ? "contained" : "outlined"}
          sx={{ mt: 2, mb: 2 }}
        >
          Delete This Entry
        </Button>
      </Box>
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
