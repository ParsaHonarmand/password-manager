import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
// import Cookies from 'js-cookie'

export default function PasswordGetter() {
  const apiEndpoint = "http://localhost:3001";
  const [validInput, setValidInput] = useState({});
  const [passwordShowing, setPasswordShowing] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [passphraseEntered, setPassphraseEntered] = useState(false);
  useEffect(() => {
    async function fetchPasswords() {
      try {
        const res = await axios.get(apiEndpoint + "/passwords", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setPasswords(res.data);
      } catch (error) {
        console.log("Failed to get all passwords");
        console.log(error);
      }
    }
    fetchPasswords();
  }, []);

  const showPassword = () => {
    setPasswordShowing(!passwordShowing);
  };

  const onTagsChange = (event, value) => {
    if (value === null) {
      setValidInput({});
      setPasswordShowing(false);
    } else {
      setValidInput(value);
    }
  };
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
        // disablePortal
        id="logins"
        options={passwords}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        sx={{ width: 300 }}
        onChange={onTagsChange}
        renderInput={(params) => (
          <TextField {...params} label="Login" variant="standard" />
        )}
      />
      <Button
        variant={
          Object.keys(validInput).length !== 0 ? "contained" : "outlined"
        }
        sx={{ mt: 2, mb: 2 }}
        onClick={showPassword}
        disabled={Object.keys(validInput).length == 0}
      >
        Show Password
      </Button>
      {passwordShowing && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
            bgcolor: "darkcyan",
            borderRadius: 1,
            width: "50%",
            margin: "auto",
            overflowY: "scroll",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            style={{
              color: "#fff",
              padding: "10px",
              margin: "auto",
            }}
          >
            {validInput.password}
            <Button color="inherit">
              <ContentCopyIcon
                onClick={() => {
                  navigator.clipboard.writeText(validInput.password);
                }}
              />
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const savedLogins = [
  { label: "Google", password: "password123" },
  { label: "Facebook", password: "password123" },
  { label: "Instagram", password: "password123" },
  { label: "Firefox", password: "password123" },
  { label: "Snapchat", password: "password123" },
  { label: "Reddit", password: "password123" },
  { label: "D2L", password: "password123" },
  { label: "ucalgary.ca", password: "password123" },
  { label: "miniclip.com", password: "password123" },
  { label: "Cool Math Games", password: "password123" },
];
