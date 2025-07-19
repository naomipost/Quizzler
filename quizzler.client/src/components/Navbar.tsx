import { Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <Paper elevation={0} sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 999,
            width: 'stretch',
            margin: '1rem',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
        >
            <Stack direction="row">
                <Button>
                    <Typography variant="h5" fontWeight={600} onClick={() => navigate("/")}>
                        Quizzler
                    </Typography>
                </Button>
                <Button onClick={() => navigate("/create-set")}>
                    Create a set
                </Button>
                <Button onClick={() => navigate("/account")}>
                    Account
                </Button>
            </Stack>
        </Paper>
    )
}