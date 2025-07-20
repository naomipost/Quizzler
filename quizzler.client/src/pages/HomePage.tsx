import { Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import type { StudySet } from "../types/StudySet";
import { useFetchAllUsers } from "../hooks/useFetchAllUsers";

type Props = {
    studySets: StudySet[]
}

export default function HomePage(props: Props) {
    const navigate = useNavigate();
    const { data: users = [], isLoading: isLoadingUsers } = useFetchAllUsers();

    if (isLoadingUsers) {
        return <Typography>Loading users...</Typography>;
    }

    return (
        <Stack sx={{ padding: '1rem', gap: '0.5rem' }}>
            <Typography>
                Ready to learn?
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Set name</TableCell>
                            <TableCell>Set owner</TableCell>
                            <TableCell>Date created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.studySets.map(set => (
                            <TableRow key={set.id}>
                                <TableCell>
                                    <Link
                                        component="button"
                                        onClick={() => navigate(`/studysets/${set.id}`)}
                                        underline="hover"
                                    >
                                        {set.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{users.find(user => user.id === set.userId)?.username}</TableCell>
                                {/** TODO: date in local time instead of UTC */}
                                <TableCell>{new Date(set.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}