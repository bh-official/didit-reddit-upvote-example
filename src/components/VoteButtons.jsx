"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";

export function VoteButtons({ postId, votes, existingVote, isLoggedIn }) {
  const [error, setError] = useState(null);
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [currentVote, setCurrentVote] = useState(existingVote?.vote);

  const handleUpvote = async () => {
    if (!isLoggedIn) {
      setError("You must be logged in to vote");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await fetch(`/api/vote?postId=${postId}&vote=1`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setTimeout(() => setError(null), 3000);
      } else {
        setCurrentVotes(data.votes);
        setCurrentVote(data.vote);
      }
    } catch (err) {
      setError("Failed to vote");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDownvote = async () => {
    if (!isLoggedIn) {
      setError("You must be logged in to vote");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await fetch(`/api/vote?postId=${postId}&vote=-1`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setTimeout(() => setError(null), 3000);
      } else {
        setCurrentVotes(data.votes);
        setCurrentVote(data.vote);
      }
    } catch (err) {
      setError("Failed to vote");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute -top-10 left-0 bg-red-500 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap">
          {error}
        </div>
      )}
      <button type="button" onClick={handleUpvote}>
        {currentVote === 1 ? (
          <TbArrowBigUpFilled
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": currentVote === 1,
            })}
          />
        ) : (
          <TbArrowBigUp
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": currentVote === 1,
            })}
          />
        )}
      </button>
      <span className="w-6 text-center tabular-nums">{currentVotes}</span>
      <button type="button" onClick={handleDownvote}>
        {currentVote === -1 ? (
          <TbArrowBigDownFilled
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": currentVote === -1,
            })}
          />
        ) : (
          <TbArrowBigDown
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": currentVote === -1,
            })}
          />
        )}
      </button>
    </div>
  );
}
