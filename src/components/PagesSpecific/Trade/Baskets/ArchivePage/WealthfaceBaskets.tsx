import ButtonItem from "components/common/ButtonItem";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { STRATEGIES_GET_USER_STRATEGIES } from "store/store.types";
import { Box } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { useCarouselStyles } from "../baskets.style";
import BasketsLoader from "./Loader";
import Slider, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import BasketButtonsContainer from "./BasketButtonsContainer";
import { IStrategy } from "store/reducers/strategies.reducers";
import { history } from "config";
import ButtonCreate from "components/common/ButtonCreate";
import { authActions } from "trolly/store";
import { getUserStrategies } from "store/actions/strategies.actions";

interface IWealthfaceBasketsProps {
  handleClick: (item: any, type: "user" | "wealthface") => () => void;
  openDeleteDialog: (basket: IStrategy) => () => void;
  defaultNumOfItems?: number;
  withCarousel?: boolean;
}
const WealthfaceBaskets: React.FC<IWealthfaceBasketsProps> = ({
  handleClick,
  openDeleteDialog,
  defaultNumOfItems,
  withCarousel,
}) => {
  const { userStrategies, afData } = useSelector((state: IAppState) => ({
    ...state.strategies,
    ...state.auth,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!afData) {
      dispatch(authActions.getAfToken());
    }
  }, [dispatch, afData]);

  useEffect(() => {
    if (afData) {
      dispatch(getUserStrategies());
    }
  }, [dispatch, afData]);

  const { backButton, forwardButton, carouselWrapper } = useCarouselStyles();

  const [carouselValue, setCarouselValue] = useState(0);

  const onChangeSlideHandler = (value: any) => {
    setCarouselValue(value);
  };

  const { done } = useApiInfo(STRATEGIES_GET_USER_STRATEGIES);

  const goToStrategies = () => {
    history.push("/trade/strategies");
  };

  const wealthfaceUserButtons = useMemo(() => {
    if (userStrategies) {
      const { userPrebuiltStrategies: wfStrateggies } = userStrategies;
      if (wfStrateggies && wfStrateggies.length > 0) {
        return wfStrateggies.map((basket) => (
          <ButtonItem
            icon="basket"
            type="wealthface"
            key={basket.strategy}
            onClick={handleClick(basket, "wealthface")}
            onDelete={openDeleteDialog(basket)}
            title={basket.name}
            subTitle={
              basket.members.length === 0
                ? `0 Ticker`
                : `${basket.members.length} Tickers`
            }
            height={165}
            createdAt={basket.created_at}
          />
        ));
      }
    }
  }, [handleClick, userStrategies, openDeleteDialog]);

  const onButtonCarouselClickHandler = useCallback(
    (type: "back" | "forward") => () => {
      if (type === "back") {
        const backValue = carouselValue - 1;
        if (wealthfaceUserButtons && backValue < 0) {
          setCarouselValue(wealthfaceUserButtons.length - 1);
        } else {
          setCarouselValue(backValue);
        }
      } else {
        const nextValue = carouselValue + 1;
        if (
          wealthfaceUserButtons &&
          nextValue >= wealthfaceUserButtons.length
        ) {
          setCarouselValue(0);
        } else {
          setCarouselValue(nextValue);
        }
      }
    },
    [wealthfaceUserButtons, carouselValue]
  );

  if (!done) {
    return (
      <>
        <BasketsLoader />
      </>
    );
  } else if (
    wealthfaceUserButtons &&
    wealthfaceUserButtons.length > 0 &&
    withCarousel
  ) {
    return (
      <>
        <Box
          position="relative"
          display="flex"
          gridGap="20px"
          flexDirection="column"
          alignContent="center"
          alignItems="center"
          justifyContent="flex-start"
          height={["250px", "360px"]}
          className={carouselWrapper}
        >
          <Slider
            onChange={onChangeSlideHandler}
            value={carouselValue}
            plugins={[
              "fastSwipe",
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: defaultNumOfItems,
                },
              },
            ]}
            slides={wealthfaceUserButtons}
          />
          <IconButton
            onClick={onButtonCarouselClickHandler("back")}
            type="button"
            className={backButton}
          >
            <ArrowBack color="secondary" />
          </IconButton>
          <IconButton
            onClick={onButtonCarouselClickHandler("forward")}
            type="button"
            className={forwardButton}
          >
            <ArrowForward color="secondary" />
          </IconButton>
        </Box>
      </>
    );
  } else if (wealthfaceUserButtons && wealthfaceUserButtons.length > 0) {
    return (
      <BasketButtonsContainer>
        {wealthfaceUserButtons}
        <ButtonCreate onClick={goToStrategies} height={165} />
      </BasketButtonsContainer>
    );
  } else {
    return (
      <BasketButtonsContainer>
        <ButtonCreate onClick={goToStrategies} height={165} />
      </BasketButtonsContainer>
    );
  }
};

export default WealthfaceBaskets;
