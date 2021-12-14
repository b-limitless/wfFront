import React from 'react';
import {Box, Button, Text} from 'trolly/common';
import {useDispatch, useSelector} from 'react-redux';
import {Paper} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import {IAppState} from '../../../../store/store.interface';
import {FUNDING_PAGE_RESET, FUNDING_PAGE_TRANSACTION_SUBMITTING} from '../../../../store/store.types';
import {apiActions} from '../../../../trolly/store';
import {useAppInfo} from '@wf-org/trolly.hooks';
import CheckIcon from '@material-ui/icons/Check';

const Status: React.FC = () => {
  const dispatch = useDispatch();
  const {palette} = useTheme();
  const {theme} = useAppInfo();
  const {
    accountInfo,
    amountEnter,
    currencySelected
  } = useSelector((state: IAppState) => ({...state.auth, ...state.funding.component}));

  return (
    <Paper elevation={0}>
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
              my={3}
              color="#000">
          Thank you
        </Text>

        <Text color={palette[theme].main}
              fontSize={48}
              lineHeight={1.5}>
          {String(currencySelected) === 'USD' && '$'}{amountEnter} {currencySelected}
        </Text>

        <Box bgcolor={palette.grey[200]}
             height="1px"
             width="80%"
             mx="auto"
             my="35px" />

        <Text fontSize={18}
              lineHeight="34px"
              mb="10px"
              color="#000">
          Recipient
        </Text>

        <Text fontSize={20}
              lineHeight="26px"
              color="#6C6C6C">
          {accountInfo.accountInfo.beneficiary_name}
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
                  onClick={() => {
                    dispatch(apiActions.clearApi(FUNDING_PAGE_TRANSACTION_SUBMITTING));
                    dispatch({type: FUNDING_PAGE_RESET});
                  }}
          >Done</Button>
        </Box>

      </Box>
    </Paper>
  );
};

export default Status;