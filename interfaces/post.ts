type PostType = {
  slug: string;
  title: string;
  date: string;
  hidden: string;
  content: string;
  ogImage?: {
    url: string;
  };
};

export default PostType;
