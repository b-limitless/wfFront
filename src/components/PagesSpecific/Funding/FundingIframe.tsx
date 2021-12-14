import { LinearProgress, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFundingIframeUrl } from "store/actions/funding.actions";
import { IAppState } from "store/store.interface";
import { Box, Dialog } from "trolly/common";
import { useAppInfo } from "trolly/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  iframeContainer: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
    overflow: "hidden",
    border: "none",
    zIndex: 10000,
    width: "100%",
    minHeight: "800px",
    display: ({ loaded }: { loaded: boolean }) => (loaded ? "block" : "none"),
  },
  contentWrapperStyle: {
    width: "auto",
    display: "flex",
  },
}));
const FundingIframe: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { iframeContainer } = useStyles({ loaded });
  const { iframeUrl } = useSelector((state: IAppState) => state.funding);
  const dispatch = useDispatch();

  const onLoadedHandler = () => {
    setLoaded(true);
  };

  const onCloseFundingChannel = () => {
    dispatch(setFundingIframeUrl(""));
  };

  const { theme } = useAppInfo();

  if (!iframeUrl) {
    return null;
  }
  return (
    <Dialog
      open={!!iframeUrl}
      onClose={onCloseFundingChannel}
      onBackdropClick={onCloseFundingChannel}
      withCloseIcon
      withColoredHeader
      color={theme}
      screenMinHeight="800px"
      screenMinWidth="800px"
      padding="0px"
      titlePadding="10px 10px 3px 10px"
      contentWrapperStyles={{
        display: "flex",
        padding: "0px",
      }}
    >
      {!loaded && (
        <Box display="flex" width="100%">
          {/* <Loader color={theme} withLogo /> */}
          <LinearProgress
            style={{ width: "100%" }}
            variant="indeterminate"
            color={theme}
          />
        </Box>
      )}
      <iframe
        className={iframeContainer}
        title="Wealthface Funding Channel"
        src={iframeUrl}
        onLoad={onLoadedHandler}
      />
    </Dialog>
  );
};

export default FundingIframe;
