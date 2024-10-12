import PostPreview from "./post-preview";
import type Post from "../interfaces/post";

type Props = {
  posts: Post[];
};

const Stories = ({ posts }: Props) => {
  return (
    <section>
      <h2 className="my-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Some Scribbles.
      </h2>
      <div className="grid grid-cols-1 md:gap-x-16 lg:gap-x-32 gap-y-15 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            hidden={post.hidden}
          />
        ))}
      </div>
    </section>
  );
};

export default Stories;
