import { db } from "@/db";
import Link from "next/link";
import { Vote } from "@/components/Vote";

export default async function UserProfilePage({ params }) {
  const userId = parseInt(params.userId);

  // Get user information
  const { rows: users } = await db.query(
    'SELECT id, name, image, "emailVerified" FROM users WHERE id = $1',
    [userId],
  );

  if (users.length === 0) {
    return (
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl">User not found</h1>
      </div>
    );
  }

  const user = users[0];

  // Get user's posts
  const { rows: posts } = await db.query(
    `SELECT posts1.id, posts1.title, posts1.body, posts1.created_at, users.name,
      COALESCE(SUM(votes.vote), 0) AS vote_total
    FROM posts1
    JOIN users ON posts1.user_id = users.id
    LEFT JOIN votes ON votes.post_id = posts1.id
    WHERE posts1.user_id = $1
    GROUP BY posts1.id, posts1.title, posts1.body, posts1.created_at, users.name
    ORDER BY posts1.created_at DESC`,
    [userId],
  );

  // Get user's comments
  const { rows: comments } = await db.query(
    `SELECT comments1.id, comments1.body, comments1.created_at, posts1.id as post_id, posts1.title as post_title
    FROM comments1
    JOIN posts1 ON comments1.post_id = posts1.id
    WHERE comments1.user_id = $1
    ORDER BY comments1.created_at DESC
    LIMIT 20`,
    [userId],
  );

  // Calculate karma (sum of all votes on user's posts)
  const { rows: karmaResult } = await db.query(
    `SELECT COALESCE(SUM(votes.vote), 0) as karma
    FROM votes
    JOIN posts1 ON votes.post_id = posts1.id
    WHERE posts1.user_id = $1`,
    [userId],
  );

  const karma = karmaResult[0]?.karma || 0;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {/* User Profile Header */}
      <div className="bg-zinc-800 rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <div className="w-20 h-20 bg-zinc-600 rounded-full flex items-center justify-center text-2xl">
              {user.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-zinc-400">
              Joined:{" "}
              {user.emailVerified
                ? new Date(user.emailVerified).toLocaleDateString()
                : "Unknown"}
            </p>
            <p className="text-zinc-400 mt-2">
              Karma: <span className="text-green-400 font-bold">{karma}</span>
            </p>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p className="text-zinc-400">No posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="bg-zinc-800 rounded-lg p-4">
                <div className="flex space-x-4">
                  <Vote postId={post.id} votes={post.vote_total} />
                  <div>
                    <Link
                      href={`/post/${post.id}`}
                      className="text-xl hover:text-pink-400"
                    >
                      {post.title}
                    </Link>
                    <p className="text-zinc-400 text-sm">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* User's Comments */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Comments ({comments.length})
        </h2>
        {comments.length === 0 ? (
          <p className="text-zinc-400">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-zinc-800 rounded-lg p-4">
                <Link
                  href={`/post/${comment.post_id}`}
                  className="text-sm text-zinc-400 hover:text-pink-400"
                >
                  Replied to: {comment.post_title}
                </Link>
                <p className="mt-2">{comment.body}</p>
                <p className="text-zinc-500 text-sm mt-2">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const userId = parseInt(params.userId);

  const { rows: users } = await db.query(
    "SELECT name FROM users WHERE id = $1",
    [userId],
  );

  if (users.length === 0) {
    return { title: "User Not Found" };
  }

  return { title: `${users[0].name}'s Profile` };
}
