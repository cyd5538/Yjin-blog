import PostCard from "@/components/Home/PostCard";
import PostPlus from "@/components/Home/PostPlus";
import HomeTitle from "@/components/Home/PostTitle";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

function page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="w-full p-2 pt-10 pb-10">
      <HomeTitle />
      <div className="grid gap-4 justify-center md:grid-cols-2">
        {posts.slice(0, 4).map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
      <PostPlus />
    </div>
  );
}

export default page;
