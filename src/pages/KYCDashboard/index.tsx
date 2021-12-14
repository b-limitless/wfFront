import React from "react";
import { useSelector } from "react-redux";
import { IAppState } from "store/store.interface";
import KYCInvestDashboard from "components/PagesSpecific/KYCDashboard/InvestDashboard";
import KYCTradeDashboard from "components/PagesSpecific/KYCDashboard/TradeDashboardV2";
import PageTitle from "portals/PageTitle";

const KYCDashboard: React.FC = () => {
  const { appId } = useSelector((state: IAppState) => state.auth);
  return (
    <>
      <PageTitle siteTitle="Wealthface" pageTitle="KYC Dashboard" />
      {appId === "C" ? <KYCTradeDashboard /> : <KYCInvestDashboard />}
    </>
  );
};

export default KYCDashboard;
