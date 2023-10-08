import { ReactElement } from 'react';

type Props = {
  children: JSX.Element;
};

export default function Layout(props: Props) {
  return (
    <form>
      <h1>Create</h1>
      {props.children}
    </form>
  );
}
