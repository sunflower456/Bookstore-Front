import React, {useState} from 'react';
import {IconButton, InputAdornment, Stack, SvgIcon} from '@material-ui/core';
// components
import {InputField, PhoneNumberField} from '../../common/FormFields'
// icons
import {Visibility, VisibilityOff} from '@material-ui/icons';

export default function MemberForm(props) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        formField: {
            id,
            password,
            passwordCheck,
            memberName,
            phone,
            email
        }
    } = props;

    return (
        <Stack spacing={2}>
            <InputField
                fullWidth
                name={id.name}
                label={id.label}
                placeholder={id.placeMsg}
            />
            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                <InputField
                    fullWidth
                    name={password.name}
                    label={password.label}
                    placeholder={password.placeMsg}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton edge='end' onClick={() => setShowPassword((prev) => !prev)}>
                                    <SvgIcon color={'disabled'} component={showPassword ? Visibility : VisibilityOff}/>
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
                    type='password'
                />
            </Stack>
            <InputField
                fullWidth
                name={memberName.name}
                label={memberName.label}
                placeholder={memberName.placeMsg}
                autoComplete='memberName'
            />
            <InputField
                fullWidth
                name={email.name}
                label={email.label}
                placeholder={email.placeMsg}
                autoComplete='email'
            />
            <PhoneNumberField
                fullWidth
                name={phone.name}
                label={phone.label}
                placeholder={phone.placeMsg}
                autoComplete='phoneNumber'
            />
        </Stack>
    )
        ;
}