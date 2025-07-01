import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <Stack gap={1}>
            <Typography>
                Login
            </Typography>
            <TextField label="username"/>
            <TextField label="password"/>
            <Typography variant="body2">
                Don't have an account? {' '}
                <Link 
                    component="button" 
                    onClick={() => navigate('/signup')}
                    underline="hover"
                >
                    Sign up
                </Link>
            </Typography>
            <Button variant="contained">
                Log in
            </Button>
        </Stack>
    )
}