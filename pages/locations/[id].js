import axios from "axios";
import Layout from "../../components/layout";
import { queryfunc } from "../../utils/graphql";
import { useState } from "react";
import styles from "../../styles/utils.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Charlink from "../../components/charlink";

export async function getStaticPaths() {
  const query = `query {
        locations(page:1) {
          info {
            count
          }
        }
      }`;

  const response = await queryfunc(query);

  const numberOfLocations = response.locations.info.count;
  const paths = [];

  //   if I know how many locations there are I can make a {params} obj for each location
  for (let i = 0; i < numberOfLocations; i++) {
    paths.push({ params: { id: `${i}` } });
  }

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const query = `query getlocationById($id: ID!){
        location(id: $id) {
          id
          name
          dimension
          type
          residents {
            id
            name
          }
        }
      }`;

  const variables = { id: context.params.id };
  const data = await queryfunc(query, variables);

  return {
    props: { data },
  };
}

export default function SingleLocation({ data }) {
  const router = useRouter();
  const [locData, setLocData] = useState(data.location);

  return (
    <Layout>
      <h1>{locData.name}</h1>
      <p>Dimension: {locData.dimension}</p>
      <div className={styles.list}>
        {locData.residents.length < 1
          ? "No characters are in this dimension"
          : locData.residents.map((res) => {
              return <Charlink key={res.id} char={res} />;
            })}
      </div>
      <br />
      <button onClick={() => router.push("/locations")}>
        Back to Locations Page
      </button>
    </Layout>
  );
}
