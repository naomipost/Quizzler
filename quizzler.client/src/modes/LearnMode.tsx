import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useFetchStudySet } from "../hooks/useFetchStudySet";
import MultipleChoiceLearnCard from "./modules/MultipleChoiceLearnCard";

export default function LearnMode() {
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySet, isLoading: studySetLoading } = useFetchStudySet(studySetId ?? "0");
    const { t } = useTranslation();
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

    const handleNextFlashcard = () => {
        if (!studySet) return;
        setCurrentFlashcardIndex((prevIndex) => 
            (prevIndex + 1) % studySet.flashcards.length
        );
    };

    if (studySetLoading) {
        return <Typography>{t("loading")}</Typography>;
    }
    if(!studySet) {
        return <Typography>{t("study_set_not_found")}</Typography>;
    }

    const currentFlashcard = studySet.flashcards[currentFlashcardIndex];

    return (
        <Stack>
            <Typography variant="h6" fontWeight={600} component="h1" gutterBottom>
                Learn Mode for {studySet.name}
            </Typography>
            <MultipleChoiceLearnCard 
                flashcard={currentFlashcard}
                studySet={studySet} 
                onContinue={handleNextFlashcard}
            />
        </Stack>
    );
}