import React from "react";
import { Box, Input } from "trolly/common";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";

const InputComp: React.FC<{ color: any; variant: any }> = ({
  color,
  variant,
}) => {
  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Input
        label="default"
        fullWidth={true}
        color={color}
        variant={variant}
        disableUnderline={true}
      />
      <Input
        label="medium"
        fullWidth={true}
        color={color}
        variant={variant}
        size="medium"
      />
      <Input
        label="small"
        fullWidth={true}
        color={color}
        variant={variant}
        size="small"
      />
      <Input
        label="Email Address"
        value="default with start unit"
        fullWidth={true}
        color={color}
        variant={variant}
        unit="USD"
        unitPosition="end"
        fontSize="16px"
        inputStartPadding="10px"
      />
      <Input
        label="default with start unit and rounded"
        fullWidth={true}
        color={color}
        variant={variant}
        unit="USD"
        unitPosition="end"
        round
      />
      <Input
        label="medium with start unit"
        fullWidth={true}
        color={color}
        variant={variant}
        size="medium"
        unit="USD"
        unitPosition="start"
      />
      <Input
        label="medium with end unit"
        fullWidth={true}
        color={color}
        variant={variant}
        size="medium"
        unit="USD"
        unitPosition="end"
      />
      <Input
        label="small with end unit"
        fullWidth={true}
        color={color}
        variant={variant}
        size="small"
        unit="USD"
        unitPosition="start"
      />
      <Input
        label="small with end unit"
        fullWidth={true}
        color={color}
        variant={variant}
        size="small"
        unit="USD"
        unitPosition="end"
      />
      <Input
        label="default with error"
        fullWidth={true}
        color={color}
        variant={variant}
        error={true}
        errorMessage="Error message"
      />
      <Input
        label="small with error"
        fullWidth={true}
        color={color}
        variant={variant}
        size="small"
        error={true}
        errorMessage="Error message"
      />
      <Input
        label="medium with underline"
        fullWidth={true}
        color={color}
        variant={variant}
        size="medium"
        disableUnderline={false}
      />
      <Input
        label="medium with searchIcon"
        fullWidth={true}
        color={color}
        variant={variant}
        size="medium"
        disableUnderline={false}
        startAdornment={
          <InputAdornment position="end">
            <SearchIcon color="inherit" />
          </InputAdornment>
        }
      />
    </Box>
  );
};

export default InputComp;
