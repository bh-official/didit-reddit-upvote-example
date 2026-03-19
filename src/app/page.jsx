import { PostList } from "../components/PostList";

export default async function Home({ searchParams }) {
  const sort = searchParams?.sort || "top";
  return <PostList sort={sort} />;
}
