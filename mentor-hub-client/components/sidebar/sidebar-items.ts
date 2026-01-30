import { BookIcon, UserIcon, UsersIcon, DollarSignIcon } from "lucide-react"
import { Roles } from "@/src/constants/roles"

export interface SidebarItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const sidebarItems: Record<Roles, SidebarItem[]> = {
  
  [Roles.ADMIN]: [
    { label: "Dashboard", href: "/dashboard/admin", icon: UsersIcon },
    { label: "Revenue", href: "/dashboard/admin/revenue", icon: DollarSignIcon },
    { label: "Bookings", href: "/dashboard/admin/bookings", icon: BookIcon },
  ],

  [Roles.TUTOR]: [
    { label: "Dashboard", href: "/dashboard/tutor", icon: UserIcon },
    { label: "My Bookings", href: "/dashboard/tutor/bookings", icon: BookIcon },
  ],

  [Roles.STUDENT]: [
    { label: "Dashboard", href: "/dashboard/student", icon: UserIcon },
    { label: "My Bookings", href: "/dashboard/student/bookings", icon: BookIcon },
  ],
}