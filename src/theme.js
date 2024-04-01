import { useState, useMemo, createContext } from "react";
import { createTheme } from "@mui/material/styles";

// colors 
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            gray: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#151718",
                500: "#0c0d0e",
                600: "#101624",
                700: "#0c101b", 
                800: "#080b12",
                900: "#313538"
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#52a9ff",
                400: "#29a629",
                500: "#52a9ff",
                600: "#3da58a",
                700: "#004c3a",
                800: "#52a9ff",
                900: "#10243e",
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#1a1d1e",
                800: "#2a2d64",
                900: "#151632"
            },
        } 
        : {
            gray: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#ffffff",
                500: "#0c0d0e",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#dfe3e6",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#006adc",
                400: "#1be296",
                500: "#006adc",
                600: "#70d8bd",
                700: "#1be296",
                800: "#006adc",
                900: "#edf6ff",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#f8f9fa",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
        })
})


// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode)
    
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
            ? {
                primary: {
                    main: colors.primary[500]
                },
                secondary: {
                    main: colors.greenAccent[500]
                },
                neutral: {
                    dark: colors.gray[700],
                    main: colors.gray[500],
                    light: colors.gray[100]
                },
                background: {
                    default: colors.primary[500]
                }
            } : {
                primary: {
                    main: colors.primary[100]
                },
                secondary: {
                    main: colors.greenAccent[500]
                },
                neutral: {
                    dark: colors.gray[700],
                    main: colors.gray[500],
                    light: colors.gray[100]
                },
                background: {
                    default: '#fbfcfd'
                }
            })
        },
        typography: {
            fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
                fontSize: 40,   
            },
            h2: {
                fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
                fontSize: 32,   
            },
            h3: {
                fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
                fontSize: 24,   
            },
            h4: {
                fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
                fontSize: 20,   
            },
            h5: {
                fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
                fontSize: 16,   
            },
            h6: {
                fontFamily: ['Source Sans 3', 'sans-serif'].join(','),
                fontSize: 14,   
            },        
        }
    }
}

// context for color mode 
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode ] = useState('dark')

    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
        }
    }),
    []
    )

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode]
}