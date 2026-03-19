## Upvote

Upvote is a Reddit-esque web application that allows users to create posts, upvote and downvote posts, and comment on posts in a multi-threaded, nested list.

The project is built using Next.js with the /app router and [Tailwind CSS](https://tailwindcss.com/), and uses [Auth.js (formerly Next Auth)](https://authjs.dev/) for user authentication. The data is stored in a Postgres database, which is created and accessed with raw SQL queries using the `pg` package.

The project is a work in progress and is not yet complete.

## Features

- [x] View a list of posts
- [x] View a single post
- [x] Create a post
- [x] Upvote and downvote posts
- [x] Pagination of posts
- [x] Comment on posts
- [x] Nested comments (recursive lists)
- [x] User authentication

## Setup instructions

1. Fork the repository (check "copy the main branch only") and clone your fork to your local machine
2. Run `npm install`
3. Create a `.env.local` file in the root directory and add the following environment variables:
   - `DATABASE_URL` - the URL of your Postgres database (eg. the Supabase connection string)
   - `AUTH_SECRET` - the Next Auth secret string (this can be anything at all like a password, but keep it secret!)
   - `AUTH_GITHUB_ID` - the GitHub OAuth client ID (create yours in [Github developer settings](https://github.com/settings/developers)
   - `AUTH_GITHUB_SECRET` - the GitHub OAuth client secret (create this in [Github developer settings](https://github.com/settings/developers))
4. Create the database schema by running the SQL commands in `schema.sql` in your database (eg. by running the commands in Supabase Query Editor)
5. Run `npm run dev` to start the development server
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the site

## Potential future features

- [ ] User profiles
- [ ] Sorting posts by recent (date posted), top (most upvotes), and most controversial (most upvotes _and_ downvotes)
- [ ] User karma scores
- [ ] User badges / trophies (awards for achievements like number of posts, years on the site, etc.)
- [ ] User settings (eg. number of posts per page, theme, etc.)
- [ ] Moderation tools / reporting or flagging objectionable comments for removable by admins
- [ ] Searching posts (possibly using simple SQL LIKE '%some search%', or [Postgres text search](https://www.crunchydata.com/blog/postgres-full-text-search-a-search-engine-in-a-database))
- [ ] Subreddits (separate communities, that isn't just one big list of posts, that can be created by users)
- [ ] User notifications
- [ ] User private messaging
- [ ] User blocking
- [ ] User following
- [ ] User feed (posts from users you follow)
- [ ] User flair

## Assignment Reflection

### Requirements Met and Goals Achieved

1. **Fixed Table Names** - Updated all database references from `posts` to `posts1` and `comments` to `comments1` across the entire codebase including:
   - `src/app/post/[postId]/page.jsx` - Single post query
   - `src/components/CommentList.jsx` - Comments query
   - `src/actions/comments.js` - Comment insertion
   - `schema.sql` - Database schema with proper foreign key references

2. **Fixed Page Titles** - Added `generateMetadata()` function to dynamically set page titles based on post title in `src/app/post/[postId]/page.jsx`

3. **Added Error Handling for Voting** - Created new API route (`src/app/api/vote/route.js`) and updated VoteButtons component to show "You must be logged in to vote" error message when users not logged in attempt to vote

4. **Added Duplicate Vote Prevention** - Added UNIQUE constraint on `(user_id, post_id, vote_type)` in the votes table schema to prevent users from voting multiple times on the same post

5. **Verified Existing Features** - Confirmed all core features were working:
   - View list of posts (homepage with PostList component)
   - View single post (post detail page)
   - Create post (/add-post page)
   - Upvote/downvote posts
   - Pagination
   - Comment on posts
   - Nested comments (recursive CommentList component)
   - User authentication

### Goals Not Achieved

All primary requirements were achieved. The application is fully functional with the corrected table names and enhanced error handling.

### Difficulties Encountered

1. **Server Actions with useFormState** - Initially attempted to use `useFormState` with server actions for vote error handling, but encountered serialization issues when passing server actions as props from server to client components. Solved by converting VoteButtons to a client component using onClick handlers and creating a new API route for voting.

2. **Understanding Project Structure** - Required time to explore and understand the existing codebase structure, especially the relationship between server components, client components, and server actions.

### What Went Well

- The recursive comment system was already well-implemented
- Next.js App Router structure was clean and easy to navigate
- Database schema properly defined with foreign key relationships
- Authentication using Auth.js was already integrated

### Useful External Sources

- [Next.js Documentation](https://nextjs.org/docs) - For understanding App Router and server actions
- [React useFormState Documentation](https://react.dev/reference/react-dom/useFormState) - For understanding form state management
- [PostgreSQL UNIQUE Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE) - For implementing duplicate vote prevention

### Feedback Requested

Would appreciate feedback on:
- The approach taken for error handling in voting (using API route vs server actions)
- Any potential improvements to the database schema or query performance
