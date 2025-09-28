import { Button, Card, Stack, Typography } from "@mui/material";
import type { StudySet } from "../../types/StudySet";
import { useNavigate } from "react-router";
import useResetAllFlashcardsStrength from "../../hooks/useResetAllFlashcardsStrength";

type Props = {
    studySet: StudySet;
    onRestart: () => void;
}

export default function LearnModeCompleted(props: Props) {
    const resetFlashcardStrength = useResetAllFlashcardsStrength();
    const navigate = useNavigate();
    const studyAgain = () => {
        resetFlashcardStrength.mutate(props.studySet.id, {
            onSuccess: () => {
                props.onRestart();
            },
        });
    }

    return (
        <Stack>
            <Typography variant="h6" fontWeight={600} component="h1" gutterBottom>
                Learn Mode for {props.studySet.name}
            </Typography>

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
                <Stack gap={1}>
                    <Typography variant="h4" fontWeight={600} component="h1" gutterBottom>
                        Learn mode complete!
                    </Typography>
                    <Typography>
                        Congrats! 🎉 You have completed learn mode for {props.studySet.name}.
                    </Typography>
                    <Stack direction="row" gap={2} pt={3} justifyContent="center">
                        <Button variant="outlined" onClick={studyAgain}>
                            Study again
                        </Button>
                        <Button variant="outlined" onClick={() => { navigate(`/studysets/${props.studySet.id}`) }}>
                            Back to study set
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}