import React, { FunctionComponent } from "react";
import { useStyles } from "./Pagination.style";
import ArrowLeft from "@material-ui/icons/ArrowBack";
import ArrowRight from "@material-ui/icons/ArrowForward";
import Box from "../../Box";
import Text from "../../Text";
import Link from "../../Link";
import { ETheme } from "../..";

export type ArrowDirectionType = "left" | "right";
export interface IArrow {
  direction?: ArrowDirectionType;
  disabled: boolean;
  onClick: () => void;
  fontSize?: string;
  color?: ETheme;
}

const Arrow: FunctionComponent<IArrow> = (props) => {
  const { disabled, direction, onClick, fontSize, color } = props;

  const classes = useStyles({ disabled });

  const onArrowClick = () => {
    if (disabled) {
      return;
    } else {
      onClick();
    }
  };
  const renderContent = () => {
    const FlexProps = {
      alignItems: "center",
      display: "flex",
    };

    if (direction === "left") {
      return (
        <Box {...FlexProps}>
          <ArrowLeft color={color} />
          <Text
            fontSize={fontSize}
            display={["none", "block", "block", "block"]}
            marginLeft="5px"
            fontWeight={500}
          >
            Previous
          </Text>
        </Box>
      );
    } else {
      return (
        <Box {...FlexProps}>
          <Text
            fontSize={fontSize}
            display={["none", "block", "block", "block"]}
            marginRight="5px"
            fontWeight={500}
          >
            Next
          </Text>
          <ArrowRight color={color} />
        </Box>
      );
    }
  };
  return (
    <Link
      fontSize={fontSize}
      className={classes.link}
      onClick={onArrowClick}
      anchorProps={{
        disabled,
      }}
    >
      {renderContent()}
    </Link>
  );
};

export default Arrow;
