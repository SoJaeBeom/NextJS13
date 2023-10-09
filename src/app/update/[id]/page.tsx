'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type TargetType = {
  title: { value: string };
  body: { value: string };
};

export default function Update() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const id = params.id;

  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, [id]);

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & TargetType;
        const title = target.title.value;
        const body = target.body.value;
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };

        fetch(`http://localhost:9999/topics/${id}`, options)
          .then((res) => res.json())
          .then((result) => {
            const lastID = result.id;
            router.push(`/read/${lastID}`);
          });
      }}
    >
      <p>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </p>
      <p>
        <textarea
          name='body'
          placeholder='body'
          value={body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setBody(e.target.value)
          }
        ></textarea>
      </p>
      <p>
        <input type='submit' value='update' />
      </p>
    </form>
  );
}
