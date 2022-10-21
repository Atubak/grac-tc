import { useState } from "react";
import Charlink from "../../components/charlink";
import Layout from "../../components/layout";
import { queryfunc } from "../../utils/graphql";
import styles from "../../styles/utils.module.css";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const query = `query {
        episodes(page:1) {
          info {
            count
          }
        }
      }`;
  const response = await queryfunc(query);

  const numberOfEpisodes = response.episodes.info.count;
  console.log(numberOfEpisodes);

  const paths = [];
  //   if I know how many locations there are I can make a {params} obj for each location
  for (let i = 0; i < numberOfEpisodes; i++) {
    paths.push({ params: { id: `${i}` } });
  }

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const query = `query getEpisodeById($id:ID!) {
    episode(id:$id) {
      id
      name
      characters {
        id
        name
      }
    }
  }`;
  const variables = { id: context.params.id };
  const response = await queryfunc(query, variables);

  return {
    props: {
      data: response.episode,
    },
  };
}

export default function SingleEpisode({ data }) {
  const router = useRouter();
  const [epData, setEpData] = useState(data);
  console.log(epData);
  return (
    <Layout>
      <h1>{epData.name}</h1>
      <p>characters in this episode: </p>
      <div className={styles.list}>
        {epData.characters.map((char) => {
          return <Charlink key={char.id} char={char} />;
        })}
      </div>
      <br />
      <button onClick={() => router.push("/episodes")}>
        Back to Episodes Page
      </button>
    </Layout>
  );
}
