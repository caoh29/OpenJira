"use client";

import styles from './page.module.css'
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from '../themes'
import BoxContainer from '@/components/utils/Box/Box';

export default function Home() {
  return (
    <ThemeProvider theme={ darkTheme }>
      <main className={styles.main}>
        <h1> Hello World! </h1>
        <Button variant="contained">Hello World</Button>
        <BoxContainer/>
      </main>
    </ThemeProvider>
  )
}
