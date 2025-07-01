import { Card, Typography } from "@mui/material";
import type { User } from "../types/User";

type Props = {
    user: User
}

export default function AccountPage(props: Props) {
    return (
        <Card elevation={0} sx={{
            position: "relative",
            flex: 1,
            width: '30rem',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            gap: '0.5rem',
            height: 'calc(100vh - 15rem)'
        }}>
            <Typography>
                Welcome, {props.user.username}
            </Typography>
            
        </Card>
    )
}