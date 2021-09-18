import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import { exact } from "prop-types";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
    {
        title: "내 정보",
        path: "/myPage",
        icon: getIcon(peopleFill)
    },
    {
        title: "내 관심목록",
        path: "/favorites",
        icon: getIcon(shoppingBagFill)
    },
    {
        title: "내 판매글",
        path: "/sales",
        icon: getIcon(fileTextFill)
    }
];

export default sidebarConfig;
