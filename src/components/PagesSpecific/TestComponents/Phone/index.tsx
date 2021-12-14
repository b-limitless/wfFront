import React from "react";
import { Box, Text } from "trolly/common";
import { PhoneInput } from "trolly/custom";

const options = [
  {
    label: "+968",
    value: "+968",
    iso2: "OM",
    codeNumber: "+968",
  },
  {
    label: "+92",
    value: "+92",
    iso2: "PK",
    codeNumber: "+92",
  },
  {
    label: "+963",
    value: "+963",
    iso2: "SY",
    codeNumber: "+963",
  },
  {
    label: "+971",
    value: "+971",
    iso2: "AE",
    codeNumber: "+971",
  },
];
const PhoneComp: React.FC<{ color: any; variant: any }> = ({
  color,
  variant,
}) => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Text>Phone number without country flag in list and text</Text>
      <PhoneInput
        options={options}
        phoneLabel="Enter phone number"
        codeLabel="Code"
        color={color}
        variant={variant}
      />
      <Text>Phone number with country flag in list and text</Text>
      <PhoneInput
        options={options}
        phoneLabel="Enter phone number"
        codeLabel="Code"
        color={color}
        variant={variant}
        withCountryFlagLabel={true}
        withCountryFlagList={true}
        gridTemplateColumns="2fr 10fr"
      />
      <Text>Phone number with country flag in list but not in text</Text>
      <PhoneInput
        options={options}
        phoneLabel="Enter phone number"
        codeLabel="Code"
        color={color}
        variant={variant}
        withCountryFlagLabel={false}
        withCountryFlagList={true}
      />
      <Text>
        Phone number with country flag in text but not in list with error
      </Text>
      <PhoneInput
        options={options}
        phoneLabel="Enter phone number"
        codeLabel="Code"
        color={color}
        variant={variant}
        withCountryFlagLabel={true}
        withCountryFlagList={false}
        error={true}
        errorMessage="Error Message"
      />
    </Box>
  );
};

export default PhoneComp;
