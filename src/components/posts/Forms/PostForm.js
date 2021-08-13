import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack, Typography} from '@material-ui/core';
// components
import {ImageUploadField, InputField} from '../../common/FormFields'
// styles
import UseStyles from '../styles';

export default function PostForm(props) {
    const classes = UseStyles();

    const {
        formField: {
            bookPhoto,
            bookSellPrice,
            bookStatus,
            bookDesc
        }
    } = props;

    return (
        <Paper className={classes.formArea} elevation={6}>
            <Stack direction={'column'} spacing={2}>
                <div>
                    <Typography variant={'h6'}>
                        책 상태 (사진)
                    </Typography>
                    <ImageUploadField
                        name={bookPhoto.name}
                    />
                </div>
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                    <InputField
                        fullWidth
                        name={bookSellPrice.name}
                        label={bookSellPrice.label}
                        placeholder={bookSellPrice.placeMsg}
                    />


                    <FormControl
                        fullWidth
                        name={bookStatus.name}
                        component="fieldset"
                    >
                        <FormLabel component="legend">{bookStatus.label}</FormLabel>
                        <RadioGroup
                            row
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="4" control={<Radio/>} label="최상"/>
                            <FormControlLabel value="3" control={<Radio/>} label="상"/>
                            <FormControlLabel value="2" control={<Radio/>} label="중"/>
                            <FormControlLabel value="1" control={<Radio/>} label="하"/>
                        </RadioGroup>
                    </FormControl>
                </Stack>

                <InputField
                    multiline
                    maxRows={4}
                    name={bookDesc.name}
                    label={bookDesc.label}
                />
            </Stack>
        </Paper>

    );
}