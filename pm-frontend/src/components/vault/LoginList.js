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
  Link,
} from "@mui/material";

export default function LoginList() {
  return (
    <ul>        
        <ListItemText>Google</ListItemText>
        <ListItemText>Facebook</ListItemText>
        <ListItemText>Instagram</ListItemText>
    </ul>
  );
}
