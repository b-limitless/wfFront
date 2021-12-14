import React from "react";
import { Alert, Box, Button, Text } from "trolly/common";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  icon: {
    width: "100px",
    height: "100px",
    marginBottom: "10px",
  },
});
const ErrorComponent: React.FC<{
  error: string[] | string;
  onRetry: () => void;
}> = ({ error, onRetry }) => {
  const { icon } = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      marginTop="50px"
    >
      <ErrorOutline color="secondary" className={icon} />
      <Text my="10px" variant="h3" color="text.secondary">
        We are facing problem in loading your portfolio due to below error
      </Text>
      <Alert type="text" severity="error" color="error">
        {error}
      </Alert>
      <Button
        margin="10px 0 0 0"
        round
        color="secondary"
        onClick={onRetry}
        width="200px"
        variant="contained"
      >
        Retry
      </Button>
    </Box>
  );
};

export default ErrorComponent;
