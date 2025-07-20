import { Card } from "@mui/material";
import { useState } from "react";
import type { Flashcard } from "../types/Flashcard";

type Props = {
    flashcard: Flashcard;
};

//TODO: flip whole card not just text
export default function Flashcard(props: Props) {
    const [isFlipped, setIsFlipped] = useState(false);

    const turnAround = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <Card
            onClick={turnAround}
            sx={{
                minWidth: 275,
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                perspective: "1000px", // Enable 3D effect
                position: "relative",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                <div
                    style={{
                        backfaceVisibility: "hidden",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {props.flashcard.front}
                </div>
                <div
                    style={{
                        backfaceVisibility: "hidden",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {props.flashcard.back}
                </div>
            </div>
        </Card>
    );
}