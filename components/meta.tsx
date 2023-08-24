import Head from "next/head";
import { HOME_OG_IMAGE_URL } from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.svg" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content="Michael Huang's website" />
      <meta property="og:title" content="Michael Huang" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};

export default Meta;
