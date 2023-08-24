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

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div tw="flex flex-col px-24">
          <h1 tw="text-6xl break-words">{title}</h1>
          <p tw="text-2xl text-gray-500">📔 Michael Huang</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Supported options: 'twemoji', 'blobmoji', 'noto', 'openmoji', 'fluent' and 'fluentFlat'
      // Default to 'twemoji'
      emoji: "openmoji",
    }
  );
}
