import React from "react";
import {Skeleton} from "trolly/common";
import { makeStyles } from '@material-ui/core/styles';

const useStyles =  makeStyles(() => ({
  loading: {
    "& .MuiSkeleton-root": {
      transform: 'scale(1)'
    }
  },
}));

const Loader: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <Skeleton animation="wave" width="100%" style={{height: 25, margin: '25px 0 18px'}} />
      <Skeleton animation="wave" width="100%" style={{height: 11, marginBottom: 7}} />
      <Skeleton animation="wave" width="100%" style={{height: 11, marginBottom: 7}} />
      <Skeleton animation="wave" width="25%" style={{height: 11, marginBottom: 7}} />
      <Skeleton animation="wave" width="100%" style={{height: 56, marginTop: 150}} />
    </div>
  );
}

export default Loader;