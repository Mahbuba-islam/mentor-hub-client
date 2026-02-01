import { tutorService } from "@/src/services/tutor.services";
import { TutorsCard } from "./TutorsCard";

export default async function TutorsPage() {
  const { data: tutors } = await tutorService.getTutors();

  return (
    <div className="px-4 md:px-8 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">All Tutors</h2>
 <TutorsCard tutors={tutors}/>
      
    </div>
  );
}