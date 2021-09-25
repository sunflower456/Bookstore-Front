import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
    {
        title: "내 정보",
        path: "/myPage",
        icon: getIcon(peopleFill),
        bottom: false,
        index: 1
    },
    {
        title: "내 관심목록",
        path: "/myPage/favorites",
        icon: getIcon(shoppingBagFill),
        bottom: false,
        index: 2
    },
    {
        title: "내 판매글",
        path: "/myPage/sales",
        icon: getIcon(fileTextFill),
        bottom: false,
        index: 3
    }
];

export default sidebarConfig;
