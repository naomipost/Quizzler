import { Container, Toolbar } from "@mui/material";
import type React from "react"
import Navbar from "../components/Navbar";

type Props = {
    children: React.ReactNode;
}

export default function PageContainer(props: Props) {

    return (
        <>
            <Navbar/>
            <Toolbar /> {/* This reserves space for the fixed AppBar */}
            <Container>
                {props.children}
            </Container>
        </>
    )
}