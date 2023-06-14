import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export default function NavBar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton>
                    <MenuOutlinedIcon />
                </IconButton>
                <Typography variant="h6">OpenJira</Typography>
            </Toolbar>
        </AppBar>
    );
};