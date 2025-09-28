import { Card, Stack, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Flashcard } from "../../types/Flashcard";
import type { StudySet } from "../../types/StudySet";

type Props = {
    flashcard: Flashcard;
    studySet: StudySet;
    onContinue: () => void;
    onUpdateStrength: (flashcardId: number, isCorrect: boolean) => void;
}

export default function ShortAnswerLearnCard(props: Props) {
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);
    const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const { t } = useTranslation();
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
                        {t("write_your_answer")}:
                    </Typography>
                    <TextField
                        variant="outlined"
                        color={correctAnswer === null ? "primary" : correctAnswer ? "success" : "error"}
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: correctAnswer === null
                                    ? 'transparent'
                                    : correctAnswer
                                        ? '#e8f5e8'
                                        : '#fde8e8', 
                            }
                        }}
                        helperText={correctAnswer === false ? t("incorrect_answer", { answer: props.flashcard.back }) : " "}
                    />
                </Stack>
            </Stack>
            {answerSubmitted === false ? (
                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        bottom: ".5rem",
                        right: ".5rem",
                    }}
                    onClick={() => {
                        // Normalize both answers by removing extra whitespace and converting to lowercase
                        const normalizedUserAnswer = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
                        const normalizedCorrectAnswer = props.flashcard.back.trim().toLowerCase().replace(/\s+/g, ' ');
                        
                        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
                        setCorrectAnswer(isCorrect);
                        setIsCorrect(isCorrect);
                        setAnswerSubmitted(true);
                    }}
                >
                    {t("submit")}
                </Button>
            ) : (
                <Button
                    variant="contained"
                    sx={{
                        position: "absolute",
                        bottom: ".5rem",
                        right: ".5rem",
                    }}
                    onClick={() => {
                        setUserAnswer("");
                        setCorrectAnswer(null);
                        setAnswerSubmitted(false);
                        setIsCorrect(false);
                        
                        props.onUpdateStrength(props.flashcard.id, isCorrect);
                        props.onContinue();
                    }}
                >
                    {t("continue")}
                </Button>
            )}
        </Card>
    )
}