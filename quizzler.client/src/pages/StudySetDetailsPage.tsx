import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useFetchStudySet } from "../hooks/useFetchStudySet";

export default function StudySetDetailsPage() {
    const navigate = useNavigate();
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySet, isLoading: studySetLoading } = useFetchStudySet(studySetId ?? "0");

    if (studySetLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (!studySet) {
        return <Typography>Study set not found</Typography>;
    }

    console.log("Study set details", studySet);
    return (
        <Stack>
            <Typography variant="h6" fontWeight={600} component="h1" gutterBottom>
                Study set {studySet.name}
            </Typography>
            <Stack direction="row" gap="1rem">
                <Button onClick={() => navigate("/flashcard-mode/" + studySetId)}>Flashcard mode</Button>
                <Button onClick={() => navigate("/learn-mode/" + studySetId)}>Learn mode</Button>
                <Button onClick={() => navigate("/match-mode/" + studySetId)}>Match mode</Button>
                <Button onClick={() => navigate("/quiz-mode/" + studySetId)}>Quiz mode</Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginTop: '1rem' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    Front
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                    Back
                </Typography>
            </Stack>
            {studySet.flashcards.map((flashcard, index) => {
                return (
                    <Stack key={index}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        padding="0.25rem"
                        gap="1rem"
                    >
                        <TextField disabled variant="outlined" value={flashcard.front} />
                        <TextField disabled variant="outlined" value={flashcard.back} />
                    </Stack>
                );
            })}
        </Stack>
    );
}