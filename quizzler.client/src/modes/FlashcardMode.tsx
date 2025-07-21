import { Button, Stack, Tooltip, Typography } from "@mui/material";
import { IconArrowBack, IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowsShuffle, IconRefresh } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import Flashcard from "../components/Flashcard";
import { useFetchStudySet } from "../hooks/useFetchStudySet";
import { useState } from "react";
import { useTranslation } from "react-i18next";

//TODO: add shuffle functionality instead of randomizing once on
//      clicking the shuffle icon and the next button still going to
//      the next card in the unshuffled array
export default function FlashcardMode() {
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySet, isLoading: studySetLoading } = useFetchStudySet(studySetId ?? "0");
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();
    if (studySetLoading) {
        return <Typography>{t("loading")}</Typography>;
    }
    if (!studySet) {
        return <Typography>{t("study_set_not_found")}</Typography>;
    }
    return (
        <Stack
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            gap="0.5rem"
        >
            <Button
                variant="contained"
                onClick={() => navigate("/studysets/" + studySetId)}
                startIcon={<IconArrowBack size={18}/>}
                size="small"
                sx={{
                    fontSize: "0.75rem",
                }}
            >
                {t("back_to_study_set")}
            </Button>
            <Typography variant="h6" fontWeight={600} component="h1" gutterBottom>
                {t("flashcard_mode")} {t("for")} {studySet.name}
            </Typography>
            <Flashcard flashcard={studySet.flashcards[currentCardIndex]} />
            <Stack direction="row" justifyContent="space-between" width="100%" gap="0.5rem">
                <Tooltip title={t("start_from_beginning")} placement="top">
                    <IconRefresh
                        onClick={() => setCurrentCardIndex(0)}
                    />
                </Tooltip>
                <Tooltip title={t("shuffle_flashcards")} placement="top">
                    <IconArrowsShuffle
                        onClick={() => setCurrentCardIndex(Math.floor(Math.random() * studySet.flashcards.length))}
                    />
                </Tooltip>
                <Stack direction="row" justifyContent="right" width="100%">
                    <Tooltip title={t("previous_flashcard")} placement="top">
                        <IconArrowNarrowLeft
                            onClick={() => setCurrentCardIndex((prev) => Math.max(prev - 1, 0))}
                        />
                    </Tooltip>
                    <Tooltip title={t("next_flashcard")} placement="top">
                        <IconArrowNarrowRight
                            onClick={() => setCurrentCardIndex((prev) => Math.min(prev + 1, studySet.flashcards.length - 1))}
                        />
                    </Tooltip>
                </Stack>
            </Stack>
        </Stack>
    );
}