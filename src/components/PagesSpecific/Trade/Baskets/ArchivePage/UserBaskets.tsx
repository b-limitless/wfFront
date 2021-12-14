import ButtonItem from "components/common/ButtonItem";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IBasketItem } from "store/reducers/baskets.reducers";
import { IAppState } from "store/store.interface";
import { BASKETS_GET_BASKETS } from "store/store.types";
import { Box } from "trolly/common";
import { useApiInfo } from "trolly/hooks";
import { useCarouselStyles } from "../baskets.style";
import BasketsLoader from "./Loader";
import Slider, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import BasketButtonsContainer from "./BasketButtonsContainer";
import ButtonCreate from "components/common/ButtonCreate";
import { getBaskets } from "store/actions/baskets.actions";

interface IUserBasketsProps {
  handleCreate: () => void;
  handleClick: (item: any, type: "user" | "wealthface") => () => void;
  handleEdit: (bakset: IBasketItem) => () => void;
  openDeleteDialog: (basket: IBasketItem) => () => void;
  defaultNumOfItems?: number;
  withCarousel?: boolean;
}
const UserBaskets: React.FC<IUserBasketsProps> = ({
  handleClick,
  handleCreate,
  handleEdit,
  openDeleteDialog,
  defaultNumOfItems,
  withCarousel,
}) => {
  const dispatch = useDispatch();
  const { backButton, forwardButton, carouselWrapper } = useCarouselStyles();
  const { baskets } = useSelector((state: IAppState) => state.baskets);

  useEffect(() => {
    dispatch(getBaskets());
  }, [dispatch]);

  const { done } = useApiInfo(BASKETS_GET_BASKETS);

  const [carouselValue, setCarouselValue] = useState(0);

  const onChangeSlideHandler = (value: any) => {
    setCarouselValue(value);
  };

  const basketsButtons = useMemo(() => {
    if (done) {
      if (baskets && baskets.length > 0) {
        return baskets.map((basket) => (
          <ButtonItem
            icon="basket"
            type="user"
            key={basket._id}
            onClick={handleClick(basket, "user")}
            onEdit={handleEdit(basket)}
            onDelete={openDeleteDialog(basket)}
            title={basket.name}
            subTitle={
              basket.tickers.length === 0
                ? `0 Ticker`
                : `${basket.tickers.length} Tickers`
            }
            height={165}
            createdAt={basket.created_at}
          />
        ));
      }
    }
    return null;
  }, [baskets, handleClick, handleEdit, done, openDeleteDialog]);

  const onButtonCarouselClickHandler = useCallback(
    (type: "back" | "forward") => () => {
      if (type === "back") {
        const backValue = carouselValue - 1;
        if (basketsButtons && backValue < 0) {
          setCarouselValue(basketsButtons.length - 1);
        } else {
          setCarouselValue(backValue);
        }
      } else {
        const nextValue = carouselValue + 1;
        if (basketsButtons && nextValue >= basketsButtons.length) {
          setCarouselValue(0);
        } else {
          setCarouselValue(nextValue);
        }
      }
    },
    [basketsButtons, carouselValue]
  );

  if (!done) {
    return (
      <>
        <BasketsLoader />
      </>
    );
  } else if (basketsButtons && basketsButtons.length > 0 && withCarousel) {
    return (
      <>
        <Box
          position="relative"
          display="flex"
          gridGap="20px"
          flexDirection="column"
          alignContent="center"
          alignItems="center"
          height={["250px", "360px"]}
          className={carouselWrapper}
          mb="30px"
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
            slides={basketsButtons}
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
  } else if (basketsButtons && basketsButtons.length > 0) {
    return (
      <BasketButtonsContainer>
        {basketsButtons}
        <ButtonCreate onClick={handleCreate} height={165} />
      </BasketButtonsContainer>
    );
  } else {
    return (
      <BasketButtonsContainer>
        <ButtonCreate onClick={handleCreate} height={165} />
      </BasketButtonsContainer>
    );
  }
};

export default UserBaskets;
