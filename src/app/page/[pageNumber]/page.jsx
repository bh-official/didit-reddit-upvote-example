import { PostList } from "@/components/PostList";

export default async function PageNumberRoute({ params, searchParams }) {
  const sort = searchParams?.sort || "top";
  return (
    <div>
      <PostList currentPage={parseInt(params.pageNumber, 10)} sort={sort} />
    </div>
  );
}
