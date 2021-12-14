import { IOnboardingState } from "trolly/modules";
import { IOnBoardingQuestionsState } from "./reducers/onBoardingQuestions.reducers";
import { IState } from "trolly/store";
import { IGeneralData } from "./reducers/general.reducers";
import { IInvestState } from "./reducers/invest.reducers";
import { ITradeState } from "./reducers/trade.reducers";
import { IFundingState } from "./reducers/funding.reducers";
import { IWatchlistState } from "./reducers/watchlist.reducers";
import { IRewardsState } from "./reducers/rewards.reducers";
import { IBasketsState } from "./reducers/baskets.reducers";
import { IStrategiesState } from "./reducers/strategies.reducers";

export interface IAppState extends IState, IOnboardingState {
  onBoardingQuestions: IOnBoardingQuestionsState;
  general: IGeneralData;
  invest: IInvestState;
  trade: ITradeState;
  funding: IFundingState;
  watchlist: IWatchlistState;
  rewards: IRewardsState;
  baskets: IBasketsState;
  strategies: IStrategiesState;
}
