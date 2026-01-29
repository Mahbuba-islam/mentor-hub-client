
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { env } from "@/src/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


const API_URL = env.API_URL



export default function CreateBlogFormServer() {

    const createBlog = async(formData:FormData)=>{
      "use server"
      console.log(formData.get("title"));
      const title = formData.get("title") as string
      const content = formData.get("content") as string
      const tags = formData.get("tags") as string

       const blogData = {
        title,
        content,
        tags: tags.split(",").map(item => item.trim()).filter(item => item !== "")
    }
    console.log(JSON.stringify(blogData));


    const cookieStore = await cookies()

    const res = await fetch(`${API_URL}/posts`, {
       method: "POST",
        headers:{
            "Content-Type":"application/json",
            Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData)
    })
   
    // if(res.status){
    //     redirect("/dashboard/createBlog?success")
    // }
    console.log(res);

    revalidateTag("posts", "page")
    }






 
  return (
    <Card className="max-w-2xl mx-auto shadow-md mt-20">
        <CardHeader>
         <CardTitle className="text-2xl font-bold"> Create Blog</CardTitle>
         <CardDescription>You can Write Your Blog here</CardDescription>  
         </CardHeader>
        
        <CardContent>
            <form id="blog-form" action={createBlog}>
            <FieldGroup>

                <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input type="text" name="title" />
                </Field>

                <Field>
                    <FieldLabel htmlFor="content">Content</FieldLabel>
                    
                    <Textarea id="content" name="content" placeholder="write your content"/>
                   
                </Field>

                <Field>
                    <FieldLabel htmlFor="tags">tags (comma seperated)</FieldLabel>
                    <Input id="tags" name="tags" type="text" placeholder="nextjs, web, html" />
                </Field>
            </FieldGroup>
            </form>
            <CardFooter>
                <Button form="blog-form" type="submit" className="w-full">
              submit
                </Button>
            </CardFooter>
        </CardContent>
    </Card>
  )
}