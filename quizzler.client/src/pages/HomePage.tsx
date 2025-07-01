import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import type { StudySet } from "../types/StudySet";

type Props = {
    studySets: StudySet[]
}

export default function HomePage(props: Props) {
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
                            <TableRow>
                                <TableCell>{set.name}</TableCell>
                                <TableCell>npost3</TableCell>
                                <TableCell>June 27</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}