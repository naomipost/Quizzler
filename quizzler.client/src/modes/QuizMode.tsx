import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useFetchStudySet } from "../hooks/useFetchStudySet";

export default function QuizMode() {
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySet, isLoading: studySetLoading } = useFetchStudySet(studySetId ?? "0");
    if (studySetLoading) {
        return <Typography>Loading...</Typography>;
    }
    if(!studySet) {
        return <Typography>Study set not found</Typography>;
    }
    return (
        <Stack>
            <Typography variant="h6" fontWeight={600} component="h1" gutterBottom>
                Quiz Mode for {studySet.name}
            </Typography>
        </Stack>
    );
}