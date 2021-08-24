import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from '@material-ui/core';
import React from 'react';

function RadioControls(props) {
    const { name, value, label, onChange, items } = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map((item, index) => (
                        <FormControlLabel
                            key={index}
                            value={item.id}
                            label={item.title}
                            control={<Radio />}
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}

export default RadioControls;
