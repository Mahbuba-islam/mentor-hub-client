import { tutorService } from "@/src/services/tutor.services";
import { TutorsCard } from "./TutorsCard";

export default async function TutorsPage() {
  const { data: tutors } = await tutorService.getTutors();
  console.log('tutors',tutors);
  return (
    <div className="px-4 md:px-8 mt-6 text-center ">
     <h2 className=" text-center text-2xl font-extrabold mb-6 my-5
  bg-gradient-to-r from-[#5624D0] to-[#4e1571] bg-clip-text text-transparent
  relative inline-block animate-fadeIn">
  Discover Expert Tutors
  <span className="absolute left-0 -bottom-1 w-0 h-[3px] 
    bg-gradient-to-r from-[#8324d0] to-[#86097d] 
    group-hover:w-full transition-all duration-500 rounded-full">
  </span>
</h2>

 <TutorsCard tutors={tutors}/>
      
    </div>
  );
}