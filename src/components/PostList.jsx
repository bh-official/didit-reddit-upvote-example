import Link from "next/link";
import { Pagination } from "./Pagination";
import { Vote } from "./Vote";
import { db } from "@/db";
import { POSTS_PER_PAGE } from "@/config";

export async function PostList({ currentPage = 1, sort = "top" }) {
  let orderBy;

  switch (sort) {
    case "recent":
      orderBy = "posts1.created_at DESC";
      break;
    case "controversial":
      // Controversial = posts with both upvotes and downvotes
      // Order by total votes (high) then by difference between upvotes and downvotes (low)
      orderBy = "COALESCE(SUM(votes.vote), 0) DESC, ABS(SUM(votes.vote)) ASC";
      break;
    case "top":
    default:
      orderBy = "COALESCE(SUM(votes.vote), 0) DESC";
  }

  const query = `
  SELECT 
    posts1.id,
    posts1.title,
    posts1.body,
    posts1.created_at,
    posts1.user_id,
    users.name,
    COALESCE(SUM(votes.vote), 0) AS vote_total
  FROM posts1
  JOIN users ON posts1.user_id = users.id
  LEFT JOIN votes ON votes.post_id = posts1.id
  GROUP BY posts1.id, posts1.title, posts1.body, posts1.created_at, posts1.user_id, users.name
  ORDER BY ${orderBy}
  LIMIT ${POSTS_PER_PAGE}
  OFFSET ${POSTS_PER_PAGE * (currentPage - 1)}
  `;

  const { rows: posts } = await db.query(query);

  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex space-x-4 mb-4">
          <Link
            href="/"
            className={`px-3 py-1 rounded ${sort === "top" ? "bg-pink-500 text-white" : "bg-amber-800"}`}
          >
            Top
          </Link>
          <Link
            href="/?sort=recent"
            className={`px-3 py-1 rounded ${sort === "recent" ? "bg-pink-500 text-white" : "bg-amber-800"}`}
          >
            Recent
          </Link>
          <Link
            href="/?sort=controversial"
            className={`px-3 py-1 rounded ${sort === "controversial" ? "bg-pink-500 text-white" : "bg-amber-800"}`}
          >
            Controversial
          </Link>
        </div>
      </div>
      <ul className="max-w-screen-lg mx-auto p-4 mb-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className=" py-4 flex space-x-6 hover:bg-zinc-200 rounded-lg"
          >
            <Vote postId={post.id} votes={post.vote_total} />
            <div>
              <Link
                href={`/post/${post.id}`}
                className="text-3xl hover:text-pink-500"
              >
                {post.title}
              </Link>
              <p className="text-zinc-700">
                posted by{" "}
                <Link
                  href={`/user/${post.user_id}`}
                  className="hover:text-pink-500"
                >
                  {post.name}
                </Link>
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} sort={sort} />
    </>
  );
}
