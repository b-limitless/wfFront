import React from 'react';
import {Typography} from '@material-ui/core';
import useStyles from './DetailList.style';

type TPropsContent = { [key: string]: string; }

type Props = {
  content: TPropsContent
}

const DetailList: React.FC<Props> = ({content}) => {
  const classes = useStyles();

  return (
    <div className={classes.infoList}>
      {
        Object.entries(content)
          .filter(([key, value]) => !!value)
          .map(([key, value], index) => (
            <Typography key={index}
                        className={classes.infoListItem}>
              <span>{key}</span>
              <span>{value}</span>
            </Typography>
          ))
      }
    </div>
  );
};

export default DetailList;
