import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  ListItemButton,
  Link,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import state, { useState } from "react";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"

export default function TopBar() {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }
  const closeMenu = () => {
    setNavbarOpen(false)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <nav className="navBar">
            <Button onClick={handleToggle}>
              {navbarOpen ? (
                <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
              ) : (
                <FiMenu style={{ color: "#fff", width: "40px", height: "40px" }} />
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Password Manager</Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
