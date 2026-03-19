## Upvote

**Live Demo:** [https://didit-reddit-upvote-example-alpha.vercel.app](https://didit-reddit-upvote-example-alpha.vercel.app)

**GitHub Repository:** [https://github.com/bh-official/didit-reddit-upvote-example](https://github.com/bh-official/didit-reddit-upvote-example)

## Assignment Reflection

**Fixed Table Names** - Since I already had `posts` and `comments` tables in my database and wanted to keep them, new tables named `posts1` and `comments1` were created. Updated all database references from `posts` to `posts1` and `comments` to `comments1` across the entire codebase:

- `src/app/post/[postId]/page.jsx` - Single post query
- `src/components/CommentList.jsx` - Comments query
- `src/actions/comments.js` - Comment insertion
- `schema.sql` - Database schema with proper foreign key references

### Requirements Met and Goals Achieved

1. **Fixed Page Titles** - Added `generateMetadata()` function to dynamically set page titles based on post title in `src/app/post/[postId]/page.jsx`

2. **Added Error Handling for Voting** - Created new API route (`src/app/api/vote/route.js`) and updated VoteButtons component to show "You must be logged in to vote" error message when users not logged in attempt to vote

3. **Enhanced Error Handling** - Improved voting error handling with user-friendly messages

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

### New Features Added from the README file of the project

1. **User Profiles** - Added user profile pages at `/user/[userId]` showing:
   - User's profile information (name, avatar, join date)
   - User's karma score
   - List of user's posts
   - List of user's recent comments
   - Links to profiles from usernames on posts

2. **Post Sorting** - Added sorting options for posts:
   - Top (most upvotes) - default
   - Recent (newest first)
   - Controversial (most debated)
   - Sort buttons with amber styling

All primary requirements were achieved. The application is fully functional with the enhanced error handling.

### Difficulties Encountered

1. **Server Actions with useFormState** - Initially attempted to use `useFormState` with server actions for vote error handling, but encountered serialization issues when passing server actions as props from server to client components. Solved by converting VoteButtons to a client component using onClick handlers and creating a new API route for voting.

2. **Understanding Project Structure** - Required time to explore and understand the existing codebase structure, especially the relationship between server components, client components, and server actions.

### What Went Well

- Joining the existing project was straightforward
- Installing dependencies went smoothly
- Getting the .env file key was quite easy
- The YouTube video on creating a GitHub App for NextAuth was very helpful

I would have liked to complete all the potential future features; however, due to time constraints I was only able to complete a few. As I also want to begin planning for the final week project, I’ve decided to stop at this stage.
