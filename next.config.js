// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    /**
     * Enable static exports for the App Router.
     *
     * @see https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
     */
    output: process.env.HOST === "gh-pages" ?  "export" : undefined,
  
    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
     */
    images: {
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;