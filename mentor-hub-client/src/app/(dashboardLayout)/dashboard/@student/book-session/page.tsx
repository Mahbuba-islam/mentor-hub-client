

import { tutorService } from "@/src/services/tutor.services";
import { BookSessionUI } from "./bookSession";

export default async function BookSessionPage() {
 const { data: tutors } = await tutorService.getTutors({
   
   });
   console.log('tutors...', tutors);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Book a Tutoring Session
      </h1>

      <BookSessionUI tutor={tutors} />
    </div>
  );
}

