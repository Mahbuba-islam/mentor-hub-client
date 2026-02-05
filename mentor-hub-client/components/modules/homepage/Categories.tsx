import Link from "next/link";
import { Animated } from "@/components/modules/homepage/Animated";
import { getCategoriesAction } from "@/src/app/actions/category.action";
import { 
  Code, Brain, BookOpen, PenTool, Globe, Calculator, Laptop 
} from "lucide-react";

const categoryIcons: Record<string, any> = {
  "Programming": Code,
  "Computer Science": Laptop,
  "Mathematics": Calculator,
  "AI": Brain,
  "English": BookOpen,
  "Design": PenTool,
  "Language": Globe,
};

export default async function Categories() {
  const { data: categories } = await getCategoriesAction();

  return (
    <Animated>
      <section className="mt-18 px-4 md:px-10 text-center space-y-6">

       {/* Title */}
       <p className="text-lg md:text-xl font-medium text-gray-600 max-w-2xl mx-auto animate-fadeIn">
 Grow smarter with expert‑guided learning
Explore categories built to support your goals at every level.

</p>


        {/* Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1 justify-center md:justify-center">

          {categories?.map((cat: any, index: number) => {
            const Icon = categoryIcons[cat.name] || Code;

            return (
              <Link
                key={cat.id}
                href={`/tutors?categoryName=${cat.name}`}
                className="group relative flex items-center gap-2 px-4 py-2 
                  rounded-full bg-white border border-gray-200 shadow-sm
                  hover:shadow-md hover:-translate-y-1 transition-all duration-300
                  text-gray-700 opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-4 h-4 text-[#5624D0]" />
                <span className="font-semibold text-sm">{cat.name}</span>

                {/* Gradient underline */}
                <span className="
                  absolute left-1/2 -bottom-1 w-0 h-[3px] 
                  bg-gradient-to-r from-[#5624D0] to-[#b00ea5]
                  rounded-full transition-all duration-300
                  group-hover:w-3/4 group-hover:-translate-x-1/2
                "></span>
              </Link>
            );
          })}
        </div>
      </section>
    </Animated>
  );
}