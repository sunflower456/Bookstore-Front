import React, { useState } from "react";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
// material
import { styled, alpha } from "@material-ui/core/styles";
import { Box, Input, Button, InputAdornment } from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled("div")(({ theme }) => ({
    top: 0,
    left: 0,
    zIndex: 99,
    width: "100%",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    height: APPBAR_MOBILE,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    padding: theme.spacing(0, 3),
    boxShadow: theme.customShadows.z8,
    backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
    [theme.breakpoints.up("md")]: {
        height: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));

// ----------------------------------------------------------------------

export default function Searchbar({ onChange, onClick }) {
    const [age, setAge] = React.useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleInputChangeChild = (event) => {
        onChange(event.target.value);
    };

    const handleInputClickChild = () => {
        onClick();
    };

    const handleInputKeyPress = (e) => {
        if (e.key === "Enter") {
            onClick();
        }
    };

    return (
        <div>
            <FormControl style={{ marginRight: "30px" }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                    defaultValue={10}
                    style={{ paddingRight: "30px" }}
                >
                    <MenuItem value={10}>제목</MenuItem>
                    <MenuItem value={20}>저자명</MenuItem>
                    <MenuItem value={30}>출판사</MenuItem>
                </Select>
            </FormControl>
            <Input
                autoFocus
                fullWidth
                disableUnderline
                placeholder="검색"
                onKeyPress={handleInputKeyPress}
                startAdornment={
                    <InputAdornment position="start">
                        <Box
                            component={Icon}
                            icon={searchFill}
                            sx={{
                                color: "text.disabled",
                                width: 20,
                                height: 20
                            }}
                        />
                    </InputAdornment>
                }
                onChange={handleInputChangeChild}
                sx={{ mr: 1, fontWeight: "fontWeightBold" }}
                style={{ width: "70%", paddingTop: "8px" }}
            ></Input>
            <Button
                variant="contained"
                style={{ float: "right" }}
                size="large"
                onClick={handleInputClickChild}
            >
                검색
            </Button>
        </div>
    );
}
