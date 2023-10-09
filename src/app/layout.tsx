import Link from 'next/link';
import './globals.css';
import Control from './Control';

export const metadata = {
  title: 'Web tutorials',
  description: 'Generated by create next app',
};

type Topics = {
  id: number;
  title: string;
  body: string;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch('http://localhost:9999/topics');
  const topics = await res.json();

  return (
    <html>
      <body>
        <h1>
          <Link href='/'>WEB</Link>
        </h1>
        <ol>
          {topics.map((topic: Topics) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
