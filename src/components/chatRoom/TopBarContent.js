import {
    AccordionSummary,
    Avatar,
    Box,
    IconButton,
    ListItemIcon,
    Tooltip,
    Typography
} from "@material-ui/core";

import { styled } from "@material-ui/core/styles";
import { formatDistance, subMinutes } from "date-fns";
import InfoTwoToneIcon from "@material-ui/icons/InfoTwoTone";

const RootWrapper = styled(Box)(
    ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

function TopBarContent() {
    return (
        <>
            <RootWrapper>
                <Box sx={{ display: { sm: "flex" } }} alignItems="center">
                    <Avatar
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                        alt="Zain Baptista"
                        src="/static/images/avatars/2.jpg"
                    />
                    <Box sx={{ pl: { sm: 1.5 }, pt: { xs: 1.5, sm: 0 } }}>
                        <Typography variant="h4" gutterBottom>
                            Zain Baptista
                        </Typography>
                        <Typography variant="subtitle2">
                            {formatDistance(
                                subMinutes(new Date(), 8),
                                new Date(),
                                {
                                    addSuffix: true
                                }
                            )}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: { xs: 3, md: 0 }
                    }}
                >
                    <Tooltip placement="bottom" title="부가정보">
                        <IconButton color="primary">
                            <InfoTwoToneIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </RootWrapper>
        </>
    );
}

export default TopBarContent;
