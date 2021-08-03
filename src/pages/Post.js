// material
import {styled} from '@material-ui/core/styles';
import {Button, Container, Paper, Stack, Typography} from '@material-ui/core';
// layouts
// components
import Page from '../components/Page';
import palette from '../theme/palette';
// icons
import {ArrowBackRounded} from '@material-ui/icons'
import PostRegister from '../components/posts/PostRegister';
import {Link} from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        marginTop: theme.spacing(10),
        alignItems: 'center'
    }
}));

const ContentStyle = styled(Paper)(({theme}) => ({
    variant: 'elevation',
    elevation: 6,
    width: '100%',
    minHeight: '100vh',
    margin: theme.spacing(10, 4),
    padding: theme.spacing(4)
}));

// ----------------------------------------------------------------------

export default function Register() {
    return (
        <RootStyle title="판매글 등록 | Herb Book Store">
            <Container maxWidth={'md'}>
                <Stack spacing={2}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <div>
                            <Typography variant={'h3'}>판매글 등록</Typography>
                            <Typography variant={'subtitle2'} component={'abbr'} color={palette.grey[600]}>책 제목, 저자,
                                ISBN을 통해 검색하여 판매할 책 정보를 입력할 수 있습니다.</Typography>
                        </div>
                        <div>
                            <Button
                                type={'button'}
                                variant={'contained'}
                                color={'secondary'}
                                startIcon={<ArrowBackRounded/>}
                                to="/products/search"
                                component={Link}
                            > 목록으로 </Button>
                        </div>
                    </Stack>
                    <ContentStyle variant={'elevation'} component={'div'} elevation={6}>
                        <PostRegister/>
                    </ContentStyle>
                </Stack>
            </Container>
        </RootStyle>
    );
}
