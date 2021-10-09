import Cookies from "js-cookie";

const isLogin = () => !!Cookies.get("accessToken");

export default isLogin;
