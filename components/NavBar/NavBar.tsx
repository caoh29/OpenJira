import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Link from 'next/link';

import { useStore } from '@/store/store';

export default function NavBar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton onClick={useStore(state => state.toggleSideBar)}>
                    <MenuOutlinedIcon/> 
                </IconButton>
                <Link href="/">
                    <Typography variant="h6">OpenJira</Typography>
                </Link>
                <IconButton style={{ marginLeft: 'auto' }} onClick={useStore(state => state.toggleDarkMode)}>
                    <DarkModeOutlinedIcon /> 
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};