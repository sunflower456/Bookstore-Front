import {Grid, Typography} from '@material-ui/core';
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

export default function BankAccountAndAddressForm(props) {
    const {
        formField: {
            bankName,
            bankAccountOwner,
            bankAccountNumber,
            zipNumber,
            roadAddress,
            roadAddressDetail
        }
    } = props;

    return (

        <Grid container rowGap={2}>
            <Grid xs={12} sm={12}>
                <Typography variant={'h6'}>
                    계좌정보
                </Typography>
            </Grid>
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
            <Grid xs={12} sm={12}>
                <Typography variant={'h6'}>
                    주소
                </Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={{pr:2}}>
                <InputField
                    fullWidth
                    name={zipNumber.name}
                    label={zipNumber.label}
                />
            </Grid>
            <Grid item xs={12} sm={9}>
                <InputField
                    fullWidth
                    name={roadAddress.name}
                    label={roadAddress.label}
                    placeholder={roadAddress.placeMsg}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <InputField
                    fullWidth
                    name={roadAddressDetail.name}
                    label={roadAddressDetail.label}
                    placeholder={roadAddressDetail.placeMsg}
                />
            </Grid>
        </Grid>
    );
}