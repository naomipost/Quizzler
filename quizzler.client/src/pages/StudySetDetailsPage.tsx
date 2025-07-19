import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useFetchAllStudySets } from "../hooks/useFetchAllStudySets";

export default function StudySetDetailsPage() {
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySets = [], isLoading: studySetsLoading } = useFetchAllStudySets();
    const studySet = studySets.find(set => set.id === parseInt(studySetId ?? "0"));
    
    if (studySetsLoading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Stack>
            <Typography>
                Study set {studySet?.name}
            </Typography>
        </Stack>
    );
}