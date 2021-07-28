import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
// images
import storeLogo from '../static/images/store_logo_blue.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={storeLogo} sx={{ width: 100, height: 100, ...sx }} />;
}
