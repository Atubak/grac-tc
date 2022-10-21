import axios from "axios";
import Layout from "../../components/layout";
import { queryfunc } from "../../utils/graphql";
import { useState } from "react";
import TypePage from "../../components/TypePage";

export async function getStaticProps() {
  const query = `query {
    episodes(page:1) {
     info {
       next
       prev
       count
       pages
     }
     results {
       id
       name
       episode
       created
       characters {
         id
         name
       }
     }
   }
   }`;
  const response = await queryfunc(query);

  return {
    props: { data: response.episodes },
  };
}

export default function Episodes({ data }) {
  const graphQuery = `query getEpisodes($page: Int) {
    episodes(page: $page) {
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
  return <TypePage data={data} graphQuery={graphQuery} pageType="episodes" />;
}
