import React from 'react';
import {InputAdornment, TextField} from '@material-ui/core';

function InputField(props) {
    const { name, label, error = null, onChange, value, inputIcon, required, endAdornment, ...other } = props;

    return (
        <TextField
            required={required || false}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {inputIcon}
                    </InputAdornment>
                ),
                endAdornment: (endAdornment),
            }}
            {...(error && { error: true, helperText: error })}
            {...other}
        />
    )
}

export default InputField;
