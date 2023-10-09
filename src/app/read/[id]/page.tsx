type Props = {
  params: ParamsType;
};

type ParamsType = {
  id: string;
};

export default async function Read(props: Props) {
  const res = await fetch(`http://localhost:9999/topics/${props.params.id}`, {
    cache: 'no-store',
  });
  const topic = await res.json();

  return (
    <>
      <h2>{topic.title}</h2>
      {topic.body}
    </>
  );
}
