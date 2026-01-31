
export enum UserRoles {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
}


export interface User {
  id: string
  name: string
  email: string
  image?: string | null
  role: UserRoles
}
