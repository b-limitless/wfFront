import React from "react";
import { Box, Button } from "trolly/common";

const InputComp: React.FC<{ color: any }> = ({ color }) => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Button color={color} variant="outlined" round>
        Rounded Outlined Button
      </Button>
      <Button
        color={color}
        variant="outlined"
        round
        isLoading={true}
        width="500px"
        margin="10px"
        padding="10px"
      >
        Rounded Outlined Button loading with 10px maring and padding
      </Button>
      <Button color={color} variant="contained" borderRadius={50}>
        50px rounded contained Button
      </Button>
      <Button color={color} variant="contained" round isLoading type="submit">
        loading 50px rounded contained Button
      </Button>
      <Button color={color} variant="outlined" round width="450px">
        450px Outlined Button
      </Button>
      <Button color={color} variant="contained" round width="450px">
        450px Contained Button
      </Button>
      <Button color={color} variant="contained">
        Non Rounded Contained Button
      </Button>
      <Button color={color} variant="text">
        Text Button
      </Button>
      <Button color={color} variant="contained" disabled>
        Disabled Button
      </Button>
      <Button color={color} variant="outlined" customVariant="danger" round>
        Outlined custom danger button
      </Button>
      <Button
        color={color}
        variant="contained"
        customVariant="danger"
        round
        isLoading
      >
        Contained custom danger button loading
      </Button>
      <Button
        color={color}
        variant="contained"
        customVariant="white"
        round
        isLoading
      >
        Contained custom white button loading
      </Button>
      <Box bgcolor="#F5F6F8" padding="10px" width="fit-content">
        <Button color={color} variant="contained" round customVariant="white">
          Contained custom white button
        </Button>
      </Box>
      <Box bgcolor="#F5F6F8" padding="10px" width="fit-content">
        <Button color={color} variant="outlined" round customVariant="white">
          Outlined custom white button
        </Button>
      </Box>
    </Box>
  );
};

export default InputComp;
