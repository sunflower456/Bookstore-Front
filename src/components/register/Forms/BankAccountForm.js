import {Grid} from '@material-ui/core';
import {InputField, SelectField} from '../../common/FormFields';
import React from 'react';

const banks = [
    {
        value: undefined,
        label: '선택없음'
    },
    {
        value: 'K',
        label: '국민은행'
    },
    {
        value: 'U',
        label: '우리은행'
    },
    {
        value: 'H',
        label: '하나은행'
    },
    {
        value: 'S',
        label: '신한은행'
    }
];

export default function BankAccountForm(props) {
    const {
        formField: {
            bankName,
            bankAccountOwner,
            bankAccountNumber
        }
    } = props;

    return (
        <Grid container rowGap={2}>
            <Grid item xs={12} sm={3} sx={{pr:2}}>
                <SelectField
                    fullWidth
                    name={bankName.name}
                    label={bankName.label}
                    data={banks}
                />
            </Grid>
            <Grid item xs={12} sm={9}>
                <InputField
                    fullWidth
                    name={bankAccountOwner.name}
                    label={bankAccountOwner.label}
                    placeholder={bankAccountOwner.placeMsg}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputField
                    fullWidth
                    name={bankAccountNumber.name}
                    label={bankAccountNumber.label}
                    placeholder={bankAccountNumber.placeMsg}
                />
            </Grid>
        </Grid>
    );
}