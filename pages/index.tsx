import Head from "next/head";

import Container from "../components/container";
import Stories from "../components/stories";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Post from "../interfaces/post";
import Footer from "../components/footer";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Michael Huang</title>
        </Head>
        <Container>
          {allPosts.length > 0 && <Stories posts={allPosts} />}
        </Container>
        <Footer />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug"]);

  return {
    props: { allPosts },
  };
};
