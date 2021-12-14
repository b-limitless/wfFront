import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(({palette}) => ({
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 40
  },
  radioLabel: {
    margin: 0,
    flex: 1,
    display: 'flex',

    '&:first-of-type .MuiTypography-root': {
      borderBottomLeftRadius: '4px',
      borderTopLeftRadius: '4px'
    },
    '&:last-of-type .MuiTypography-root': {
      borderBottomRightRadius: '4px',
      borderTopRightRadius: '4px'
    },
    '& .MuiRadio-root': {
      opacity: 0,
      display: 'none',
      visibility: 'hidden'
    },
    '& .MuiTypography-root': {
      flex: '0 0 100%',
      fontSize: '18px',
      fontWeight: 500,
      color: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '56px',
      border: '1px solid #aaa'
    },
    '& .Mui-checked': {

      '& + .MuiTypography-root': {
        color: '#fff',
        background: '#000',
        border: '1px solid #000'
      }
    }
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
  },
  separatorLine: {
    paddingLeft: '7px',
    alignSelf: 'stretch',
    marginRight: '15px',
    borderRight: '1px solid #6C6C6C',
    position: 'relative',
    '& .dot': {
      position: 'absolute',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#000',
      top: '50%',
      right: '-4px',
      transform: 'translateY(-50%)'
    }
  },
  separatorText: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.5,
    paddingTop: '20px',
    paddingBottom: '20px',
    color: '#6C6C6C'
  },
  input: {
    paddingLeft: 14,
    '& .MuiInputAdornment-root .MuiTypography-root': {
      color: '#000',
      fontWeight: 500,
      lineHeight: 1.1
    },
    '& input.Mui-disabled': {
      color: '#000'
    },
    '& .MuiInputBase-input': {
      paddingLeft: 6
    }
  }
}));
