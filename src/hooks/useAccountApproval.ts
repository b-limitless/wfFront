import { useMemo } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import { useAppInfo } from "trolly/hooks";

const useFundingApproval = () => {
  const { appId } = useAppInfo();
  const { account: tradeAccount, accountInfo: investAccount } = useSelector(
    (state: IAppState) => ({ ...state.trade, ...state.invest })
  );
  const isFundingAllowed = useMemo(() => {
    if (appId === "A") {
      if (investAccount && investAccount[0]) {
        const { status } = investAccount[0];
        const { name } = status || {};
        if (["OPEN", "APPROVED"].indexOf(name) > -1) {
          return true;
        }
      }
      return false;
    } else if (appId === "C") {
      if (tradeAccount) {
        const { status } = tradeAccount;
        const { name } = status || {};
        if (["OPEN", "APPROVED"].indexOf(name) > -1) {
          return true;
        }
      }
      return false;
    }
  }, [appId, investAccount, tradeAccount]);

  return [isFundingAllowed];
};

export default useFundingApproval;
