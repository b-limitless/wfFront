import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "trolly/store";
import { PageLoader } from "trolly/custom";
import { useAppInfo } from "trolly/hooks";

const Logout = () => {
  const dispatch = useDispatch();
  const { theme } = useAppInfo();
  useEffect(() => {
    dispatch(authActions.logout());
  }, [dispatch]);
  return <PageLoader color={theme} withLogo={true} />;
};

export default Logout;
