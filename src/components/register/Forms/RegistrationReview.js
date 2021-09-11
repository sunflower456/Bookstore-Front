import { Grid, Typography } from "@material-ui/core";
import { useFormikContext } from "formik";

export default function RegistrationReview() {
    const { values: formValues } = useFormikContext();
    const { identity, password, passwordCheck, name, email, phoneNumber } =
        formValues;

    /**
     * @param thisPhoneNumber{string} 전화번호 11자리 또는 10자리
     * @returns {string} 대시(-)를 붙인 전화번호
     */
    function replacePhoneNumber(thisPhoneNumber) {
        const length = thisPhoneNumber.length;
        let result = "";

        if (length === 10) {
            result = thisPhoneNumber.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "$1-$2-$3"
            );
        } else if (length === 11) {
            result = thisPhoneNumber
                .replace(/-|_/g, "")
                .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        }

        return result;
    }

    const replacedPhoneNum = replacePhoneNumber(phoneNumber);

    return (
        <Grid container rowGap={2}>
            <Typography variant={"h6"}>회원정보</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>아이디 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{identity}</Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <Typography>이름 : </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{name}</Typography>
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
                    <Typography>{replacedPhoneNum}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
