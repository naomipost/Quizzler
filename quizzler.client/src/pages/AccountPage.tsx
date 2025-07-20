import { Button, Stack, Typography } from "@mui/material";
import type { User } from "../types/User";
import useLogout from "../hooks/useLogout";

type Props = {
    user: User
}

export default function AccountPage(props: Props) {
    const { mutate: logout } = useLogout();

    return (
        <Stack sx={{ padding: '1rem', gap: '0.5rem' }}>
            <Typography>
                Welcome, {props.user.username}
            </Typography>
            <Button
                variant="contained"
                onClick={() => logout()}
            >
                Logout
            </Button>
        </Stack>
    )
}