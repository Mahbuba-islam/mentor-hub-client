
export async function generateStaticParams(){
//   const {data} = await  blogService.getBlogPosts()
//   return data?.data?.map((blog:BlogPost) => ({id: blog.id})).splice(0,3)
 }



export default async function BlogPage({params} : {params:Promise<{id:string}>}) {
 
     const {id} = await params
    // const {data} = await blogService.getBlogById(id)
    // console.log(data.authorId);

  return (
    <div>
      {/* <BlogDetailsCard post={data}></BlogDetailsCard> */}
    </div>
  )
}