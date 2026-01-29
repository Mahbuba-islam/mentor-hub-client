"use client"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useForm} from "@tanstack/react-form"
import { Button } from "../../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import * as z from "zod"
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";


//zod schema

const formSchema = z.object({
 email: z.email("Invalid email address"),
  password: z.string().min(8, "password required 8 char")

})


export function SignInForm({ ...props }: React.ComponentProps<typeof Card>) {

console.log(SignInForm)


const handleGoogleLogin = async() => {
   
    const data = authClient.signIn.social({
      provider:"google",
      callbackURL:"http://localhost:3000"
    }) 

    console.log(data);
  }


const form = useForm({
  defaultValues:{
  email:"",
    password:""
  },
  validators:{
    onSubmit:formSchema
  },
 
  onSubmit: async({value})=>{
 
   const loadingId  = toast.loading("creating user....")
  
  try{
     const { data, error } = await authClient.signIn.email({
      email: value.email,
      password: value.password
    })

     if(error){
      toast.error(error.message, {id:loadingId})
      return;
     }

   toast.success("Sign Insuccessfully", {id:loadingId})
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
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>

        </FieldGroup>
      </form>

      <Button
        onClick={() => handleGoogleLogin()}
        variant="outline"
        type="button"
        className="mt-4 w-full"
      >
        Login with Google
      </Button>
    </CardContent>

    <CardFooter>
      <Button form="login-form" type="submit" className="w-full">
        Submit
      </Button>
    </CardFooter>
  </Card>
)
}
