import { createTheme } from "@mui/material/styles";

const AppTheme = (colorMode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode: colorMode,
            primary: {
                main: colorMode === "light" ? "rgb(114, 14, 125)" : "rgb(217, 140, 255)",
            },
            secondary: {
                main: colorMode === "light" ? "rgb(52, 3, 69)" : "rgb(230, 174, 245)",
            },
            background: {
                default: colorMode === "light" ? "rgb(239, 239, 239)" : "rgb(35, 35, 35)",
                paper: colorMode === "light" ? "rgb(255, 255, 255)" : "rgb(50, 50, 50)",
            },
            text: {
                primary: colorMode === "light" ? "rgb(19, 1, 27)" : "rgb(245, 223, 251)",
                secondary: colorMode === "light" ? "rgb(77, 71, 79)" : "rgb(198, 187, 199)",
            },
        },
        shape: {
            borderRadius: 12, // slightly rounded corrners for a more modern look
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        boxShadow:
                            colorMode === "light"
                                ? ownerState.elevation === 0
                                    ? "none" //no shadow if elevation is 0 in light mode
                                    : "0px 1px 6px rgba(0, 0, 0, 0.2)" //custom soft shadow for light mode
                                : undefined, // in dark mode, let the elevatio prop or theme default handle shadow
                        backdropFilter: "blur(8px)", //stronger blur for a modern glassy effect
                        backgroundColor:
                            colorMode === "light"
                                ? "rgba(255, 255, 255, 0.9)"
                                : "rgba(10, 10, 10, 0.9)",
                        border: colorMode === "light" ? "0.5px solid rgba(0, 0, 0, 0.1)" : "none", // light border in light mode
                    }),
                },
            },
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        backdropFilter: "blur(8px)", //apply blur effect to modal backdrop
                        backgroundColor: "rgba(0, 0, 0, 0.5)", //semi-transparent black for the backdrop
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 12, //slightly rounded butons
                        textTransform: "none", //keep text casing natural
                        fontWeight: 600, //bold text for buttons
                    },
                },
            },
        },
    });

export default AppTheme;