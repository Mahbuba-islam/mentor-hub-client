import { tutorService } from "@/src/services/tutor.services"

export default async function TutorDetails({ params }: { params: { id: string } }) {
  const { id } = await params

  // Fetch tutor details
  const { data } = await tutorService.getTutorById(id)
  console.log('tutors', data.data.rating);
  
  if (!data.data) {
    return <div className="text-center py-20 text-gray-500">Tutor not found</div>
  }

  return (
    <section className="max-w-5xl mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-40 h-40 bg-[#1c1d1f] rounded-lg overflow-hidden">
          {data.data.user?.image ? (
            <img
              src={tutor.user.image}
              alt={tutor.user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold text-[#1c1d1f]">{data.data.user?.name}</h1>

          <p className="text-[#6a6f73] text-sm">
            {data.data.category?.name} • {data.data.subject?.join(", ")}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#b4690e] font-semibold">{data.data.rating?.toFixed(1)}</span>
            <span className="text-[#b4690e]">★</span>
            <span className="text-[#6a6f73]">({data.data.totalReviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="text-xl font-bold text-[#1c1d1f]">
            ${data.data.price}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="p-6 border border-[#d1d7dc] rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-3 text-[#1c1d1f]">About the Tutor</h2>
        <p className="text-[#1c1d1f] leading-relaxed">{data.data.bio}</p>
      </div>

      {/* Subjects */}
      <div className="p-6 border border-[#d1d7dc] rounded-lg bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-3 text-[#1c1d1f]">Subjects</h2>
        <div className="flex flex-wrap gap-2">
          {data.data.subject?.map((sub: string) => (
            <span
              key={sub}
              className="px-3 py-1 text-sm bg-[#f7f9fa] border border-[#d1d7dc] rounded-full"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 border border-[#d1d7dc] rounded-lg bg-white shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-[#1c1d1f]">Ready to book a session?</h3>
          <p className="text-sm text-[#6a6f73]">Contact the tutor to schedule your first lesson.</p>
        </div>

        <button className="rounded-md bg-[#5624d0] text-white px-5 py-2 font-semibold hover:bg-[#3b1a99] transition">
          Book Now
        </button>
      </div>
    </section>
  )
}