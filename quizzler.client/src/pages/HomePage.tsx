import { Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import type { StudySet } from "../types/StudySet";
import { useFetchAllUsers } from "../hooks/useFetchAllUsers";
import { useTranslation } from "react-i18next";

type Props = {
    studySets: StudySet[]
}

export default function HomePage(props: Props) {
    const navigate = useNavigate();
    const { data: users = [], isLoading: isLoadingUsers } = useFetchAllUsers();
    const { t } = useTranslation();

    if (isLoadingUsers) {
        return <Typography>{t("loading")}</Typography>;
    }

    return (
        <Stack sx={{ padding: '1rem', gap: '0.5rem' }}>
            <Typography>
                {t("ready_to_learn")}
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("set_name")}</TableCell>
                            <TableCell>{t("set_owner")}</TableCell>
                            <TableCell>{t("date_created")}</TableCell>
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