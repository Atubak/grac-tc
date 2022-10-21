import axios from "axios";

export async function queryfunc(query, variables = null) {
  // check for variables and leave it out of the req if there not given
  if (!variables) {
    const response = await axios.post(
      "https://rickandmortyapi.com/graphql",
      { query },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.data;
  }

  const response = await axios.post(
    "https://rickandmortyapi.com/graphql",
    { query, variables },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  //   awkward nesting of data.data, seems to be because of axios wrapping reqs in a data obj
  return response.data.data;
}
