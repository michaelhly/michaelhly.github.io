import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import prism from "remark-prism";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
}
