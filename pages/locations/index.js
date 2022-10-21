import axios from "axios";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import styles from "../../styles/utils.module.css";
import { queryfunc } from "../../utils/graphql";

export async function getStaticProps() {
  const variables = { page: 1 };
  const query = `query getLocations($page:Int) {
    locations(page:$page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
      }
    }
  }`;

  const data = await queryfunc(query, variables);

  return {
    props: {
      data,
    },
  };
}

export default function Locations({ data }) {
  const [locs, setLocs] = useState(data.locations);

  console.log(locs);

  //   have to do this from client side because it's not practical to prerender all pages of locations from the api
  //   function that takes page number from the nav buttons and returns the new state for the list of locations
  const getNewPage = async (navButton) => {
    const query = `query getLocations($page:Int) {
            locations(page:$page) {
              info {
                count
                pages
                next
                prev
              }
              results {
                id
                name
              }
            }
          }`;

    const variables = { page: navButton };
    const response = await queryfunc(query, variables);
    setLocs(response.locations);
  };

  return (
    <Layout>
      <h1>all locations</h1>
      <div className={styles.list}>
        <div>
          {locs.results.map((result) => {
            return (
              <div key={result.id}>
                <a>{result.name}</a>
              </div>
            );
          })}
        </div>
        <br />
        <div>
          <button onClick={() => getNewPage(locs.info.prev)}>previous</button>
          {locs.info.prev ? locs.info.prev + 1 : 1}
          <button onClick={() => getNewPage(locs.info.next)}>next</button>
          <p>
            total number of pages: {locs.info.pages}
            <br />
            total number of locations: {locs.info.count}
          </p>
        </div>
      </div>
    </Layout>
  );
}
