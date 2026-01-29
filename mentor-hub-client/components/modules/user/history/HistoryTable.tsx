import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { BlogPost } from "@/src/types";

export default function HistoryTable({posts} : {posts:BlogPost[]}) {
  return (
   <Table className="border rounded-lg max-w-4xl mx-auto mt-18">
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-25">Title</TableHead>
      <TableHead>Tags</TableHead>
      <TableHead>views</TableHead>
      <TableHead >Comments</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
   
 {
    posts.map(post => <TableRow key={post.id}>
        <TableCell>{post.title}</TableCell>
        <TableCell>{post.content}</TableCell>
        <TableCell>{post.views}</TableCell>
        <TableCell>{post.title}</TableCell>
        <TableCell>{post.isFeatured}</TableCell>
    </TableRow>)
 }


  </TableBody>
</Table>
  )
}