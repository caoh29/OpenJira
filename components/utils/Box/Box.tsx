import { Box } from "@mui/material";
import { ReactNode } from 'react';

export default function BoxContainer ({ children }: { children: ReactNode }){
    return (
        <Box sx={{
            flexFlow: 1,
            padding: '10px 20px',
        }}>
            {children}
        </Box>
    );
};