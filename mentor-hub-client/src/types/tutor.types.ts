import { Booking } from "./booking.types";
import { Review } from "./review.types";
import { User } from "./user.types";
import { Category } from "./category.types";

export interface TutorProfile {
  experience: string;
  id: string;
  userId: string;
  categoryId: string;

  bio?: string | null;
  price?: number | null;
  rating: number;
  subject: string[];

  totalReviews: number;
  isFeatured: boolean;

  user: User;
  category: Category;
  reviews: Review[];
  bookings: Booking[];
}

export interface TutorsPageProps {
  searchParams?: {
    search?: string | undefined
    categoryName?: string | undefined
  };
}

export interface TutorUser {
  name: string;
  email: string;
  image?: string | null;
}

export interface TutorCategory {
  name: string;
}

export interface TutorReview {
  id: string;
  rating: number;
  comment: string;
  student: {
    name: string;
    email: string;
  };
}

export interface TutorDetailsType {
  id: string;
  bio: string;
  price: number;
  rating: number;
  totalReviews: number;
  subject: string[];
  category: TutorCategory | null;
  user: TutorUser | null;
  reviews: TutorReview[];
}

export interface TutorByIdResponse {
  data: {
    data: TutorDetailsType;
  };
}
