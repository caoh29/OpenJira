"use client";

import './globals.css'

import Head from 'next/head'
import { Inter } from 'next/font/google'

import { ThemeProvider, Box } from '@mui/material'
import { lightTheme, darkTheme } from '../themes'
import NavBar from '@/components/NavBar/NavBar';
import SideBar from '@/components/SideBar/SideBar';
import { useStore } from '@/store/store';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '',
  description: '',
}

const getTheme = () => {
  const theme = useStore(state => state.isDarkMode);
  return theme ? darkTheme : lightTheme;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={''} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider theme={ getTheme() }>
          <Box sx={{ flexFlow: 1 }}>
            <NavBar/>
            <SideBar/>
            <Box sx={{ padding: '10px 20px' }}>
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}
