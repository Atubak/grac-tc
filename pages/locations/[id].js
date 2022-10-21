import axios from "axios";
import Layout from "../../components/layout";
import { queryfunc } from "../../utils/graphql";
import { useState } from "react";

export async function getStaticPaths() {
  const query = `query {
        locations(page:1) {
          info {
            count
          }
        }
      }`;

  const response = await queryfunc(query);
  console.log("paths", response.locations.info.count);

  const numberOfLocations = response.locations.info.count;
  const paths = [];

  for (let i = 0; i < numberOfLocations; i++) {
    paths.push({ params: { id: `${i}` } });
  }
  //   console.log("pathsnum", paths);
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
  console.log("paramsid", context.params.id);
  const variables = { id: context.params.id };
  const data = await queryfunc(query, variables);

  return {
    props: { data },
  };
}

export default function SingleLocation({ data }) {
  const [locData, setLocData] = useState(data.location);

  console.log(locData);
  return (
    <Layout>
      <h1>{locData.name}</h1>
    </Layout>
  );
}
