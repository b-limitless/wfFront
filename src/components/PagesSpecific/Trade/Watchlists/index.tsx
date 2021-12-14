import React from 'react';
import {useSelector} from 'react-redux';
import {IAppState} from 'store/store.interface';
import {WATCHLISTS_ARCHIVE, WATCHLISTS_DETAIL} from 'store/store.types';
import WatchlistArchive from './WatchlistArchive';
import WatchlistDetail from './WatchlistDetail';

const WatchlistsComponent: React.FC = () => {
  const {page} = useSelector((state: IAppState) => state.watchlist.render);

  const renderComponent = () => {
    switch (page) {
      case WATCHLISTS_ARCHIVE:
        return <WatchlistArchive />;
      case WATCHLISTS_DETAIL:
        return <WatchlistDetail />;

      default:
        return null;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default WatchlistsComponent;