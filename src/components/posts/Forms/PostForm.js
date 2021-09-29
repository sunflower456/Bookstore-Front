import React, { useEffect, useState } from "react";
import {
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@material-ui/core";
import { Field, useFormikContext } from "formik";
// components
import { ImageUploadField, InputField } from "../../common/FormFields";
// styles
import UseStyles from "../styles";
import palette from "../../../theme/palette";

export default function PostForm(props) {
    const classes = UseStyles();

    const {
        formField: { price, description, bookStatus, bookPhoto }
    } = props;

    const {
        values,
        errors,
        touched,
        isSubmitting,
        submitCount,
        isValid,
        isValidating
    } = useFormikContext();

    // 이미지 업로드 시 업로드 대상 이미지 갱신
    useEffect(() => {
        // 이전으로 넘어간 상태에서 다음으로 이동 시
        // 이전 입력 화면은 통과 가능 상태 (isValid = true) 이며
        // form 전체가 유효한 상태는 아님 (isvalidating = false)
        if (isValid && !isValidating) {
            values.bookPhoto = [];
        }
    }, [submitCount]);

    return (
        <Paper className={classes.formArea} elevation={6}>
            <Stack direction={"column"} spacing={2}>
                <Grid container alignItems={"flex-start"}>
                    <Grid item xs>
                        <Typography variant={"h6"}>책 상태 (사진)</Typography>
                    </Grid>
                    <Grid item xs={3} textAlign={"right"}>
                        {values.bookPhoto.length <= 0 && touched.bookPhoto && (
                            <FormHelperText error={Boolean(errors.bookPhoto)}>
                                {errors.bookPhoto}
                            </FormHelperText>
                        )}
                    </Grid>
                </Grid>
                <div>
                    <ImageUploadField name={bookPhoto.name} />
                </div>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <InputField
                        fullWidth
                        type={"number"}
                        name={price.name}
                        label={price.label}
                        placeholder={price.placeMsg}
                    />
                    <FormControl fullWidth component="fieldset" sx={{ pl: 6 }}>
                        <FormLabel component="legend">
                            {bookStatus.label}
                        </FormLabel>
                        <RadioGroup row>
                            <label>
                                최상
                                <Field
                                    name={bookStatus.name}
                                    value="BEST"
                                    as={Radio}
                                    sx={{
                                        color: palette.success.light,
                                        "&.Mui-checked": {
                                            color: palette.success.main
                                        }
                                    }}
                                />
                            </label>
                            <label>
                                상
                                <Field
                                    name={bookStatus.name}
                                    value="UPPER"
                                    as={Radio}
                                    sx={{
                                        color: palette.info.light,
                                        "&.Mui-checked": {
                                            color: palette.info.main
                                        }
                                    }}
                                />
                            </label>
                            <label>
                                중
                                <Field
                                    name={bookStatus.name}
                                    value="MIDDLE"
                                    as={Radio}
                                    sx={{
                                        color: palette.warning.light,
                                        "&.Mui-checked": {
                                            color: palette.warning.main
                                        }
                                    }}
                                />
                            </label>
                            <label>
                                하
                                <Field
                                    name={bookStatus.name}
                                    value="LOWER"
                                    as={Radio}
                                    sx={{
                                        color: palette.error.light,
                                        "&.Mui-checked": {
                                            color: palette.error.main
                                        }
                                    }}
                                />
                            </label>
                        </RadioGroup>
                        <FormHelperText error={Boolean(errors.bookStatus)}>
                            {errors.bookStatus}
                        </FormHelperText>
                    </FormControl>
                </Stack>

                <InputField
                    multiline
                    maxRows={4}
                    name={description.name}
                    label={description.label}
                />
            </Stack>
        </Paper>
    );
}
