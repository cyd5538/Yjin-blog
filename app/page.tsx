import PostCard from "@/components/Home/PostCard";
import Plus from "@/components/Home/Plus";
import HomeTitle from "@/components/Home/PostTitle";
import Memopost from "@/components/memos/Memopost";
import { Post, allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

function page() {
  const filteredPosts = allPosts.filter(post => !post._id.startsWith('memo'));
  const posts = filteredPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const memos = allPosts
  .filter(post => post._id.startsWith('memo'))
  .sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="pb-32">
      <HomeTitle title="Recent Post"/>
      <div className="mt-10 grid gap-4 justify-center md:grid-cols-2 grid-cols-1">
        {posts.slice(0, 4).map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
      <Plus title="All post" url="/posts"/>
      <HomeTitle title="Recent Memo"/>
      <div className='mt-10 grid gap-4 justify-center md:grid-cols-3 grid-cols-1'>
        {memos.slice(0,3).map((post: Post) => (
          <Memopost key={post.title} {...post} />
        ))}
      </div>
      <Plus title="All memo" url="/memo"/>
    </div>
  );
}

export default page;
