import PostCard from "@/components/Home/PostCard";
import PostPlus from "@/components/Home/PostPlus";
import HomeTitle from "@/components/Home/PostTitle";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

function page() {
  const filteredPosts = allPosts.filter(post => !post._id.startsWith('memo'));
  const posts = filteredPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="w-full p-2 pt-10 pb-10">
      <HomeTitle />
      <div className="mt-10 grid gap-4 justify-center md:grid-cols-2 grid-cols-1">
        {posts.slice(0, 4).map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
      <PostPlus />
    </div>
  );
}

export default page;
