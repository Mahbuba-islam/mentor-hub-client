"use client"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

import { useForm} from "@tanstack/react-form"

import * as z from "zod"
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createBlogPost } from "@/src/actions/blog.action";


//zod schema

const blogSchema = z.object({
 title: z.string(),
  content: z.string(),
  tags:z.string()

})


export function CreateBlogFormClient() {


const form = useForm({
  defaultValues:{
  title:"",
 content:"",
 tags:"",

  },
  validators:{
    onSubmit:blogSchema
  },
 
  onSubmit: async({value})=>{
 
   const loadingId  = toast.loading("creating blog....")

   const blogData = {
    ...value,
    tags:value.tags.split(",").map((item) => item.trim())
    .filter((item)=> item !== ""),
   }

  console.log(blogData);


  try{
     const res = await createBlogPost(blogData)
    console.log(res);
     

   toast.success("Post created successfully", {id:loadingId})
  }


  catch(err){
   toast.error("something went wrong", {id:loadingId})
  }
 
   
  }

  
})

  return (
     <Card className="max-w-2xl mx-auto shadow-md mt-20">
        <CardHeader>
         <CardTitle className="text-2xl font-bold"> Create Blog</CardTitle>
         <CardDescription>You can Write Your Blog here</CardDescription>  
         </CardHeader>
        
        <CardContent>
            <form id="blog-post" 
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}>
            <FieldGroup>

                 <form.Field name="title" children={(field)=> {
          const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
          return(
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input type="text"  id={field.name} name={field.name} 
              value={field.state.value} onChange={(e)=> field.handleChange(e.target.value)}
               aria-invalid={isInvalid}/>

               {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
            </Field>

            
          )
        }} />



                 <form.Field name="content" children={(field)=> {
          const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
          return(
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Textarea   id={field.name} name={field.name} 
              value={field.state.value} onChange={(e)=> field.handleChange(e.target.value)}
               aria-invalid={isInvalid}/>

               {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
            </Field>

            
          )
        }} />


        
                 <form.Field name="tags" children={(field)=> {
          const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
          return(
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>tags (comma seperated)</FieldLabel>
              <Input type="text"  id={field.name} name={field.name} 
              value={field.state.value} onChange={(e)=> field.handleChange(e.target.value)}
               aria-invalid={isInvalid}/>

               {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
            </Field>

            
          )
        }} />


             

              
            </FieldGroup>
            </form>
            <CardFooter>
                <Button form="blog-post" type="submit" className="w-full">
              submit
                </Button>
            </CardFooter>
        </CardContent>
    </Card>
  )
}
