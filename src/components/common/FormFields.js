import React, { useEffect, useState } from "react";
import {
    Box,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/styles";

import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
    thumbsContainer: {
        marginTop: theme.spacing(2)
    },

    thumb: {
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box"
    },
    thumbInner: {
        display: "flex",
        minWidth: 0,
        overflow: "hidden"
    },

    img: {
        display: "block",
        width: "auto",
        height: "100%"
    },

    customError: {
        color: theme.palette.error.main,
        fontWeight: "bold"
    }
}));

function InputField(props) {
    const { ...rest } = props;
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
    const { ...rest } = props;
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

function SelectField(props) {
    const { label, data, ...rest } = props;
    const [field, meta] = useField(props);
    const { value: selectedValue } = field;

    function _renderHelperText() {
        if (!(meta.touched && meta.error)) {
            // 에러가 발생하지 않은 경우에는 동작하지 않음.
        }
        return <FormHelperText>{meta.touched && meta.error}</FormHelperText>;
    }

    return (
        <FormControl {...rest} error={Boolean(meta.touched && meta.error)}>
            <InputLabel>{label}</InputLabel>
            <Select {...field} value={selectedValue || ""}>
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
    const { errorText, ...rest } = props;
    const [field, meta] = useField(props);
    const classes = useStyles();
    const [files, setFiles] = useState([]);

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
        useDropzone({
            accept: "image/*",
            onDrop: (pushedAcceptedFiles) => {
                if (field.value.length > 0) {
                    field.value.splice(0, field.value.length);
                }
                setFiles(
                    pushedAcceptedFiles.map((file) => {
                        field.value.push(file);
                        return Object.assign(file, {
                            preview: URL.createObjectURL(file),
                            value: file.path
                        });
                    })
                );
            },
            maxFiles: 5
        });

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            // files.forEach((file) => URL.revokeObjectURL(file.preview));
            meta.value.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [
            // files,
            meta.value
        ]
    );

    return (
        <>
            <section className={"container"}>
                <Box
                    {...getRootProps()}
                    sx={{
                        p: 2,
                        border: "1px dashed gray",
                        textAlign: "center"
                    }}
                    {...field}
                    {...rest}
                >
                    <input {...getInputProps()} />
                    <Typography component={"p"} variant={"subtitle1"}>
                        책 상태를 확인할 수 있는 사진을 업로드해주세요.
                    </Typography>
                    <Typography component={"em"} variant={"subtitle2"}>
                        (클릭 또는 드래그로 최대 5장의 사진까지 업로드
                        가능합니다.)
                    </Typography>
                </Box>
                <Stack
                    className={classes.thumbsContainer}
                    component={"aside"}
                    direction={"row"}
                    spacing={2}
                    justifyContent={"center"}
                >
                    {files.map((file) => {
                        const currentDate = new Date();

                        return (
                            <Box
                                className={classes.thumb}
                                key={`${
                                    file.name
                                }_${currentDate.getMilliseconds()}`}
                            >
                                <div className={classes.thumbInner}>
                                    <img
                                        className={classes.img}
                                        src={file.preview}
                                        alt={`upload_image_${file.name}`}
                                    />
                                </div>
                            </Box>
                        );
                    })}
                </Stack>
            </section>
        </>
    );
}

export { InputField, PhoneNumberField, SelectField, ImageUploadField };
