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
  funding: {
    display: 'block',
    maxWidth: '600px',
    width: '100%',
    margin: '0 auto'
  },
  icon: {
    width: 44,
    height: 44,
    color: '#ff9800',
    marginRight: 15
  }
}));
