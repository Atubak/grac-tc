import TypePage from "../../components/TypePage";
import { queryfunc } from "../../utils/graphql";

export async function getStaticProps() {
  const query = `query {
    characters(page:1) {
      info {
        next
        prev
        count
        pages
      }
      results {
        id
        name
      }
    }
  }`;
  const response = await queryfunc(query);

  return {
    props: { data: response.characters },
  };
}

export default function Characters({ data }) {
  const graphQuery = `query getCharacters($page: Int) {
    characters(page:$page) {
      info {
        next
        prev
        count
        pages
      }
      results {
        id
        name
      }
    }
  }`;
  return <TypePage data={data} graphQuery={graphQuery} pageType="characters" />;
}
