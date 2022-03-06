import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ListItem,
  ListItemText,
  ListItemButton,
  Link,
} from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

export default function TopBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "darkcyan" }}>
          <nav className="navBar">
            <Button onClick={handleToggle}>
              {navbarOpen ? (
                <MdClose
                  style={{ color: "#fff", width: "40px", height: "40px" }}
                />
              ) : (
                <FiMenu
                  style={{ color: "#fff", width: "40px", height: "40px" }}
                />
              )}
            </Button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
              <ListItem className="filler"></ListItem>
              <ListItemButton component="a" href="/">
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton component="a" href="/vault">
                <ListItemText primary="Vault" />
              </ListItemButton>
              <ListItemButton component="a" href="/generator">
                <ListItemText primary="Password Generator" />
              </ListItemButton>
            </ul>
          </nav>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            <Link href="/" style={{ color: "white" }}>
              Password Manager
            </Link>
          </Typography>
          <Button color="inherit" href="/signin">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
