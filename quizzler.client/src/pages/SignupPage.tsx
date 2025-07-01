import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router';

export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <Stack gap={1}>
            <Typography>
                Sign up
            </Typography>
            <TextField label="username"/>
            <TextField label="email"/>
            <TextField label="password"/>
            <Typography variant="body2">
                Already have an account? {' '}
                <Link 
                    component="button" 
                    onClick={() => navigate('/login')}
                    underline="hover"
                >
                    Login
                </Link>
            </Typography>
            <Button variant="contained">
                Sign up
            </Button>
        </Stack>
    )
}