import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { IconButton, InputAdornment, Stack, SvgIcon } from "@material-ui/core";
import { InputField, PhoneNumberField } from "../../common/FormFields";

export default function MemberForm(props) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        formField: {
            identity,
            password,
            passwordCheck,
            name,
            email,
            phoneNumber
        }
    } = props;

    return (
        <Stack spacing={2}>
            <InputField
                fullWidth
                name={identity.name}
                label={identity.label}
                placeholder={identity.placeMsg}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <InputField
                    fullWidth
                    name={password.name}
                    label={password.label}
                    placeholder={password.placeMsg}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    <SvgIcon
                                        color={"disabled"}
                                        component={
                                            showPassword
                                                ? Visibility
                                                : VisibilityOff
                                        }
                                    />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <InputField
                    fullWidth
                    name={passwordCheck.name}
                    label={passwordCheck.label}
                    placeholder={passwordCheck.placeMsg}
                    type="password"
                />
            </Stack>
            <InputField
                fullWidth
                name={name.name}
                label={name.label}
                placeholder={name.placeMsg}
                autoComplete="memberName"
            />
            <InputField
                fullWidth
                name={email.name}
                label={email.label}
                placeholder={email.placeMsg}
                autoComplete="email"
            />
            <PhoneNumberField
                fullWidth
                name={phoneNumber.name}
                label={phoneNumber.label}
                placeholder={phoneNumber.placeMsg}
                autoComplete="phoneNumber"
            />
        </Stack>
    );
}
