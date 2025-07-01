import { Container } from "@mui/material";
import type React from "react"
import Navbar from "../components/Navbar";

type Props = {
    children: React.ReactNode;
}

export default function PageContainer(props: Props) {

    return (
        <Container>
            <Navbar/>
            {props.children}
        </Container>
    )
}