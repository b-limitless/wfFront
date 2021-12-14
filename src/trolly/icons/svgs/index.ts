// TODO: Someone automate this process please
// Also the entire App breaks in case you have mistakenly used a name of an Icon that don't actually exists here

import * as React from 'react';
import {IProps, TIconTypes} from '../Icons.interface';

type SvgType = {
  [key in TIconTypes]: React.LazyExoticComponent<React.FunctionComponent<IProps>>;
}
const svgs: SvgType = {
  Basket: React.lazy(() => import('./assets/Basket')),
  BasketOff: React.lazy(() => import('./assets/BasketOff')),
  BigLogo: React.lazy(() => import('./assets/BigLogo')),
  CheckboxChecked: React.lazy(() => import('./assets/CheckboxChecked')),
  CheckboxUnchecked: React.lazy(() => import('./assets/CheckboxUnchecked')),
  Factor3dLogo: React.lazy(() => import('./assets/Factor3dLogo')),
  HalalLogo: React.lazy(() => import('./assets/HalalLogo')),
  IconCards: React.lazy(() => import('./assets/IconCards')),
  IconDirectDeposit: React.lazy(() => import('./assets/IconDirectDeposit')),
  IconLocalTransfer: React.lazy(() => import('./assets/IconLocalTransfer')),
  IconOtherOptions: React.lazy(() => import('./assets/IconOtherOptions')),
  IconWireTransfer: React.lazy(() => import('./assets/IconWireTransfer')),
  Invest3dLogo: React.lazy(() => import('./assets/Invest3dLogo')),
  LogoCircle: React.lazy(() => import('./assets/LogoCircle')),
  MasterCard: React.lazy(() => import('./assets/MasterCard')),
  Question: React.lazy(() => import('./assets/Question')),
  RadioChecked: React.lazy(() => import('./assets/RadioChecked')),
  RadioUnchecked: React.lazy(() => import('./assets/RadioUnchecked')),
  RiskLevelHigh: React.lazy(() => import('./assets/RiskLevelHigh')),
  RiskLevelLow: React.lazy(() => import('./assets/RiskLevelLow')),
  RiskLevelMedium: React.lazy(() => import('./assets/RiskLevelMedium')),
  Strategy: React.lazy(() => import('./assets/Strategy')),
  StrategyOff: React.lazy(() => import('./assets/StrategyOff')),
  Trade3dLogo: React.lazy(() => import('./assets/Trade3dLogo')),
  VisaCard: React.lazy(() => import('./assets/VisaCard')),
  Watchlist: React.lazy(() => import('./assets/Watchlist')),
  WealthfaceCoin: React.lazy(() => import('./assets/WealthfaceCoin')),
  WealthfaceProducts: React.lazy(() => import('./assets/WealthfaceProducts')),
  logo: React.lazy(() => import('./assets/logo')),
};

export default svgs;