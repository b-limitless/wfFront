import React from 'react';
import {Box, Card, Button, Text} from 'trolly/common';
import {useTheme} from '@material-ui/core/styles';
import {useAppInfo} from '@wf-org/trolly.hooks';
import CheckIcon from '@material-ui/icons/Check';
import {apiActions} from 'trolly/store';
import {WITHDRAWAL_SAVE_REQUEST_COMPLETED} from 'store/store.types';
import {useDispatch} from 'react-redux';

type TProps = {
  handleDone: () => void
}

const Status: React.FC<TProps> = ({handleDone}) => {
  const {palette} = useTheme();
  const {theme} = useAppInfo();
  const dispatch = useDispatch();

  return (
    <Card display="block" maxWidth="650px" margin="30px auto">
      <Box display="block"
           textAlign="center"
           px="65px"
           py="55px">

        <Box display="flex"
             alignItems="center"
             justifyContent="center"
             mx="auto"
             mb={5}
             borderRadius="50%"
             width="100px"
             height="100px"
             border={`5px solid ${palette[theme].main}`}>
          <CheckIcon style={{color: palette[theme].main, fontSize: '55px'}} />
        </Box>

        <Text fontSize={20}
              lineHeight="26px"
              fontWeight={500}
              my={5}
              color="#000">
          Your request has been sent successfully
        </Text>

        <Box display="block"
             mt={5}>
          <Button variant="contained"
                  color={theme}
                  round
                  type="button"
                  fullWidth={true}
                  height="56px"
                  fontSize="18px"
                  maxWidth="350px"
                  onClick={() => {
                    dispatch(apiActions.clearApi(WITHDRAWAL_SAVE_REQUEST_COMPLETED));
                    handleDone()
                  }}
          >Done</Button>
        </Box>

      </Box>
    </Card>
  );
};

export default Status;