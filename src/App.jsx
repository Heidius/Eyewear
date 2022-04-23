import { Typography } from "@mui/material";
import React, { useState } from "react";
import AppCanvas from "./components/AppCanvas";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      style={{
        display: "flex",
        // width: "calc(100vw - 4px)",
        // minHeight: "calc(100vh - 4px)",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        paddingTop: 48,
        // border: 'solid 2px red'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: '100%'
        }}
      >
         <Typography
            style={{ flexGrow: 1, textAlign: "center", fontWeight: "bold", color: 'white' }}
          >
            Try on your favourite sunglasses
          </Typography>
          <div style={{ padding: 32 }} />
            <AppCanvas open={open} />
      </Box>
    </Box>
  );
}
