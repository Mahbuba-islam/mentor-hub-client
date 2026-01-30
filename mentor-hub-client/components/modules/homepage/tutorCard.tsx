import Link from "next/link"


type TutorCardProps = {
  id: string
  bio?: string | null
  categoryName?: string
  price?: number | null
  rating?: number
  totalReviews?: number
  user: {
    name: string
    image: string | null
  }
  onDetailsClick?: (id: string) => void
}

export default function TutorCard({
  id,
  bio,
  categoryName,
  price,
  rating,
  totalReviews,
  user,
  onDetailsClick,
}: TutorCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-[#d1d7dc] bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Tutor Image */}
      <div className="relative h-40 w-full bg-[#1c1d1f]">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#f7f9fa]">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-[15px] font-bold text-[#1c1d1f] line-clamp-1">
          {user.name}
        </h3>

        <p className="text-[13px] text-[#6a6f73] line-clamp-2">{bio}</p>

        {categoryName && (
          <span className="text-[12px] font-medium text-[#6a6f73]">
            Category: {categoryName}
          </span>
        )}

        {/* Rating + Price */}
        <div className="mt-1 flex items-center justify-between">
          {rating !== undefined && (
            <div className="flex items-center gap-1 text-[12px] text-[#b4690e]">
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span>★</span>
              {totalReviews !== undefined && (
                <span className="text-[#6a6f73]">({totalReviews})</span>
              )}
            </div>
          )}

          <span className="text-[14px] font-bold text-[#1c1d1f]">
            ${price}
          </span>
        </div>

        {/* Details Button */}
        <Link
  href={`/tutorDetails/${id}`}
  className="mt-3 inline-block rounded-md border border-[#5624d0] bg-[#5624d0] px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-[#3b1a99] transition-colors duration-150"
>
  Details
</Link>

      </div>
      
    </div>
  )
}