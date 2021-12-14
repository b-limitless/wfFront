import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useAppInfo } from "trolly/hooks";
import { Box, Button, Input } from "trolly/common";

interface IOperatorInput {
  id?: string;
  value: number;
  onChange: (event: any) => void;
  onIncrement: (event: any) => void;
  onDecrement: (event: any) => void;
}

const useStyles = makeStyles({
  icon: {
    width: 20,
    height: 20,
  },
  input: {
    height: 38,
    padding: 8,
    "& input": {
      padding: "0 3px 0 0",
      textAlign: "right",
      "&::-webkit-outer-spin-button": {
        appearance: "none",
        margin: 0,
      },
      "&::-webkit-inner-spin-button": {
        appearance: "none",
        margin: 0,
      },
      "&[type=number]": {
        appearance: "textfield",
      },
    },
  },
});

const OperatorInput: React.FC<IOperatorInput> = ({
  id,
  value,
  onChange,
  onIncrement,
  onDecrement,
}) => {
  const classes = useStyles();
  const { theme } = useAppInfo();

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Button onClick={onDecrement} tabIndex={-1} round padding="4px">
        <RemoveIcon className={classes.icon} />
      </Button>

      <Box display="block" width={60} margin="0 5px">
        <Input
          value={value}
          onChange={onChange}
          className={classes.input}
          color={theme}
          variant="outlined"
          type="tel"
          id={id}
          inputProps={{ min: 0 }}
          unit="%"
          unitPosition="end"
        />
      </Box>

      <Button onClick={onIncrement} tabIndex={-1} round padding="4px">
        <AddIcon className={classes.icon} />
      </Button>
    </Box>
  );
};

export default OperatorInput;
