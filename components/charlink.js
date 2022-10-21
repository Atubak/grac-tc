import Link from "next/link";

export default function Charlink({ char }) {
  return (
    <Link href={`/characters/${char.id}`}>
      <a>{char.name}</a>
    </Link>
  );
}
