import { useSelector } from "react-redux";
import { IState, EApps } from "@wf-org/trolly.store";
import { ETheme } from "@wf-org/trolly.common";

export interface IAppInfo {
  title: string;
  theme: ETheme;
  appId?: EApps;
}
const useAppInfo = (): IAppInfo => {
  const auth = useSelector((state: IState) => state.auth);
  if (auth) {
    const { appId } = auth;
    if (appId) {
      switch (appId) {
        case "C":
          return { title: "Trade", theme: "secondary", appId };
        case "B":
          return { title: "Factor investing", theme: "primary", appId };
        default:
          return { title: "Invest", theme: "primary", appId };
      }
    }
  }
  return { title: "Invest", theme: "primary" };
};

export default useAppInfo;
