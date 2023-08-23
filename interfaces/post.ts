type PostType = {
  slug: string;
  title: string;
  date: string;
  content: string;
  ogImage?: {
    url: string;
  };
};

export default PostType;
