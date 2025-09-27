import { Button, Card, Stack, Typography } from "@mui/material";
import type { Flashcard } from "../../types/Flashcard";
import type { StudySet } from "../../types/StudySet";
import { generateMultipleChoiceOptions } from "../../utils/flashcardUtils";
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    flashcard: Flashcard;
    studySet: StudySet;
    onContinue: () => void;
}

export default function MultipleChoiceLearnCard(props: Props) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedAnswerCorrect, setSelectedAnswerCorrect] = useState<boolean | null>(null);
    const { t } = useTranslation();

    // Reset state when flashcard changes from parent
    useEffect(() => {
        setSelectedOption(null);
        setSelectedAnswerCorrect(null);
    }, [props.flashcard.id]);

    // Memoize the options so they don't change on re-renders
    const multipleChoiceOptions = useMemo(() => {
        return generateMultipleChoiceOptions(
            props.flashcard.back,
            props.studySet.flashcards.map(fc => fc.back)
        );
    }, [props.flashcard.back, props.studySet.flashcards]);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setSelectedAnswerCorrect(option === props.flashcard.back);
        if (option === props.flashcard.back) {
            props.flashcard.strength++;
        } else {
            props.flashcard.strength = Math.max(0, props.flashcard.strength - 1);
        }
    };

    // Memoize button colors to prevent excessive recalculation
    const buttonColors = useMemo(() => {
        const colors: Record<string, string> = {};

        multipleChoiceOptions.forEach(option => {
            // If no option selected yet, use default
            if (selectedOption === null) {
                colors[option] = 'inherit';
                return;
            }

            // If this is the selected option (correct or wrong)
            if (selectedOption === option) {
                colors[option] = option === props.flashcard.back ? '#4caf50' : '#f44336';
                return;
            }

            // If wrong answer was selected AND this is the correct answer, show it in green
            if (selectedAnswerCorrect === false && option === props.flashcard.back) {
                colors[option] = '#4caf50'; // Show correct answer when wrong one was selected
                return;
            }

            // Default for unselected options
            colors[option] = 'inherit';
        });

        return colors;
    }, [selectedOption, selectedAnswerCorrect, multipleChoiceOptions, props.flashcard.back]);

    return (
        <Card
            sx={{
                minWidth: 600,
                minHeight: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                perspective: "1000px",
                position: "relative",
            }}
        >
            <Stack>
                <Typography variant="h4" fontWeight={600} component="h1" gutterBottom>
                    {props.flashcard.front}
                </Typography>
                <Stack>
                    <Typography>
                        {t("select_correct_answer")}:
                    </Typography>
                    {multipleChoiceOptions.map((option, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            onClick={() => handleOptionSelect(option)}
                            sx={{
                                marginTop: "0.5rem",
                                width: "500px",
                                minHeight: "48px",
                                borderColor: buttonColors[option],
                                color: buttonColors[option],
                                whiteSpace: "normal",
                                textAlign: "center",
                                wordWrap: "break-word",
                                pointerEvents: selectedOption ? 'none' : 'auto',
                            }}
                        >
                            {option}
                        </Button>
                    ))}
                </Stack>
            </Stack>
            {selectedOption && (
                <Button 
                    variant="contained"
                    sx={{
                        position: "absolute",
                        bottom: ".5rem",
                        right: ".5rem",
                    }}
                    onClick={() => {
                        setSelectedOption(null);
                        setSelectedAnswerCorrect(null);
                        props.onContinue();
                    }}
                >
                    {t("continue")}
                </Button>
            )}
        </Card>
    )
}