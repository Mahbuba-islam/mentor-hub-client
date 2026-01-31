// import { getCategories } from "@/src/services/admin.services"

import { getCategoriesAction } from "@/src/app/actions/category.action";
import CreateCategoryFormClient from "./createCategoryFormClient";
import CategoryList from "./categoryList";

// export default async function AdminCategoriesPage() {
//   const { data, error } = await getCategories()

//   if (error || !data) {
//     return (
//       <div className="p-6 text-red-500">
//         Failed to load categories
//       </div>
//     )
//   }

//   const categories = data

//   return (
//     <div className="space-y-6 p-4 md:p-6">
//       <h1 className="text-2xl font-bold">Categories</h1>

//       <div className="border rounded-md overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-muted">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((c: any) => (
//               <tr key={c.id} className="border-t">
//                 <td className="px-4 py-2">{c.name}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }



// import { getCategoriesAction } from "@/src/actions/category.action";
// import CreateCategoryFormClient from "./createCategoryFormClient";
// import CategoryList from "./categoryList";

export default async function CategoriesPage() {
  const { data } = await getCategoriesAction();
  console.log('cat data',data);
  return (
    <div className="p-6 space-y-6">
      <CreateCategoryFormClient />

      <CategoryList categories={data} />
    </div>
  );
}