import { Button, Stack, TextField, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { useFetchStudySet } from "../hooks/useFetchStudySet";
import { useTranslation } from "react-i18next";

export default function StudySetDetailsPage() {
    const navigate = useNavigate();
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySet, isLoading: studySetLoading } = useFetchStudySet(studySetId ?? "0");
    const { t } = useTranslation();

    if (studySetLoading) {
        return <Typography>{t("loading")}</Typography>;
    }

    if (!studySet) {
        return <Typography>{t("study_set_not_found")}</Typography>;
    }

    console.log("Study set details", studySet);
    return (
        <Stack>
            <Typography variant="h6" fontWeight={600} component="h1" gutterBottom>
                Study set {studySet.name}
            </Typography>
            <Stack direction="row" gap="1rem">
                <Button onClick={() => navigate("/flashcard-mode/" + studySetId)}>{t("flashcard_mode")}</Button>
                <Button onClick={() => navigate("/learn-mode/" + studySetId)}>{t("learn_mode")}</Button>
                <Button onClick={() => navigate("/match-mode/" + studySetId)}>{t("match_mode")}</Button>
                <Button onClick={() => navigate("/quiz-mode/" + studySetId)}>{t("quiz_mode")}</Button>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginTop: '1rem' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    {t("front")}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                    {t("back")}
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
            <Button
                variant="contained"
                sx={{
                    maxWidth: '150px',
                    fontSize: '0.75rem',
                }}
                onClick={() => navigate("/flashcards/edit/" + studySetId)}
                startIcon={<IconEdit size={18} />}
                size="small"
            >
                {t("edit_set")}
            </Button>
        </Stack>
    );
}