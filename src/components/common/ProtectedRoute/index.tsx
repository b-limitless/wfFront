import { RouteLoader } from "components/Loaders";
import useAppInit from "hooks/useAppInit";
import React, { FC } from "react";
import { Route, RouteProps } from "react-router-dom";
import { Snackbar } from "trolly/common";
import { PageLoader } from "trolly/custom";

interface IProps extends RouteProps {
  component: React.FunctionComponent;
}
const ProtectedRoute: FC<IProps> = ({ component: Component, ...rest }) => {
  const {
    isAppLoading,
    isAuthenticated,
    onLogout,
    error,
    isVerified,
    theme,
    email,
  } = useAppInit();
  if (isAppLoading) {
    return <PageLoader color={theme} withLogo />;
  } else if (
    !isAuthenticated ||
    (!isVerified && !!email && process.env.NODE_ENV !== "development")
  ) {
    return (
      <>
        <Snackbar
          vertical="top"
          horizontal="center"
          severity="error"
          handleClose={onLogout}
          open={!!error || (!isVerified && !!email)}
        >
          {
            <>
              {error ||
                (!isVerified && !!email && "Your email is not verified")}
            </>
          }
        </Snackbar>
        <RouteLoader />
      </>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...rest} {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
