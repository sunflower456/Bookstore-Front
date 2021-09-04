import React from 'react';
import {
    Divider,
    FormControl,
    FormHelperText,
    FormLabel, Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from '@material-ui/core';
import {Field, useFormikContext} from 'formik'
// components
import {ImageUploadField, InputField, SelectField} from '../../common/FormFields'
// styles
import UseStyles from '../styles';
import palette from '../../../theme/palette';

const banks = [
    {
        value: '국민은행',
        label: '국민은행'
    },
    {
        value: '우리은행',
        label: '우리은행'
    },
    {
        value: '하나은행',
        label: '하나은행'
    },
    {
        value: '신한은행',
        label: '신한은행'
    }
];

export default function PostForm(props) {
    const classes = UseStyles();

    const {
        formField: {
            price,
            description,
            bookStatus,
            bookPhoto,
            accountBank,
            accountNumber,
            accountOwner
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
                        name={price.name}
                        label={price.label}
                        placeholder={price.placeMsg}
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
                    name={description.name}
                    label={description.label}
                />

                <Divider orientation="horizontal" flexItem/>
                <Grid container rowGap={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant={'h6'}>
                            계좌정보
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{pr:2}}>
                        <SelectField
                            fullWidth
                            name={accountBank.name}
                            label={accountBank.label}
                            data={banks}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <InputField
                            fullWidth
                            name={accountOwner.name}
                            label={accountOwner.label}
                            placeholder={accountOwner.placeMsg}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <InputField
                            fullWidth
                            name={accountNumber.name}
                            label={accountNumber.label}
                            placeholder={accountNumber.placeMsg}
                        />
                    </Grid>
                </Grid>
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