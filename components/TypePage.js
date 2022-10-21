import Layout from "./layout";
import { queryfunc } from "../utils/graphql";
import Link from "next/link";
import styles from "../styles/utils.module.css";
import { useState } from "react";

// template component for pages i.e. locations, episodes, characters
export default function TypePage({ data, graphQuery, pageType }) {
  const [pageData, setPageData] = useState(data);
  console.log("dataprop", data);
  console.log(pageData);

  //   function that takes page number from the nav buttons and returns the new state for the list of locations
  //   have to do this from client side because it's not practical to prerender all pages of locations from the api
  const getNewPage = async (navButton) => {
    const query = graphQuery;

    const variables = { page: navButton };
    const response = await queryfunc(query, variables);
    setPageData(response[pageType]);
  };

  return (
    <Layout>
      <h1>all {pageType}</h1>
      <div className={styles.list}>
        <div>
          {pageData.results.map((result) => {
            return (
              <div key={result.id}>
                <Link href={`/${pageType}/${result.id}`}>
                  <a>{result.name}</a>
                </Link>
              </div>
            );
          })}
        </div>
        <br />
        <div>
          <button onClick={() => getNewPage(pageData.info.prev)}>
            previous
          </button>
          {pageData.info.prev ? pageData.info.prev + 1 : 1}
          <button onClick={() => getNewPage(pageData.info.next)}>next</button>
          <p>
            total number of pages: {pageData.info.pages}
            <br />
            total number of {pageType}: {pageData.info.count}
          </p>
        </div>
      </div>
    </Layout>
  );
}
