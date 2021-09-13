import React, { useState } from "react";
import {
    Avatar,
    Badge,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Input,
    Typography
} from "@material-ui/core";
import {
    AddPhotoAlternateRounded,
    Close,
    Edit,
    Save
} from "@material-ui/icons";
import { useStyle } from "./styles";
import FormInitialValues from "./FormModel/formInitialValues";

export default function MemberInfo() {
    const [isEditable, setIsEditable] = useState(false);
    const classes = useStyle();

    const { id, memberName, phone, email } = FormInitialValues;

    return (
        <Card className={classes.cardArea}>
            <CardHeader
                title={<Typography variant={"h4"}>개인정보</Typography>}
                subheader={
                    <Typography variant={"body2"}>
                        회원가입 시 입력한 정보를 관리할 수 있습니다.
                    </Typography>
                }
                action={
                    <>
                        <IconButton
                            aria-label={"toggle-edit-mode"}
                            onClick={() => {
                                setIsEditable(!isEditable);
                            }}
                        >
                            {!isEditable ? <Edit /> : <Close />}
                        </IconButton>
                        {isEditable ? (
                            <IconButton aria-label={"save"}>
                                <Save />
                            </IconButton>
                        ) : (
                            <></>
                        )}
                    </>
                }
            />
            <Divider variant={"middle"} />
            <CardContent>
                <Grid container rowGap={2}>
                    <Grid
                        container
                        direction={"column"}
                        alignContent={"center"}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right"
                            }}
                            badgeContent={
                                <>
                                    <Input
                                        accept="image/*"
                                        id="icon-button-file"
                                        name="icon-button-file"
                                        type="file"
                                        sx={{ display: "none" }}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton
                                            component="span"
                                            color="primary"
                                        >
                                            <AddPhotoAlternateRounded
                                                color={"info"}
                                            />
                                        </IconButton>
                                    </label>
                                </>
                            }
                        >
                            <Avatar
                                variant={"square"}
                                sx={{ width: "65px", height: "65px" }}
                            />
                        </Badge>
                        <Typography variant={"h6"}>ID : {id}</Typography>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography>이름 : </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{memberName}</Typography>
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
                            <Typography>{phone}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
