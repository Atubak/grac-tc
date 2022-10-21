import Image from "next/image";
import styles from "../styles/utils.module.css";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className={styles.page}>
      <nav className={styles.header}>
        <Link href="/">Home</Link>
      </nav>
      <main className={styles.container}>{children}</main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by the Rick and Morty API
        </a>
      </footer>
    </div>
  );
}
