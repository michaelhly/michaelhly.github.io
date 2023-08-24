import Head from "next/head";
import {
  HOME_OG_IMAGE_URL,
  WEBSITE_DESCRIPTION,
  WEBSITE_TITLE,
} from "../lib/constants";

const Meta = () => {
  return (
    <Head>
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <meta name="description" content={WEBSITE_DESCRIPTION} />
      <meta property="og:title" content={WEBSITE_TITLE} />
      <meta property="twitter:title" content={WEBSITE_TITLE} />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.svg" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
    </Head>
  );
};

export default Meta;
