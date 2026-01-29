// import { BlogCard } from "@/src/components/modules/homepage/BlogCard";

// import { blogService } from "@/src/services/blog.service";
// import { BlogPost } from "@/src/types";

export default async function Home() {

  // const {data} = await blogService.getBlogPosts()

  // console.log(data);
  
  return (
    <div className="grid grid-cols-3 max-w-6xl gap-4 mx-auto space-y-3 my-20">
      home.................
      {/* {
        data?.data?.map((post: BlogPost) => <BlogCard key={post.id} post={post}></BlogCard>)
      } */}
    </div>
  );
}
