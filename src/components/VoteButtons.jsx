"use client";

import { useFormState } from "react-dom";
import clsx from "clsx";
import {
  TbArrowBigDown,
  TbArrowBigDownFilled,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";

export function VoteButtons({ upvote, downvote, votes, existingVote }) {
  const [upvoteState, upvoteAction] = useFormState(upvote, null);
  const [downvoteState, downvoteAction] = useFormState(downvote, null);

  const error = upvoteState?.error || downvoteState?.error;

  return (
    <>
      {error && (
        <div className="absolute -top-10 left-0 bg-red-500 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap">
          {error}
        </div>
      )}
      <button formAction={upvoteAction}>
        {existingVote?.vote === 1 ? (
          <TbArrowBigUpFilled
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        ) : (
          <TbArrowBigUp
            size={24}
            className={clsx("hover:text-orange-600", {
              "text-pink-300": existingVote?.vote === 1,
            })}
          />
        )}
      </button>
      <span className="w-6 text-center tabular-nums">{votes}</span>
      <button formAction={downvoteAction}>
        {existingVote?.vote === -1 ? (
          <TbArrowBigDownFilled
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        ) : (
          <TbArrowBigDown
            size={24}
            className={clsx("hover:text-blue-600", {
              "text-blue-300": existingVote?.vote === -1,
            })}
          />
        )}
      </button>
    </>
  );
}
