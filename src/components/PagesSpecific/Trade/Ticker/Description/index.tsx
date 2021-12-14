import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { TRADE_GET_INSTRUMENT_FUNDAMENTAL } from "store/store.types";
import { Box, Card, Link, Skeleton, Text } from "trolly/common";
import ArrowDown from "@material-ui/icons/ExpandMore";
import ArrowUp from "@material-ui/icons/ExpandLess";
import { useApiInfo } from "trolly/hooks";
import DescriptionIcon from "@material-ui/icons/Description";
import { Theme } from "@material-ui/core";

const Loader = () => {
  return (
    <Card padding={["22px", "22px", "30px", "30px"]} gridGap="10px">
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="70%" />
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "block" /* Fallback for non-webkit */,
    height: ({
      fontSize,
      lineHeight,
      linesToShow,
    }: {
      fontSize: number;
      lineHeight: number;
      linesToShow?: number;
    }) =>
      linesToShow && linesToShow > 0
        ? fontSize * lineHeight * linesToShow
        : "auto" /* Fallback for non-webkit */,
    WebkitLineClamp: ({ linesToShow }) =>
      linesToShow && linesToShow > 0 ? linesToShow : "unset",
    boxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    [theme.breakpoints.down("md")]: {
      height: "auto !important",
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
}));

const defaultLinesToShow = 13;
const Description: React.FC<{ symbol: string | null }> = ({ symbol }) => {
  const [linesToShow, setLinesToShow] = useState<number | undefined>();
  const [element, setElement] = useState<any>();
  const classes = useStyles({
    fontSize: 14,
    lineHeight: 1.2,
    linesToShow: linesToShow,
  });
  const { instrumentFundamental } = useSelector(
    (state: IAppState) => state.trade
  );
  const { isLoading, isSuccess } = useApiInfo(TRADE_GET_INSTRUMENT_FUNDAMENTAL);

  const description = useMemo(
    () => (instrumentFundamental ? instrumentFundamental.description : ""),
    [instrumentFundamental]
  );

  const prepareBlockHeight = useCallback(() => {
    if (element) {
      const { clientHeight } = element;
      if (description && description.length > 350) {
        if (clientHeight) {
          if (clientHeight > 370) {
            setLinesToShow(defaultLinesToShow);
          } else {
            setLinesToShow(0);
          }
        }
      } else {
        setLinesToShow(0);
      }
    }
  }, [element, description]);

  useEffect(() => {
    if (element && description) {
      prepareBlockHeight();
    }
  }, [element, prepareBlockHeight, description]);

  const onMoreClicked = useCallback(() => {
    if (linesToShow) {
      setLinesToShow(0);
    } else {
      setLinesToShow(defaultLinesToShow);
    }
  }, [linesToShow]);

  const moreLink = useMemo(() => {
    if (
      typeof linesToShow !== "undefined" &&
      description &&
      description.length > 350
    ) {
      if (linesToShow === 0) {
        return (
          <Link
            display={["none", "none", "block", "block"]}
            color="secondary"
            fontSize="14px"
            onClick={onMoreClicked}
            textAlign="center"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              className={classes.icon}
            >
              Less <ArrowUp />
            </Box>
          </Link>
        );
      } else if (linesToShow > 0) {
        return (
          <Link
            color="secondary"
            fontSize="14px"
            onClick={onMoreClicked}
            textAlign="center"
            display={["none", "none", "block", "block"]}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              className={classes.icon}
            >
              More <ArrowDown />
            </Box>
          </Link>
        );
      }
    }
  }, [linesToShow, onMoreClicked, classes, description]);

  const content = useMemo(() => {
    if (description) {
      return (
        <>
          <Text
            color="text.primary"
            fontWeight={700}
            textAlign="left"
            marginBottom="30px"
          >
            About {symbol}
          </Text>
          <Text
            color="text.secondary"
            fontSize="14px"
            lineHeight={1.2}
            fontWeight={500}
            marginBottom="20px"
            overflow="hidden"
            className={classes.root}
          >
            {description}
          </Text>
          <Box display="flex" justifyContent="center" alignContent="center">
            {moreLink}
          </Box>
        </>
      );
    }
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <DescriptionIcon color="secondary" style={{ fontSize: "150px" }} />
        <Text
          fontSize="16px"
          fontWeight={600}
          color="text.secondary"
          marginTop="20px"
        >
          Description is not available
        </Text>
      </Box>
    );
  }, [description, moreLink, classes, symbol]);

  if (isLoading || !isSuccess) {
    return <Loader />;
  }
  return (
    <Card
      height={linesToShow === -1 ? "100%" : "fit-content"}
      padding={["22px", "22px", "30px", "30px"]}
      id="description-container"
      ref={(element: any) => {
        if (!element) return;
        setElement(element);
      }}
    >
      {content}
    </Card>
  );
};

export default Description;
