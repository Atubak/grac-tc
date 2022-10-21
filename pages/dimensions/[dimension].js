import Layout from "../../components/layout";
import { queryfunc } from "../../utils/graphql";
import { useState } from "react";
import Charlink from "../../components/charlink";
import styles from "../../styles/utils.module.css";

export async function getServerSideProps(context) {
  const query = `query getCharactersByDimension($dimension: String) {
    locations(filter: {dimension: $dimension}) {
      info {
        count
      }
      results {
        name
        dimension
        id
        residents {
          id
          name
        }
      }
    }
  }`;
  const variables = { dimension: context.params.dimension.replace(/-/g, " ") };
  const response = await queryfunc(query, variables);

  return { props: { data: response.locations } };
}

export default function Dimension({ data }) {
  const [dimensionData, setDimensionData] = useState(data);
  console.log(dimensionData);
  return (
    <Layout>
      <h1>{dimensionData.results[0].dimension}</h1>
      <p>~Characters in this dimension by location~</p>
      <div>
        {dimensionData.results.map((loc) => {
          return (
            <div key={loc.id}>
              <p>Location: {loc.name}</p>
              <div className={styles.list}>
                {loc.residents.map((char) => (
                  <Charlink key={char.id} char={char} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
