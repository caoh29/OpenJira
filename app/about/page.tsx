import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My About Page',
    description: 'This is my about page',
}

export default function Home() {
    return (
        <main>
        <h1> About Page !</h1>
        </main>
    )
}