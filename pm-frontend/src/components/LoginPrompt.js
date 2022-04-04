import * as React from "react";
import { Container, Typography, Box, Modal, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginPrompt(props) {
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You are not logged in
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please <a href="/signin">log in</a> to use the website
            <Button
              onClick={() => {
                const user = JSON.stringify({ name: "Tim" });
                localStorage.setItem("user", user);
              }}
            >
              Set localStorage (DEV)
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
