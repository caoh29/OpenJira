import { Box, Drawer, Typography, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export default function SideBar() {
    return (
        <Drawer anchor="left" open={true} onClose={() => console.log("close")}>
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px', width: 250 }}>
                    <Typography variant="h4">Menú</Typography>
                </Box>
                <List>
                    {
                        menuItems.map((item, index) => (
                            <ListItemButton key={item}>
                                <ListItemIcon>
                                    { index % 2 === 0 ? <InboxOutlinedIcon/> : <MailOutlinedIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={item}/>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    );
};