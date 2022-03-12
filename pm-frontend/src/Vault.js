import * as React from "react";
import { useState } from "react";
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  InputAdornment,
} from "@mui/material";
import {
  Folder as FolderIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

function LoginListItem(name, website) {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton
            onClick={() => console.log("Click delete")}
            edge="end"
            aria-label="delete"
            sx={{ mb: 2 }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => console.log("Click show")}
            edge="end"
            sx={{ mb: 2 }}
            aria-label="delete"
          >
            <VisibilityIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={name} secondary={website} />
    </ListItem>
  );
}

export default function PasswordGetter() {
  const [validInput, setValidInput] = useState(false);
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
        renderInput={(params) => (
          <TextField
            {...params}
            label="Login"
            variant="standard"
            onChange={(event) => {
              setValidInput(event.target.value);
              console.log(event.target.value);
            }}
          />
        )}
      />
      {validInput && 
        <Button
          variant={validInput ? "contained" : "outlined"}
          sx={{ mt: 2, mb: 2 }}
        >
          Show Password
        </Button>}
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
