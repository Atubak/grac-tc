import Layout from "../components/layout";
import Link from "next/link";
import styles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout>
      <h1>home</h1>
      <p>links to pages:</p>
      <div className={styles.list}>
        <Link href="/locations">
          <a> Locations</a>
        </Link>
        <br />
        <br />
        <Link href="/episodes">
          <a> Episodes</a>
        </Link>
        <br />
        <br />
        <Link href="/characters">
          <a> Characters</a>
        </Link>
      </div>
    </Layout>
  );
}
