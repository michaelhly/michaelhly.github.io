import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import { DEFAULT_POST_TITLE } from "../../lib/constants";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : DEFAULT_POST_TITLE;

  console.log({ title });

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        📔
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Supported options: 'twemoji', 'blobmoji', 'noto', 'openmoji', 'fluent' and 'fluentFlat'
      // Default to 'twemoji'
      emoji: "twemoji",
    }
  );
}
