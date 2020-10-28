import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#6B8E23',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#6B8E23',
            },
            '&:hover fieldset': {
                borderColor: '#6B8E23',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6B8E23',
            },
        },
    },
})(TextField);

const StyledInput = (props) => {
    return (
        < CssTextField {...props} />
    )
};

export default StyledInput;