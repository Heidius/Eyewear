import React, { useRef, useEffect, useState } from "react";
import { JEELIZVTOWIDGET } from "jeelizvtowidget";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
// import Spacer from "./Spacer";
import searchImage from "../images/target.png";

function init_VTOWidget(placeHolder, canvas, toggleLoading) {
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: toggleLoading.bind(null, true),
      LOADING_END: toggleLoading.bind(null, false),
    },
    sku: "empty", // SKU loadded at the beginning
    // image displayed when face is not found:
    searchImageMask: "http://cdn130.picsart.com/233354883091212.png", //'https://appstatic.jeeliz.com/jeewidget/images/target.png',
    searchImageColor: 0xeeeeee, // color of loading (face not found) animation
    searchImageRotationSpeed: -0.001, // negative -> clockwise
    callbackReady: function () {
      console.log("INFO: JEELIZVTOWIDGET is ready :)");
    },
    onError: function (errorLabel) {
      // this function catches errors, so you can display custom integrated messages
      alert("An error happened. errorLabel =" + errorLabel);
      switch (errorLabel) {
        case "WEBCAM_UNAVAILABLE":
          // the user has no camera, or does not want to share it.
          break;

        case "INVALID_SKU":
          // the provided SKU does not match with a glasses model
          break;

        case "PLACEHOLDER_NULL_WIDTH":
        case "PLACEHOLDER_NULL_HEIGHT":
          // Something is wrong with the placeholder
          // (element whose id='JeelizVTOWidget')
          break;

        case "FATAL":
        default:
          // a bit error happens:(
          break;
      } // end switch
    }, // end onError()
  }); // end JEELIZVTOWIDGET.start call
}

function AppCanvas({ open }) {
  const [selected, setSelected] = useState(0);
  const refPlaceHolder = useRef();
  const refCanvas = useRef();
  const refAdjustEnter = useRef();
  const refAdjust = useRef();
  const refChangeModel = useRef();
  const refLoading = useRef();

  const toggleLoading = (isLoadingVisible) => {
    refLoading.current.style.display = "block"; //isLoadingVisible ? "block" : "none";
  };

  const enter_adjustMode = () => {
    JEELIZVTOWIDGET.enter_adjustMode();
    refAdjustEnter.current.style.display = "none";
    refAdjust.current.style.display = "block";
    refChangeModel.current.style.display = "none";
  };

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode();
    refAdjustEnter.current.style.display = "block";
    refAdjust.current.style.display = "none";
    refChangeModel.current.style.display = "block";
  };

  const glassesCollection = [
    "carrera_113S_blue",
    "rayban_aviator_or_vertFlash",
    "rayban_round_cuivre_pinkBrownDegrade",
    "rayban_cockpit_or_vert_classique",
  ];

  const set_glassesModel = (index, sku) => {
    if (index >= 0 && index <= glassesCollection.length - 1) setSelected(index);
    // JEELIZVTOWIDGET.load(sku);
  };

  useEffect(() => {
    const placeHolder = refPlaceHolder.current;
    const canvas = refCanvas.current;
    init_VTOWidget(placeHolder, canvas, toggleLoading);

    return () => {
      JEELIZVTOWIDGET.destroy();
    };
  }, []);

  return (
    <>
      {/* <Spacer size={32} /> */}
      <div
        ref={refPlaceHolder}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 262px)",
          width: "calc(100vh - 262px)",
          borderRadius: "100%",
          overflow: "hidden",
          boxShadow: "0px 0px 77px -20px #ffffff",
        }}
      >
        <div ref={refLoading} className="JeelizVTOWidgetLoading">
          <div className="JeelizVTOWidgetLoadingText">LOADING...</div>
        </div>
        {/* <canvas
        ref={refCanvas}
        // className="JeelizVTOWidgetCanvas"
        style={{
          borderRadius: 32
        }}
      ></canvas> */}

        {/* <div ref={refAdjustEnter} className="JeelizVTOWidgetControls">
       
      </div> */}

        {/* <div ref={refAdjust} className="JeelizVTOWidgetAdjustNotice">
        Move the glasses to adjust them.
      */}
      </div>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 32,
        }}
      >
        <Typography
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          {selected + 1}/{glassesCollection.length}
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 32,
          }}
        >
          <Button
            variant="contained"
            disabled={selected === 0}
            style={{ minWidth: 130 }}
            onClick={() => set_glassesModel(selected - 1)}
          >
            {"<<"} Previous
          </Button>
          <div style={{ padding: 16 }} />
          <Button
            variant="contained"
            disabled={selected === glassesCollection.length - 1}
            style={{ minWidth: 130 }}
            onClick={() => set_glassesModel(selected + 1)}
          >
            Next {">>"}
          </Button>
        </Box>
        <div style={{ padding: 16 }} />
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{ minWidth: 120 }}
            className="JeelizVTOWidgetButton JeelizVTOWidgetAdjustEnterButton"
            onClick={enter_adjustMode}
            ref={refAdjustEnter}
          >
            Adjust
          </Button>
          <div style={{ padding: 16 }} />
          <Button
            variant="contained"
            style={{ minWidth: 120 }}
            className="JeelizVTOWidgetButton JeelizVTOWidgetAdjustExitButton"
            onClick={exit_adjustMode}
            ref={refAdjust}
          >
            Quit
          </Button>
        </Box>
        <div style={{ padding: 16 }} />
      </Box>
    </>
  );
}

export default AppCanvas;
