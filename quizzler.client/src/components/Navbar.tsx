import { AppBar, Button, IconButton, Popover, Stack, Toolbar, Typography } from "@mui/material";
import { IconWorld } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const { i18n, t } = useTranslation();

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
                <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                    <Stack direction="row">
                        <Button onClick={() => navigate("/")}>
                            <Typography variant="h5" fontWeight={600}>
                                Quizzler
                            </Typography>
                        </Button>
                        {user && (
                            <Button onClick={() => navigate("/create-set")}>
                                {t("create_a_set")}
                            </Button>
                        )}
                        {user && (
                            <Button onClick={() => navigate("/account")}>
                                {t("account")}
                            </Button>
                        )}
                    </Stack>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <IconWorld />
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Stack direction="column" sx={{ padding: 2 }}>
                            <Button onClick={() => {
                                i18n.changeLanguage("en");
                                setAnchorEl(null);
                            }}>
                                English
                            </Button>
                            <Button onClick={() => {
                                i18n.changeLanguage("es-NI");
                                setAnchorEl(null);
                            }}>
                                Español
                            </Button>
                            <Button onClick={() => {
                                i18n.changeLanguage("pt-BR");
                                setAnchorEl(null);
                            }}>
                                Português
                            </Button>
                        </Stack>
                    </Popover>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}