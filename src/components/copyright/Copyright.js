import {Box, Typography} from '@material-ui/core';
import React from 'react';

function Copyright(){
    return (
        <Box mt={8}>
            <Typography variant='body2' color='textPrimary' align='center'>
                {'Copyright © '}
                <a color='inherit' href='https://github.com/TeamHerb'>
                    Team Herb
                </a>
                {' / '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}

export default Copyright;