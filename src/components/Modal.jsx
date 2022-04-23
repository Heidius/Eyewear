import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AppCanvas from "./AppCanvas";

// const plugin = require("./index.html");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
};

export default function CustomModal({ open, handleOpen }) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const refCanvas = React.useRef(null);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          {/* <canvas
            ref={refCanvas}
            className="JeelizVTOWidgetCanvas"
            style={{
              flex: 1,
              borderWidth: 12,
              borderColor: "red",
              backgroundColor: "green",
              borderRadius: "100%",
              // maxWidth: 400,
              // maxHeight: 400,
              width: "100%",
              height: "100%",
            }}
          /> */}
          {/* <iframe src={plugin} style={{
              width: '100%',
              height:'100%'
          }}></iframe> */}
          {/* <div style={{
              width: '100%',
              height:'100%'
          }} dangerouslySetInnerHTML={{ __html: plugin }} ></div> */}
          {/* <AppCanvas ref={refCanvas} /> */}
        </Box>
      </Modal>
    </div>
  );
}
