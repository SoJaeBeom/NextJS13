'use client';

import { useRouter } from 'next/navigation';

export type TargetType = {
  title: { value: string };
  body: { value: string };
};

export default function Create() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & TargetType;
        const title = target.title.value;
        const body = target.body.value;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };

        fetch('http://localhost:9999/topics', options)
          .then((res) => res.json())
          .then((result) => {
            const lastID = result.id;
            router.push(`/read/${lastID}`);
          });
      }}
    >
      <p>
        <input type='text' name='title' placeholder='title' />
      </p>
      <p>
        <textarea name='body' placeholder='body'></textarea>
      </p>
      <p>
        <input type='submit' value='create' />
      </p>
    </form>
  );
}
