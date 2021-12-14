import React, { FC } from "react";
import { StyledCard, StyledCardActions } from "./Card.style";
import { ICardProps } from "./Card.interface";

const Card: FC<ICardProps> = React.forwardRef(
  (
    { children, actions, actionsWrapperStyles, id, className, ...rest },
    ref
  ) => {
    return (
      <StyledCard {...rest} id={id} ref={ref as any} className={className}>
        {children}
        {actions && (
          <StyledCardActions {...actionsWrapperStyles}>
            {actions}
          </StyledCardActions>
        )}
      </StyledCard>
    );
  }
);

Card.defaultProps = {
  boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.04)",
  bgcolor: "#FFF",
  borderRadius: "12px",
  padding: "15px",
};

export default Card;
