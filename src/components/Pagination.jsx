import { POSTS_PER_PAGE } from "@/config";
import { db } from "@/db";
import clsx from "clsx";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export async function Pagination({ currentPage = 1, sort = "top" }) {
  const { rows: postCount } = await db.query(`SELECT COUNT(*) FROM posts1`);
  const count = postCount[0].count;
  const numOfPages = Math.ceil(count / POSTS_PER_PAGE);

  const getSortParam = () => (sort && sort !== "top" ? `?sort=${sort}` : "");

  return (
    <ul className="flex w-1/2 mx-auto space-x-3 text-2xl">
      {currentPage > 1 && (
        <li>
          <a
            href={
              currentPage - 1 === 1
                ? `/` + getSortParam()
                : `/page/${currentPage - 1}` + getSortParam()
            }
            className="p-2 hover:bg-zinc-800 block text-zinc-400"
          >
            <GrFormPrevious />
          </a>
        </li>
      )}
      {Array.from({ length: numOfPages }, (_, index) => (
        <li key={index} className="items-center flex">
          <a
            href={(index > 0 ? `/page/${index + 1}` : `/`) + getSortParam()}
            className={clsx(` hover:bg-zinc-800 `, {
              "text-pink-400": currentPage === index + 1,
            })}
          >
            {index + 1}
          </a>
        </li>
      ))}
      {currentPage < numOfPages && (
        <li>
          <a
            href={`/page/${currentPage + 1}` + getSortParam()}
            className="p-2 hover:bg-zinc-800 block"
          >
            <GrFormNext />
          </a>
        </li>
      )}
    </ul>
  );
}
