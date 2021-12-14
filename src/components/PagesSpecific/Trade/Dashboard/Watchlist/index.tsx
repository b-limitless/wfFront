import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchlistDashboardData } from "store/actions/trade.actions";
import { IAppState } from "store/store.interface";
import { TRADE_GET_WATCHLIST_DASHBOARD } from "store/store.types";
import { useApiInfo } from "trolly/hooks";
import { Skeleton, Text, Box } from "trolly/common";
import DashboardSection from "../DashboardSection";
import Slider, {
  slidesToShowPlugin,
  Dots,
  autoplayPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import useWatchlistDataTransform from "./useWatchlist.hooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import { makeStyles, Theme } from "@material-ui/core/styles";

const Loader: React.FC = () => {
  return (
    <Box gridGap="10px" width="100%">
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="50px" />
      <Skeleton width="100%" height="50px" />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  carouselWrapper: {
    "& .BrainhubCarousel": {
      height: "100%",
    },
    "& .BrainhubCarousel__container": {
      height: "100%",
    },
    "& .BrainhubCarousel__trackContainer": {
      height: "100%",
      "& ul": {
        height: "100%",
      },
    },
  },
  dotsWtapper: {
    "& .BrainhubCarousel__dots .BrainhubCarousel__dot:before": {
      backgroundColor: theme.palette.text.secondary,
      width: "10px",
      height: "10px",
      padding: "5px",
    },
    "& .BrainhubCarousel__dots .BrainhubCarousel__dot.BrainhubCarousel__dot--selected:before":
      {
        backgroundColor: `${theme.palette.secondary.main} !important`,
      },
  },
}));

const Watchlist: React.FC = () => {
  const { dotsWtapper, carouselWrapper } = useStyles();
  const dispatch = useDispatch();
  const [carouselValue, setCarouselValue] = useState(0);
  const [direction, setDirection] = useState("right");

  const components = useWatchlistDataTransform(4);

  useEffect(() => {
    if (components && !!components.length) {
      if (carouselValue === components.length - 1) {
        setDirection("left");
      } else if (carouselValue === 0) {
        setDirection("right");
      }
    }
  }, [carouselValue, components]);

  const { trade } = useSelector((state: IAppState) => ({
    ...state.general,
    ...state.trade,
  }));

  const symbols = useMemo(() => {
    if (trade) {
      const { watchlistSymbols } = trade;
      return watchlistSymbols.map((item) => item.symbol);
    }
    return [];
  }, [trade]);

  const { isLoading, error } = useApiInfo(TRADE_GET_WATCHLIST_DASHBOARD);

  useEffect(() => {
    if (symbols.length > 0) {
      dispatch(getWatchlistDashboardData(symbols.join(",")));
    }
  }, [symbols, dispatch]);

  const onChangeSlideHandler = useCallback((value: number) => {
    setCarouselValue(value);
  }, []);

  const DotsComponent = useMemo(
    () =>
      components.length > 0 && (
        <div className={dotsWtapper}>
          <Dots
            value={carouselValue}
            onChange={onChangeSlideHandler}
            number={components.length}
          />
        </div>
      ),
    [carouselValue, components, dotsWtapper, onChangeSlideHandler]
  );

  const ErrorComponent = useMemo(
    () => (
      <>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
        >
          <BubbleChart
            color="secondary"
            style={{ width: "150px", height: "150px", marginTop: "20px" }}
          />
          <Text
            fontSize="16px"
            fontWeight={600}
            color={error ? "error.main" : "text.primary"}
          >
            {error ? error : "No Data Available"}
          </Text>
        </Box>
      </>
    ),
    [error]
  );

  const CarouselComponent = useMemo(() => {
    if (components.length > 0 && !isLoading) {
      return (
        <Slider
          onChange={onChangeSlideHandler}
          value={carouselValue}
          plugins={[
            "fastSwipe",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 1,
              },
            },
            {
              resolve: autoplayPlugin,
              options: {
                interval: 5000,
                direction: direction,
              },
            },
          ]}
          slides={components}
        />
      );
    } else if (!!error && !isLoading) {
      return ErrorComponent;
    }
    return <Loader />;
  }, [
    ErrorComponent,
    components,
    carouselValue,
    error,
    isLoading,
    onChangeSlideHandler,
    direction,
  ]);

  return (
    <DashboardSection
      withCard={true}
      header="Market Snapshot"
      footer={DotsComponent}
      footerSpace="10px"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
        height={["218", "218", "318px", "318px"]}
        className={carouselWrapper}
      >
        {CarouselComponent}
      </Box>
    </DashboardSection>
  );
};

export default Watchlist;
