import React from "react";
import ChipComp from "@material-ui/core/Chip";
import { IChipProps } from "./Chip.interface";
import { useChipStyles } from "./Chip.style";

const Chip: React.FC<IChipProps> = (props) => {
  const classes = useChipStyles(props);
  return <ChipComp classes={classes} {...props} />;
};

export default Chip;
