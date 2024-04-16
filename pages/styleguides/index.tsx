import Home from "..";

type HomeProps = {
  path: string | undefined | null,
}

export default function Styleguide(props: HomeProps) {
  return (
    <Home path={props.path}/>
  );
}
