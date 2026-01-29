import { redirect } from "next/navigation";

export default function UserDashboardPage(){
    return redirect("/dashboard/createBlog")
}