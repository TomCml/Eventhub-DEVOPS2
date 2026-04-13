import { CssBaseline, Container, Box } from "@mui/material";
import { NavBar } from "../../navbar/components/NavBar";

export const Layout: React.FC <{children: React.ReactNode}> = ({children}) => {

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <CssBaseline />
            <NavBar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
                {children}
            </Container>
        </Box>
    )
}