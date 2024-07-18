import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export function RemoveProductModal({ _id, setRefresh }) {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/product/delete",
        { prodID: id }
      );
      console.log(response.data.bollean)
      if (response.data.bollean) {
        setRefresh(Math.floor(Math.random() * 1000));
        console.log(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>X</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Remove product</h2>
          <p id="parent-modal-description">Are you sure about that?</p>{" "}
          <Button
            onClick={() => {
              deleteProduct(_id);
              handleClose();
            }}
          >
            REMOVE
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
