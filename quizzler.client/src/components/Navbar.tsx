import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <AppBar 
            position="fixed" 
            elevation={0}
            sx={{
                backgroundColor: 'white',
                borderBottom: '1px solid #e0e0e0',
                color: 'text.primary'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row">
                    <Button onClick={() => navigate("/")}>
                        <Typography variant="h5" fontWeight={600}>
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
            </Toolbar>
        </AppBar>
    )
}