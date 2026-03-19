import { db } from "@/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be logged in to vote" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const vote = parseInt(searchParams.get("vote"));

  if (!postId || vote === undefined) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const userId = session.user.id;

  // Check if user has already voted
  const { rows: existingVotes } = await db.query(
    "SELECT * FROM votes WHERE user_id = $1 AND post_id = $2 LIMIT 1",
    [userId, postId],
  );

  const existingVote = existingVotes?.[0];

  if (existingVote) {
    if (existingVote.vote === vote) {
      // User is toggling their vote, so remove it
      await db.query("DELETE FROM votes WHERE id = $1", [existingVote.id]);
    } else {
      // Update the existing vote
      await db.query("UPDATE votes SET vote = $1 WHERE id = $2", [
        vote,
        existingVote.id,
      ]);
    }
  } else {
    // Insert a new vote
    await db.query(
      "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, 'post')",
      [userId, postId, vote],
    );
  }

  // Get updated vote count
  const { rows: voteCount } = await db.query(
    "SELECT COALESCE(SUM(vote), 0) as votes FROM votes WHERE post_id = $1",
    [postId],
  );

  // Get user's current vote
  const { rows: userVote } = await db.query(
    "SELECT vote FROM votes WHERE user_id = $1 AND post_id = $2 LIMIT 1",
    [userId, postId],
  );

  return NextResponse.json({
    votes: voteCount[0].votes,
    vote: userVote[0]?.vote || 0,
  });
}
