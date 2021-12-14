import React from "react";
import { Box, Link } from "trolly/common";

const LinkComp: React.FC<{ color?: any }> = ({ color }) => {
  return (
    <Box gridGap="30px">
      <Link color={color} href="https://google.com">
        Link with theme color and HTML tag based on href
      </Link>
      <Link color={color} onClick={() => window.alert("Link clicked")}>
        Link with theme color and HTML tag based on onClick
      </Link>
      <Box padding="20px" bgcolor="#0D1C55">
        <Link color="footer" to="/trade/dashboard">
          footer Link with react router link to dashboard
        </Link>
      </Box>
      <Link color="danger" to="/trade/dashboard">
        danger Link with react router link to dashboard
      </Link>
      <Link
        color={color}
        to="/trade/dashboard"
        variant="header"
        fontColor="#000"
      >
        header variant Link with react router link to dashboard and special
        fontColor
      </Link>
      <Link
        color={color}
        onClick={() => console.log("clicked")}
        variant="header"
        fontColor="#000"
        active
      >
        header variant Link without react router link to dashboard and special
        fontColor in active mode
      </Link>
    </Box>
  );
};

export default LinkComp;
