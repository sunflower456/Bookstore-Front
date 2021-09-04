import {Card, CardContent, CardHeader, Divider, Stack, Typography} from '@material-ui/core';
import {useStyle} from './styles';
import FormInitialValues from './FormModel/formInitialValues';
import ReactBankCard from 'react-bank-card';

export default function AccountsInfo() {
    const classes = useStyle();
    const {
        bankName,
        bankAccountOwner,
        bankAccountNumber,
    } = FormInitialValues;

    return (
        <Card className={classes.cardArea}>
            <CardHeader
                title={<Typography variant={'h4'}>계좌정보</Typography>}
                subheader={<Typography variant={'body2'}>등록한 계좌를 관리할 수 있습니다.</Typography>}
            />
            <Divider variant={'middle'}/>
            <CardContent>
                <Stack direction={'row'} columnGap={5}>
                    <ReactBankCard
                        cvc="123"
                        number="1234123412341234"
                        name="계좌1"

                        highlighted={{
                            number: true,
                            name: false,
                            cvc: true,
                            expiryMonth: false,
                            expiryYear: false,
                        }}
                    />
                    <ReactBankCard
                        cvc="123"
                        number="1234123412341234"
                        name="계좌1"

                        highlighted={{
                            number: true,
                            name: false,
                            cvc: true,
                            expiryMonth: false,
                            expiryYear: false,
                        }}
                    />
                    <ReactBankCard
                        cvc="123"
                        number="1234123412341234"
                        name="계좌1"

                        highlighted={{
                            number: true,
                            name: false,
                            cvc: true,
                            expiryMonth: false,
                            expiryYear: false,
                        }}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
}