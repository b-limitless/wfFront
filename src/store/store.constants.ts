import { history } from "config";

const initialTestState = {
  onBoardingQuestions: {},
  auth: {
    data: {
      user: {
        address_country: "United Arab Emirates",
        regulation: "UAE",
      },
    },
  },
};

const initialProdState = {
  onBoardingQuestions: {},
};

export const INITIAL_APP_STATE =
  history.location.pathname === "/test/components"
    ? initialTestState
    : initialProdState;
