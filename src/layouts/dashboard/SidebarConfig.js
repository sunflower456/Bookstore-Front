import { Icon } from "@iconify/react";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import loginIcon from "@iconify/icons-mdi/login";
import logoutIcon from "@iconify/icons-mdi/logout";
import codeSigningService from "@iconify/icons-carbon/code-signing-service";
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
    },
    {
        title: "회원가입",
        path: "/register",
        icon: getIcon(codeSigningService),
        bottom: true,
        index: 4
    },
    {
        title: "로그인",
        path: "/login",
        icon: getIcon(loginIcon),
        bottom: true,
        index: 5
    },
    {
        title: "로그아웃",
        path: "/404",
        icon: getIcon(logoutIcon),
        bottom: true,
        index: 6
    }
];

export default sidebarConfig;
