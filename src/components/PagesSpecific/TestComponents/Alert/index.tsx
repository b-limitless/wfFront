import React from "react";
import { Box, Alert } from "trolly/common";

const AlertComp: React.FC = () => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Alert fontSize="15px" variant="standard" color="error" severity="error">
        Error standard Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" variant="standard" color="info" severity="info">
        Info standard Alert with 15px font Size
      </Alert>
      <Alert
        fontSize="15px"
        variant="standard"
        color="success"
        severity="success"
      >
        Success standard Alert with 15px font Size
      </Alert>
      <Alert
        fontSize="15px"
        variant="standard"
        color="warning"
        severity="warning"
      >
        Warning standard Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" variant="filled" color="error" severity="error">
        Error filled Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" variant="filled" color="info" severity="info">
        Info filled Alert with 15px font Size
      </Alert>
      <Alert
        fontSize="15px"
        variant="filled"
        color="success"
        severity="success"
      >
        Success filled Alert with 15px font Size
      </Alert>
      <Alert
        fontSize="15px"
        variant="filled"
        color="warning"
        severity="warning"
      >
        Warning filled Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" variant="outlined" color="error" severity="error">
        Error outlined Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" variant="outlined" color="info" severity="info">
        Info outlined Alert with 15px font Size
      </Alert>
      <Alert
        fontSize="15px"
        variant="outlined"
        color="success"
        severity="success"
      >
        Success outlined Alert with 15px font Size
      </Alert>
      <Alert
        fontSize="15px"
        variant="outlined"
        color="warning"
        severity="warning"
      >
        Warning outlined Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" color="warning" severity="warning" type="text">
        Warning text outlined Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" color="error" severity="error" type="text">
        Error text outlined Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" color="success" severity="success" type="text">
        Success text outlined Alert with 15px font Size
      </Alert>
      <Alert fontSize="15px" color="info" severity="info" type="text">
        Info text outlined Alert with 15px font Size
      </Alert>
      <Alert fontSize="25px" color="info" severity="info" type="text">
        Info text outlined Alert with 25px font Size
      </Alert>
    </Box>
  );
};

export default AlertComp;
