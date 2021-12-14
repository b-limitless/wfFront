import React, { FC } from "react";
import Icon from "../../icon";
import { IProps } from "../../Icons.interface";

const IconCards: FC<Partial<IProps>> = (props) => {
  return (
    <Icon {...props}>
      <g>
        <path
          d="M54.5412 31.7712L10.5557 43.1751C9.13809 43.5419 7.69647 42.6966 7.32805 41.2851L0.48836 15.0961C0.119945 13.6846 0.9689 12.2491 2.3865 11.8823L46.364 0.486405C47.7816 0.119567 49.2232 0.964888 49.5916 2.37641L56.4393 28.5654C56.8077 29.9689 55.9588 31.4044 54.5412 31.7712Z"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M50.533 5.96361L1.42188 18.6865L3.08159 25.0384L52.1927 12.3155L50.533 5.96361Z"
          fill="#60DFC8"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M60.9574 52.6012H15.5063C14.0406 52.6012 12.8633 51.421 12.8633 49.9696V22.9034C12.8633 21.444 14.0486 20.2717 15.5063 20.2717H60.9574C62.423 20.2717 63.6004 21.452 63.6004 22.9034V49.9616C63.6004 51.421 62.415 52.6012 60.9574 52.6012Z"
          fill="white"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M57.1851 39.4828H49.2962C48.1269 39.4828 47.1738 38.5338 47.1738 37.3695V34.2753C47.1738 33.111 48.1269 32.162 49.2962 32.162H57.1851C58.3544 32.162 59.3075 33.111 59.3075 34.2753V37.3695C59.2995 38.5338 58.3544 39.4828 57.1851 39.4828Z"
          fill="#F7E059"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M16.4355 46.0381H23.8839"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M28.4648 46.0381H35.9132"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M40.4941 46.0381H47.9425"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d="M52.5234 46.0381H59.9718"
          stroke="black"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </g>
    </Icon>
  );
};

IconCards.defaultProps = {
  viewBox: "0 0 64 53",
};

export default IconCards;
