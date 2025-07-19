import { Stack, Typography } from "@mui/material";
import type { User } from "../types/User";

type Props = {
    user: User
}

export default function AccountPage(props: Props) {
    return (
        <Stack sx={{ padding: '1rem', gap: '0.5rem' }}>
            <Typography>
                Welcome, {props.user.username}
            </Typography>
        </Stack>
    )
}