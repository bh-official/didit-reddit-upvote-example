import { db } from "@/db";
import auth from "../app/middleware";
import { revalidatePath } from "next/cache";
import { VoteButtons } from "./VoteButtons";

async function getExistingVote(userId, postId) {
  const { rows: existingVotes } = await db.query(
    "SELECT * FROM votes WHERE user_id = $1 AND post_id = $2 LIMIT 1",
    [userId, postId],
  );

  return existingVotes?.[0];
}

export async function Vote({ postId, votes }) {
  const session = await auth();
  const existingVote = await getExistingVote(session?.user?.id, postId);

  return (
    <>
      <form className="flex items-center space-x-3 pl-3">
        <VoteButtons
          postId={postId}
          votes={votes}
          existingVote={existingVote}
          isLoggedIn={!!session?.user?.id}
        />
      </form>
    </>
  );
}
