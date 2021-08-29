import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    Typography
} from "@material-ui/core";
import { useStyle } from "./styles";
import FormInitialValues from "./FormModel/formInitialValues";

export default function AccountsInfo() {
    const classes = useStyle();
    const { bankName, bankAccountOwner, bankAccountNumber } = FormInitialValues;

    return (
        <Card className={classes.cardArea}>
            <CardHeader
                title={<Typography variant={"h4"}>계좌정보</Typography>}
                subheader={
                    <Typography variant={"body2"}>
                        등록한 계좌를 관리할 수 있습니다.
                    </Typography>
                }
            />
            <Divider variant={"middle"} />
            <CardContent>
                <Stack direction={"row"} columnGap={5}>
                    <Card>계좌</Card>
                    <Card>계좌</Card>
                    <Card>계좌</Card>
                </Stack>
            </CardContent>
        </Card>
    );
}
