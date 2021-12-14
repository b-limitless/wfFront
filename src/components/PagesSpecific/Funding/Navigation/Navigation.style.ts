import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  button: {
    color: '#707070',
    '& svg': {
      marginLeft: '0.5rem'
    }
  },
  blank: {
    width: 64,
    height: 1,
    opacity: 0,
    visibility: "hidden"
  }
}));
