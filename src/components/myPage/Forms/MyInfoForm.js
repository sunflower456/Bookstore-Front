import React from "react";
import { Stack } from "@material-ui/core";
import { InputField, PhoneNumberField } from "../../common/FormFields";

export default function MyInfoForm(props) {
    const {
        formField: { name, phoneNumber, email },
        information: {
            name: currentName,
            email: currentEmail,
            phoneNumber: currentPhoneNumber
        }
    } = props;

    return (
        <Stack
            spacing={{ xs: 1, sm: 2, md: 6 }}
            direction={{ xs: "column", sm: "row" }}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <InputField
                fullWidth
                name={name.name}
                label={name.label}
                placeholder={currentName}
                autoComplete="name"
            />
            <InputField
                fullWidth
                name={email.name}
                label={email.label}
                placeholder={currentEmail}
                autoComplete="email"
            />
            <PhoneNumberField
                fullWidth
                name={phoneNumber.name}
                label={phoneNumber.label}
                placeholder={currentPhoneNumber}
                autoComplete="phoneNumber"
            />
        </Stack>
    );
}
