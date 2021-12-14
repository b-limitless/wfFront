import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { useApiInfo, useBreakPoints } from "trolly/hooks";
import { Text } from "trolly/common";
import { getFundingPaymentInitialize } from "store/actions/funding.actions";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { FUNDING_GET_PAYMENT_INITIALIZE } from "store/store.types";
import { IOptionsConfigObj } from "./CashFlowButton.interface";
import useStyles, { useButtonStyles } from "./Button.styles";

export type Props = {
  data: IOptionsConfigObj;
  disabled?: boolean;
};

const FundingButton: React.FC<Props> = ({
  data: { onClick, icon, subtitle, title },
  disabled,
}) => {
  const classes = useStyles();
  const buttonClasses = useButtonStyles();
  const { xSmall } = useBreakPoints();
  const dispatch = useDispatch();
  const { isLoading: isPaymentInitialized } = useApiInfo(
    FUNDING_GET_PAYMENT_INITIALIZE
  );

  const onButtonClick = () => {
    const type = onClick.type;
    if (onClick.clickAction) {
      onClick.clickAction();
    } else if (type === "dispatch") {
      dispatch({ type: onClick.dispatchType });
    } else if (type === "api_call" && onClick.url) {
      dispatch(getFundingPaymentInitialize(onClick.url, true));
    }
  };
  return (
    <>
      <Button
        onClick={onButtonClick}
        fullWidth
        classes={buttonClasses}
        disabled={isPaymentInitialized || disabled}
      >
        <div className={classes.icon}>
          {typeof icon === "object" ? icon : <img src={icon} alt="" />}
        </div>
        <div className={classes.content}>
          <Text
            variant="h2"
            lineHeight="26px"
            mb="5px"
            fontWeight={600}
            mt={xSmall && "5px"}
          >
            {title}
          </Text>
          {subtitle.map((item) => (
            <Text
              variant="body2"
              key={item}
              lineHeight={1.5}
              color="#6C6C6C"
              fontWeight={500}
            >
              {item}
            </Text>
          ))}
        </div>
        {!xSmall && <ChevronRightIcon className={classes.arrow} />}
      </Button>
    </>
  );
};

export default FundingButton;
