import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select, Stack,
    TextField,
    Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import {makeStyles} from '@material-ui/styles';

const {useField} = require('formik');

const useStyles = makeStyles((theme) => ({
    thumbsContainer: {
        marginTop: theme.spacing(2)
    },

    thumb: {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    },
    thumbInner: {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    },

    img: {
        display: 'block',
        width: 'auto',
        height: '100%'
    },

    customError: {
        color: theme.palette.error.main,
        fontWeight: 'bold'
    }
}));


function InputField(props) {
    const {errorText, ...rest} = props;
    const [field, meta] = useField(props);

    return (
        <TextField
            type="text"
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
            {...rest}
        />
    );
}

function PhoneNumberField(props) {
    const {errorText, ...rest} = props;
    const [field, meta] = useField(props);

    // const [value, setValue] = useState('');

    // function onChangePhone(e) {
    //     let phoneNumber = e.target.value;
    //     let length = phoneNumber.length;
    //     console.log(`값이 나오는지 확인 : ${phoneNumber}`);
    //     if (length === 10) {
    //         phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    //     } else if (length === 13) {
    //         phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    //     }
    //     setValue(phoneNumber);
    // }

    return (
        <TextField
            type="text"
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            {...field}
            {...rest}
        />
    );
}

function SelectField(props) {
    const {label, data, ...rest} = props;
    const [field, meta] = useField(props);
    const {value: selectedValue} = field;

    function _renderHelperText() {
        if (meta.touched && meta.error) {
            return <FormHelperText>{meta.touched && meta.error}</FormHelperText>
        }
    }

    return (
        <FormControl
            {...rest}
            error={Boolean(meta.touched && meta.error)}
        >
            <InputLabel>{label}</InputLabel>
            <Select {...field} value={selectedValue ? selectedValue : ''}>
                {data.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
            {_renderHelperText()}
        </FormControl>
    );
}

SelectField.defaultProps = {
    data: []
};

SelectField.propTypes = {
    data: PropTypes.array.isRequired
};

function ImageUploadField(props) {
    const {errorText, ...rest} = props;
    const [field, meta] = useField(props);
    const classes = useStyles();
    const [files, setFiles] = useState([]);

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            console.log(`업로드 파일 확인 : ${acceptedFiles}`);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
            field.value = acceptedFiles;
        },
        maxFiles: 5,
    });

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    function _renderHelperText() {
        // if (meta.touched && meta.error) {
        if (fileRejections.length > 0) {
            return <FormHelperText
                className={classes.customError}
            >
                오류 : 최대 5장의 사진까지 업로드 가능합니다.</FormHelperText>
        }
    }

    return (
        <>
            <section className={'container'}>
                <Box
                    {...getRootProps()}
                    sx={{p: 2, border: '1px dashed gray', textAlign: 'center'}}
                >
                    <input {...getInputProps()}

                    />
                    <Typography component={'p'} variant={'subtitle1'}>
                        책 상태를 확인할 수 있는 사진을 업로드해주세요.
                    </Typography>
                    <Typography component={'em'} variant={'subtitle2'}>
                        (클릭 또는 드래그로 최대 5장의 사진까지 업로드 가능합니다.)
                    </Typography>
                </Box>
                <Stack
                    className={classes.thumbsContainer}
                    component={'aside'} direction={'row'} spacing={2} justifyContent={'center'}>
                    {
                        files.map(file => {
                            const currentDate = new Date();
                            return (
                                <Box className={classes.thumb} key={file.name
                                + '_' + currentDate.getMilliseconds()}>
                                    <div className={classes.thumbInner}>
                                        <img
                                            className={classes.img}
                                            src={file.preview}
                                            alt={`upload_image_${file.name}`}
                                        />
                                    </div>
                                </Box>
                            );
                        })
                    }
                </Stack>
                {_renderHelperText()}
            </section>
        </>
    );
}

export {InputField, PhoneNumberField, SelectField, ImageUploadField}
