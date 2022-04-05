import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { List, ListItem } from "@mui/material";

export default function About() {
  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" gutterBottom>
            About Password-Manager
          </Typography>
          <Typography>
            Password-Manager is the final project (unessay) for our group in
            CPSC 329. It was created by Parsa Honarmand, Ben Schmidt, Louis
            Kunstmann, and Tim Macphail.
          </Typography>
          <Container maxWidth="xs" sx={{ mb: 4, mt: 4 }}>
            <Typography variant="overline">
              Disclaimer: We are not web developers or web security experts, and
              we do not recommend the use of 'Password-Manager' to store your
              passwords. This is simply a demonstration of the concepts we
              learned during the course.
            </Typography>
          </Container>

          <Typography gutterBottom variant="h5">
            Implementeation Details
          </Typography>

          <Typography>
            For encryption, We are using AES with block mode. We are also using
            JWT to authenticate actions stored in cookies - open source gold
            standard encryption library, rather than our own - we are not hiding
            what encryption we have
          </Typography>
          <ul>
            <li>
              <Typography>AES with block ? mode</Typography>
            </li>
            <li>
              <Typography>JWT to authenticate actions</Typography>
            </li>
            <li>
              <Typography>
                Mention something about CAs, since we learned about that in
                class
              </Typography>
            </li>
            <li>
              <Typography>
                More stuff that we learned about in the web security /
                crypography secions of this class
              </Typography>
            </li>
          </ul>
        </Box>
      </Container>
    </>
  );
}
