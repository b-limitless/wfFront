import {makeStyles} from '@material-ui/core';

export default makeStyles(() => ({
  loading: {
    display: 'block',
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto',
    '& .MuiTypography-root': {
      marginBottom: 25,
      borderRadius: 12,
      overflow: 'hidden'
    },
    '& .MuiSkeleton-root': {
      margin: 0,
      transform: 'scale(1)',
      height: 114
    }
  },
  Withdrawal: {
    maxWidth: 735,
    margin: '0 auto'
  }
}));
