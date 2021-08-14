import React from 'react';
import {FormControl, FormHelperText, FormLabel, Paper, Radio, RadioGroup, Stack, Typography} from '@material-ui/core';
import {Field, useFormikContext} from 'formik'
// components
import {ImageUploadField, InputField} from '../../common/FormFields'
// styles
import UseStyles from '../styles';
import palette from '../../../theme/palette';

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

    const meta = useFormikContext();

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
                        type={'number'}
                        name={bookSellPrice.name}
                        label={bookSellPrice.label}
                        placeholder={bookSellPrice.placeMsg}
                    />
                    <FormControl
                        fullWidth
                        component="fieldset"
                        sx={{pl:6}}
                    >
                        <FormLabel component="legend">{bookStatus.label}</FormLabel>
                        <RadioGroup
                            row
                        >

                            <label>
                                최상
                                <Field name={bookStatus.name} value="
                                4" as={Radio}
                                       sx={{
                                           color: palette.success.light,
                                           '&.Mui-checked': {
                                               color: palette.success.main
                                           }
                                       }}/>
                            </label>
                            <label>
                                상
                                <Field name={bookStatus.name} value="3" as={Radio}
                                       sx={{
                                           color: palette.info.light,
                                           '&.Mui-checked': {
                                               color: palette.info.main
                                           }
                                       }}/>
                            </label>
                            <label>
                                중
                                <Field name={bookStatus.name} value="2" as={Radio}
                                       sx={{
                                           color: palette.warning.light,
                                           '&.Mui-checked': {
                                               color: palette.warning.main
                                           }
                                       }}/>
                            </label>
                            <label>
                                하
                                <Field name={bookStatus.name} value="1" as={Radio}
                                       sx={{
                                           color: palette.error.light,
                                           '&.Mui-checked': {
                                               color: palette.error.main
                                           }
                                       }}/>
                            </label>
                        </RadioGroup>
                        <FormHelperText
                            error={Boolean(meta.errors.bookStatus)}>{meta.errors.bookStatus}</FormHelperText>
                    </FormControl>
                </Stack>

                <InputField
                    multiline
                    maxRows={4}
                    name={bookDesc.name}
                    label={bookDesc.label}
                />
            </Stack>

            <Typography variant="caption" display="block" gutterBottom>
                Errors
            </Typography>
            <pre>{JSON.stringify(meta.errors, null, 2)}</pre>
            <Typography variant="caption" display="block" gutterBottom>
                Values
            </Typography>
            <pre>{JSON.stringify(meta.values, null, 2)}</pre>
        </Paper>
    );
}