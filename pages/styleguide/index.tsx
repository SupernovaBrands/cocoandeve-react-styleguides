import Link from "next/link";
import Home from "../index";

type StyleguideProps = {
    path?: string | null | undefined;
}

export default function Styleguide(props: StyleguideProps) {

  return (
    <Home path={props.path}/>
  );
}
