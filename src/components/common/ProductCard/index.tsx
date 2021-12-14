import React from "react";
import { useStyles } from "./ProductCard.styles";
import investSignup from "assets/Images/investProductCard.png";
import tradeSignup from "assets/Images/tradeProductCard.png";
import Button from "./Button";
import { ETheme, Text } from "@wf-org/trolly.common";
import { Box } from "trolly/common";

interface IProductCardProps {
  color: ETheme;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  header?: string;
  title?: string;
  buttonLabel?: string;
  product?: "invest" | "trade";
}
const ProductCard: React.FC<IProductCardProps> = ({
  color,
  onClick,
  disabled,
  isLoading,
  header,
  title,
  buttonLabel,
  product,
}) => {
  const { wrapper, productCardImage, imageWrapper } = useStyles({
    color,
    product,
  });

  return (
    <Box className={wrapper}>
      <Text
        fontSize={["25px", "25px", "30px", "30px"]}
        fontWeight={600}
        whiteSpace="normal"
        overflow="visible"
        mb="15px"
        textAlign="center"
        color="common.white"
      >
        {header}
      </Text>
      <Text
        fontSize={["18px", "18px", "22px", "22px"]}
        fontWeight={600}
        whiteSpace="normal"
        overflow="visible"
        mb="15px"
        textAlign="center"
        color="common.white"
      >
        {title}
      </Text>
      <Box className={imageWrapper}>
        <img
          className={productCardImage}
          src={product === "trade" ? tradeSignup : investSignup}
          alt={product === "trade" ? "Wealthface trade" : "Wealthface trade"}
        />
      </Box>
      <Button
        color={color}
        onClick={onClick}
        isLoading={isLoading}
        loaderColor={color}
        disabled={disabled}
      >
        {disabled ? "Comming soon" : buttonLabel}
      </Button>
    </Box>
  );
};

export default ProductCard;
