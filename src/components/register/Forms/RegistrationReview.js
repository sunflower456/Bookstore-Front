import {Grid, Typography} from '@material-ui/core';
import {useFormikContext} from 'formik';

export default function RegistrationReview() {
    const { values: formValues } = useFormikContext();
    const {
        id,
        password,
        passwordCheck,
        memberName,
        phone,
        email,
        bankName,
        accountOwner,
        accountNumber
    } = formValues;

    /**
     *
     * @param phone{string} 전화번호 11자리 또는 10자리
     * @returns {string} 대시(-)를 붙인 전화번호
     */
    function replacePhoneNumber(phone) {
        let length = phone.length;
        // console.log(`값이 나오는지 확인 : ${phone}`);
        let result = "";

        if (length === 10) {
            result = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if (length === 11) {
            result = phone.replace(/-|_/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }

        return result;
    }
    const phoneNumber = replacePhoneNumber(phone);

    return (
        <Grid container rowGap={2}>
            <Typography variant={'h6'}>회원정보</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>아이디 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{id}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>이름 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{memberName}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>이메일 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{email}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>전화번호 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{phoneNumber}</Typography>
                </Grid>
            </Grid>
            <Typography variant={'h6'}>계좌정보</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>은행 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{bankName}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>예금주 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{accountOwner}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>계좌번호 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{accountNumber}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}