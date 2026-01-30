import { Booking } from "./booking.types"
import { Review } from "./review.types"
import { User } from "./user.types"
import {Category} from "./category.types"
export interface TutorProfile {
 name: string
  id: string
  userId: string
  categoryId: string

  bio?: string | null 
  price?: number | null
  rating: number
  subject: string[]

  totalReviews: number
  isFeatured: boolean

  user: User
  category: Category
  reviews: Review[]
  bookings: Booking[]
}

