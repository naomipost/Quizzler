import { Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import type { StudySet } from "../types/StudySet";

type Props = {
    studySets: StudySet[]
}

export default function HomePage(props: Props) {
    const navigate = useNavigate();
    
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
                                <TableCell>naomi</TableCell>
                                <TableCell>June 27</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}