import { alpha } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
    0: "#FFFFFF",
    100: "#F9FAFB",
    200: "#F4F6F8",
    300: "#DFE3E8",
    400: "#C4CDD5",
    500: "#919EAB",
    600: "#637381",
    700: "#454F5B",
    800: "#212B36",
    900: "#161C24",
    500_8: alpha("#919EAB", 0.08),
    500_12: alpha("#919EAB", 0.12),
    500_16: alpha("#919EAB", 0.16),
    500_24: alpha("#919EAB", 0.24),
    500_32: alpha("#919EAB", 0.32),
    500_48: alpha("#919EAB", 0.48),
    500_56: alpha("#919EAB", 0.56),
    500_80: alpha("#919EAB", 0.8)
};

const PRIMARY = {
    lighter: "#728CCE",
    light: "#3D6CA7",
    main: "#405F9D",
    dark: "#3C4F89",
    darker: "#00366E",
    contrastText: "#FFF"
};
const SECONDARY = {
    lighter: "#9A67EA",
    light: "#7E57C2",
    main: "#673AB7",
    dark: "#5E35B1",
    darker: "#320B86",
    contrastText: "#FFF"
};
const INFO = {
    lighter: "#D6E4FF",
    light: "#84A9FF",
    main: "#3366FF",
    dark: "#1939B7",
    darker: "#091A7A",
    contrastText: "#FFF"
};
const SUCCESS = {
    lighter: "#98EE99",
    light: "#81C784",
    main: "#66BB6A",
    dark: "#388E3C",
    darker: "#338A3E",
    contrastText: "#FFF"
};
const WARNING = {
    lighter: "#FFF7CD",
    light: "#FFE16A",
    main: "#FFC107",
    dark: "#B78103",
    darker: "#7A4F01",
    contrastText: GREY[800]
};
const ERROR = {
    lighter: "#FFE7D9",
    light: "#FFA48D",
    main: "#FF4842",
    dark: "#B72136",
    darker: "#7A0C2E",
    contrastText: "#FFF"
};

const GRADIENTS = {
    primary: createGradient(PRIMARY.light, PRIMARY.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    error: createGradient(ERROR.light, ERROR.main)
};

const palette = {
    common: { black: "#000", white: "#FFF" },
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: GREY,
    gradients: GRADIENTS,
    divider: GREY[500_24],
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: "#FFF", default: "#FFF", neutral: GREY[200] },
    action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48
    }
};

export default palette;
