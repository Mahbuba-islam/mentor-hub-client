export interface Review {
  id: string
  rating: number
  comment: string
  studentId: string
  createdAt: string
}
export interface ReviewWithStudent {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;

  student: {
    id: string;
    name: string;
    email: string;
  };
}
