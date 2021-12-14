import React, { useState } from "react";
import { Box, Text } from "trolly/common";
import ButtonItemBase from "../ButtonItem/ButtonItemBase";
import { Icon } from "trolly/icons";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useBreakPoints } from "trolly/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  closeIcon: {
    top: 5,
    right: 5,
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      width: "15px",
      height: "15px",
      "& svg": {
        width: "15px",
        height: "15px",
      },
    },
  },
}));

interface IHelperMessage {
  title: string;
  description: string;
}
const HelperMessage: React.FC<IHelperMessage> = ({ title, description }) => {
  const [hideHelper, setHideHelper] = useState(false);

  const { xSmall } = useBreakPoints();

  const classes = useStyles();
  const onCloseHelper = () => {
    setHideHelper(true);
  };
  return (
    <Box mb="30px">
      <ButtonItemBase isHoverable={false} padding="25px" hide={hideHelper}>
        <Box display="flex" flexDirection="row">
          <Icon
            iconName="Question"
            iconSize="CUSTOM"
            width={xSmall ? "45px" : "61px"}
            height={xSmall ? "45px" : "61px"}
          />
          <IconButton className={classes.closeIcon} onClick={onCloseHelper}>
            <CloseIcon />
          </IconButton>
          <Box display="flex" flexDirection="column" ml="20px">
            <Text
              fontSize={["18px", "22px"]}
              fontWeight={600}
              color="text.secondary"
            >
              {title}
            </Text>
            <Text
              fontSize={["12px", "14px"]}
              fontWeight={500}
              color="text.secondary"
            >
              {description}
            </Text>
          </Box>
        </Box>
      </ButtonItemBase>
    </Box>
  );
};

export default HelperMessage;
