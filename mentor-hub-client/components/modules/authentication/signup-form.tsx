"use client"

// import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

import { useForm} from "@tanstack/react-form"
import { Button } from "../../ui/button";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import * as z from "zod"
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/src/components/ui/field"
// import { Input } from "@/src/components/ui/input"

//zod schema

const formSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "password required 8 char")

})


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {


const handleGoogleLogin = async() => {
   
    const data = authClient.signIn.social({
      provider:"google",
      callbackURL:"http://localhost:3000"
    }) 

    console.log(data);
  }


const form = useForm({
  defaultValues:{
    name:"",
    email:"",
    password:""
  },
  validators:{
    onSubmit:formSchema
  },
 
  onSubmit: async({value})=>{
 
   const loadingId  = toast.loading("creating user....")
  
  try{
     const { data, error } = await authClient.signUp.email({
      name: value.name,
      email: value.email,
      password: value.password
    })

     if(error){
      toast.error(error.message, {id:loadingId})
      return;
     }

   toast.success("Form submitted successfully", {id:loadingId})
  }
  catch(err){
   toast.error("something went wrong", {id:loadingId})
  }
 
   
  }

  
})

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={(e)=> {
          e.preventDefault()
          form.handleSubmit()
        }}>

        <FieldGroup>
        
        <form.Field name="name" children={(field)=> {
          const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
          return(
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input type="text"  id={field.name} name={field.name} 
              value={field.state.value} onChange={(e)=> field.handleChange(e.target.value)}
               aria-invalid={isInvalid}/>

               {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
            </Field>

            
          )
        }} />

        {/* email */}

        <form.Field name="email" children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return(
            <Field data-invalid={isInvalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input type="text" id={field.name} name={field.name} value={field.state.value} 
               onChange={(e)=> field.handleChange(e.target.value)} aria-invalid={isInvalid}>
             </Input>

            {isInvalid && (
              <FieldError errors={field.state.meta.errors}/>
            )} 
            </Field>
          )
        }}/>

        {/* password */}
       
       <form.Field name="password" children={(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return(
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input type="text"  id={field.name} name={field.name} 
            value={field.state.value} 
            onChange={(e) => field.handleChange(e.target.value)}  aria-invalid={isInvalid}/>

            {isInvalid && (
              <FieldError errors={field.state.meta.errors}/>
            )}
          </Field>
        )
       }}/>
       

        </FieldGroup>
       

     
        </form>
           <Button onClick={() => handleGoogleLogin()} variant="outline" type="button">
                  Login with Google
                </Button>
          
      </CardContent>
      <CardFooter>
        <Button form="login-form" type="submit">Submit</Button>
      </CardFooter>
    </Card>
  )
}
