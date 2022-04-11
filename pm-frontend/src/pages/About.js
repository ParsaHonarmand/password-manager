import { List, ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as React from "react";

export default function About() {
  return (
    <>
      <Typography marginTop={5} variant="h2" textAlign="center" gutterBottom>
          About Password-Manager
        </Typography>
      <Container component="main" maxWidth="sm">        
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            Created By
          </Typography>
          <Typography>
            <List>
              <ListItem>Parsa Honarmand</ListItem>
              <ListItem>Ben Schmidt</ListItem>
              <ListItem>Louis Kunstmann</ListItem>
              <ListItem>Tim Macphail</ListItem>
              <Divider sx={{mt: 2, mb: 2}}></Divider>       
            </List>
          </Typography>

          <Container maxWidth="xs" sx={{ mb: 4}}>
            <Typography variant="overline">
              <b>Disclaimer:</b> We are not web developers or web security experts, and
              we do not recommend the use of 'Password-Manager' to store your
              passwords. This is simply a demonstration of the concepts we
              learned during the course.
            </Typography>
          </Container>

          <Typography>
            Password-Manager is the Unessay (final project) we created for CPSC 329 at the University of Calgary.            
          </Typography>          

          <Typography variant="h4" sx = {{mt: 4, mb: 4}}>
            Implementation Details
          </Typography>

          <Typography>
            We are using an open-source gold standard encryption library rather than our own. 
            We are not hiding what encryption we have in order to improve security by allowing many eyes to discover and fix exploits in the libraries.
          </Typography>

          <Typography sx={{mt:1}}>
            We abided by the principle of least permissions - whenever we were
            implementing a feature, we limited the permissions required as much
            as possible. For example, when a user wishes to retrieve a password
            from a site, the backend only sends that one password, instead of
            sending all of them.
          </Typography>

          <Typography variant = "h6" sx = {{mt: 2}}>
            Technologies Used
          </Typography>

          <List>
            <ListItem>
              <Typography>
                <b>Encryption</b>: AES with 256-bit key, entailing 14 transformation rounds from plaintext to ciphertext
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>We are using JWT to securely send information to and from the client and backend</Typography>
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
}
