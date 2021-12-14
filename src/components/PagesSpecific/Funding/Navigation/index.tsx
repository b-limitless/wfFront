import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Box, Text } from "trolly/common";
import { IAppState } from "store/store.interface";
import useStyles from "./Navigation.style";

interface IProps {
  title: string;
  homeDispatchType: string;
  navigateBackDispatchType: string;
}

const Navigation: React.FC<IProps> = ({
  title,
  navigateBackDispatchType,
  homeDispatchType,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { activeStep } = useSelector(
    (state: IAppState) => state.funding.component
  );

  const handleNavigateBack = () => {
    if (activeStep === 0) {
      dispatch({ type: homeDispatchType });
    } else {
      dispatch({
        type: navigateBackDispatchType,
        payload: { activeStep: activeStep - 1 },
      });
    }
  };

  return (
    <Box
      display="flex"
      py={2}
      mb={3}
      alignItems="center"
      justifyContent="space-between"
    >
      <Button className={classes.button} onClick={handleNavigateBack}>
        <ArrowBackIosIcon />
      </Button>

      <Box display="block" textAlign="center" mx={1}>
        <Text
          fontSize={[20, 26]}
          fontWeight={500}
          lineHeight={1.3}
          color="#000"
        >
          {title}
        </Text>
      </Box>

      <div className={classes.blank} />
    </Box>
  );
};

export default Navigation;
