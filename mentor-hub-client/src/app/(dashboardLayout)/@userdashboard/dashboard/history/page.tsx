// import HistoryTable from "@/src/components/modules/user/history/HistoryTable";
// import Pagination from "@/src/components/ui/pagination-controls";
// import { blogService } from "@/src/services/blog.service"

export default async function History({searchParams} : { searchParams: { page?: string } }) {
   
    // const {page} = await searchParams
    // console.log(page);

    // const response = await blogService.getBlogPosts({page})
    // console.log('res',response.data.page);
    
    // const pagination = response.data || {
    //   limit:10,
    //   page:1,
    //   total:0,
    //   totalPages:1
    // }
    // console.log(pagination);
    // const posts = response.data?.data || []
    // console.log(posts);
  return (
    <div>
    {/* <HistoryTable posts={posts}></HistoryTable>
    <Pagination meta={pagination}/> */}
    </div>
  )
}