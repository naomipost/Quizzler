import { Button, Stack, Typography } from "@mui/material";
import type { User } from "../types/User";
import useLogout from "../hooks/useLogout";
import { useTranslation } from "react-i18next";

type Props = {
    user: User
}

export default function AccountPage(props: Props) {
    const { mutate: logout } = useLogout();
    const { t } = useTranslation();

    return (
        <Stack sx={{ padding: '1rem', gap: '0.5rem' }}>
            <Typography>
                {t("welcome")}, {props.user.username}
            </Typography>
            <Button
                variant="contained"
                onClick={() => logout()}
            >
                {t("logout")}
            </Button>
        </Stack>
    )
}