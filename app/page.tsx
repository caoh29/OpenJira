import { useStore } from '@/store/store'
import styles from './page.module.css'

export default async function Home() {

  return (
    <main className={styles.main}>
      <h1> {JSON.stringify(useStore.getState().isSideBarOpen)} </h1>
    </main>
  )
}
