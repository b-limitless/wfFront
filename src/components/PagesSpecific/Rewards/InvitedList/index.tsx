import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useApiInfo} from "trolly/hooks";
import { IAppState } from 'store/store.interface';
import { Text, Box, Card, Skeleton } from 'trolly/common';
import { REWARDS_GET_LIST_REFERRED_CLIENTS } from 'store/store.types';
import { getListReferredClients } from 'store/actions/rewards.actions';
import ImageNotFound from 'assets/Images/rewardsNotFound.png';
import InvitedListItem from '../InvitedListItem';
import {IRewardsProps} from "../index";

const Loader: React.FC = () => {
  return (
    <div>
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          padding="0 20px 10px"
          marginBottom="20px"
          borderBottom="1px solid #F1F1F1"
        >
          <Box marginBottom="5px">
            <Skeleton width="100%" height="18px" />
          </Box>
          <Box marginBottom="5px">
            <Skeleton width="100%" height="8px" />
          </Box>
          <Box>
            <Skeleton width="100%" height="8px" />
          </Box>
        </Box>
      ))}
    </div>
  );
};

const InvitedList: React.FC<IRewardsProps> = ({prodType}) => {
  const dispatch = useDispatch();
  const { listReferredClients } = useSelector(
    (state: IAppState) => state.rewards
  );
  const { isLoading: isFetchingReferredClientsList } = useApiInfo(
    REWARDS_GET_LIST_REFERRED_CLIENTS
  );

  useEffect(() => {
    if (listReferredClients) {
      return;
    }
    dispatch(getListReferredClients(prodType));
  }, [listReferredClients, prodType, dispatch]);

  return (
    <Card padding="0 0 60px">
      <Text fontSize="20px" fontWeight={600} padding="30px 20px">
        Invited Friend
      </Text>

      {
        isFetchingReferredClientsList
          ? <Loader />
          : (listReferredClients && listReferredClients?.length) ? (
            listReferredClients.map((item) => (
              <InvitedListItem key={item.email} {...item} />
            ))
          ) : (
            <Box paddingBottom="100px"
                 textAlign="center">
              <img
                src={ImageNotFound}
                alt="rewards"
                style={{
                  display: 'inline-block',
                  width: '160px',
                  maxWidth: '100%',
                  margin: '40px auto 30px'
                }}
              />
              <Text fontSize={16}
                    fontWeight={500}
                    color="#6c6c6c">
                No friends have been invited yet
              </Text>
            </Box>
          )
      }
    </Card>
  );
};

export default InvitedList;
