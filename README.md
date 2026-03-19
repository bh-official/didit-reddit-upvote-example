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
