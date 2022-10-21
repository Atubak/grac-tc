import { useState } from "react";
import Layout from "../../components/layout";
import { queryfunc } from "../../utils/graphql";
import styles from "../../styles/utils.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export async function getStaticPaths() {
  const query = `query {
        characters(page:1) {
          info {
           count
          }
        }
      }`;
  const response = await queryfunc(query);

  const numberOfChars = response.characters.info.count;

  const paths = [];
  //   if I know how many locations there are I can make a {params} obj for each location
  for (let i = 0; i < numberOfChars; i++) {
    paths.push({ params: { id: `${i}` } });
  }

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const query = `query getCharacterById($id:ID!){
        character(id:$id) {
          name
          gender
          image
          species
          status
          gender
          episode {
            id
            name
          }
          location {
            id
            name
            dimension
          }
        }
      }`;
  const variables = { id: context.params.id };
  const response = await queryfunc(query, variables);

  return { props: { data: response.character } };
}

export default function SingleChar({ data }) {
  const router = useRouter();
  const [charData, setCharData] = useState(data);

  return (
    <Layout>
      <h1>{charData.name}</h1>
      <div className={styles.characterInfo}>
        <div>
          <p>Species: {charData.species}</p>
          <p>Gender: {charData.gender}</p>
          <p>Status: {charData.status}</p>
          <p>
            Location:{" "}
            <Link href={"/locations/" + charData.location.id}>
              <a className={styles.locationLink}>{charData.location.name}</a>
            </Link>
          </p>
          <p>
            Dimension:{" "}
            <Link
              href={
                "/dimensions/" + charData.location.dimension.replace(/ /g, "-")
              }
            >
              <a className={styles.locationLink}>
                {charData.location.dimension}
              </a>
            </Link>
          </p>
        </div>
        <div>
          <Image
            className={styles.charImage}
            width={300}
            height={300}
            src={charData.image}
            alt="this character"
          />
        </div>
      </div>

      <p>Episodes this character has been in: </p>
      <div className={styles.list}>
        {charData.episode.map((ep) => {
          return (
            <Link key={ep.id} href={"/episodes/" + ep.id}>
              {ep.name}
            </Link>
          );
        })}
      </div>
      <br />
      <button onClick={() => router.push("/characters")}>
        Back to Characters Page
      </button>
    </Layout>
  );
}
