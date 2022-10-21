import axios from "axios";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import styles from "../../styles/utils.module.css";
import { queryfunc } from "../../utils/graphql";
import Link from "next/link";
import TypePage from "../../components/TypePage";

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
      data: data.locations,
    },
  };
}

export default function Locations({ data }) {
  const graphQuery = `query getLocations($page:Int) {
             locations(page: $page) {
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

  return <TypePage data={data} graphQuery={graphQuery} pageType="locations" />;
}
