import React from 'react';
import {Stack} from '@material-ui/core';
// components
import {InputField} from '../../common/FormFields'
// icons

export default function PostForm(props) {

    const {
        formField: {
            bookPhoto,
            bookStatus,
            bookDesc
        }
    } = props;

    return (
        <Stack direction={'column'} spacing={2}>
            <div>
                책 사진 등록 영역
            </div>
            <div>
                책 상태 선택 영역
            </div>

            <InputField
                multiline
                maxRows={4}
                name={bookDesc.name}
                label={bookDesc.label}
            />
        </Stack>
    )
        ;
}