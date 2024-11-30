import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

const Modal1 = ({ children, open, closeModal, title }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => closeModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" flex flex-row justify-between items-start">
            <Typography variant="h5" fontWeight={"bold"} mb={2} component="h2">
              {title || "Title"}
            </Typography>

            <Button onClick={() => closeModal(false)}>
              <CloseIcon
                style={{ color: "red" }}
                className=" hover:cursor-pointer hover:bg-red-100"
              />
            </Button>
          </div>

          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default Modal1;
