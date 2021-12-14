import onBoardingQuestions from "./onBoardingQuestions.reducers";
import generalReducers from "./general.reducers";
import investReducers from "./invest.reducers";
import tradeReducers from "./trade.reducers";
import { OnboardingAnswersReducers } from "trolly/modules";
import fundingReducer from "./funding.reducers";
import watchlistReducer from "./watchlist.reducers";
import rewardsReducer from "./rewards.reducers";
import basketReducer from "./baskets.reducers";
import strategiesReducer from "./strategies.reducers";

const reducers = {
  onBoardingQuestions,
  onBoardingAnswers: OnboardingAnswersReducers,
  general: generalReducers,
  invest: investReducers,
  trade: tradeReducers,
  funding: fundingReducer,
  watchlist: watchlistReducer,
  rewards: rewardsReducer,
  baskets: basketReducer,
  strategies: strategiesReducer,
};

export default reducers;
