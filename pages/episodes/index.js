import { queryfunc } from "../../utils/graphql";
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
  // graphquery takes a variable in order to navigate the api's pagination
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
