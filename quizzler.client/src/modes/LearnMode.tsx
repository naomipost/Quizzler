import { Button, Stack, Typography } from "@mui/material";
import { IconArrowBack } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { useFetchStudySet } from "../hooks/useFetchStudySet";
import useUpdateFlashcardStrength from "../hooks/useUpdateFlashcardStrength";
import LearnModeCompleted from "./modules/LearnModeCompleted";
import MultipleChoiceLearnCard from "./modules/MultipleChoiceLearnCard";
import ShortAnswerLearnCard from "./modules/ShortAnswerLearnCard";

export default function LearnMode() {
    const { studySetId } = useParams<{ studySetId: string }>();
    const { data: studySet, isLoading: studySetLoading, refetch } = useFetchStudySet(studySetId ?? "0");
    const { t } = useTranslation();
    
    const getFirstIncompleteIndex = () => {
        if (!studySet) return 0;
        const firstIncomplete = studySet.flashcards.findIndex(fc => fc.strength < 3);
        return firstIncomplete !== -1 ? firstIncomplete : 0;
    };
    
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(() => getFirstIncompleteIndex());
    const [isRestarting, setIsRestarting] = useState(false);
    const navigate = useNavigate();
    const updateFlashcardStrengthMutation = useUpdateFlashcardStrength();

    // Update current index when study set loads to ensure we start with an incomplete flashcard
    useEffect(() => {
        if (studySet) {
            const firstIncompleteIndex = getFirstIncompleteIndex();
            setCurrentFlashcardIndex(firstIncompleteIndex);
        }
    }, [studySet]);

    const handleUpdateFlashcardStrength = (flashcardId: number, isCorrect: boolean) => {
        const flashcard = studySet?.flashcards.find(fc => fc.id === flashcardId);
        if (!flashcard) return;

        const newStrength = isCorrect 
            ? flashcard.strength + 1 
            : Math.max(0, flashcard.strength - 1);

        updateFlashcardStrengthMutation.mutate({
            flashcardId: flashcardId,
            strength: newStrength
        });
        flashcard.strength = newStrength;
    };

    const handleNextFlashcard = () => {
        //TODO: Add shuffling
        if (!studySet) return;
        
        const incompleteFlashcards = studySet.flashcards
            .map((flashcard, index) => ({ flashcard, index }))
            .filter(({ flashcard }) => flashcard.strength < 3);
        
        if (incompleteFlashcards.length === 0) {
            return;
        }
        
        const currentIncompleteIndex = incompleteFlashcards.findIndex(
            ({ index }) => index === currentFlashcardIndex
        );
        
        const nextIncompleteIndex = (currentIncompleteIndex + 1) % incompleteFlashcards.length;
        const nextFlashcardIndex = incompleteFlashcards[nextIncompleteIndex].index;
        
        setCurrentFlashcardIndex(nextFlashcardIndex);
    };

    const handleRestartLearnMode = async () => {
        setIsRestarting(true);
        setCurrentFlashcardIndex(0);
        await refetch();
        
        setIsRestarting(false);
    };

    if (studySetLoading || isRestarting) {
        return <Typography>{t("loading")}</Typography>;
    }
    if (!studySet) {
        return <Typography>{t("study_set_not_found")}</Typography>;
    }

    const currentFlashcard = studySet.flashcards[currentFlashcardIndex];

    const allFlashcardsCompleted = studySet.flashcards.every(fc => fc.strength > 2);
    if (allFlashcardsCompleted && !isRestarting) {
        return <LearnModeCompleted studySet={studySet} onRestart={handleRestartLearnMode} />;
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
                startIcon={<IconArrowBack size={18} />}
                size="small"
                sx={{
                    fontSize: "0.75rem",
                }}
            >
                {t("back_to_study_set")}
            </Button>
            <Typography variant="h6" fontWeight={600} component="h1" gutterBottom>
                Learn Mode for {studySet.name}
            </Typography>
            {currentFlashcard.strength === 0 ? (
                <MultipleChoiceLearnCard
                    flashcard={currentFlashcard}
                    studySet={studySet}
                    onContinue={handleNextFlashcard}
                    onUpdateStrength={handleUpdateFlashcardStrength}
                />
            ) : (
                <ShortAnswerLearnCard
                    flashcard={currentFlashcard}
                    studySet={studySet}
                    onContinue={handleNextFlashcard}
                    onUpdateStrength={handleUpdateFlashcardStrength}
                />
            )}
        </Stack>
    );
}