import { Roles } from "@/src/constants/roles"
import { sidebarItems } from "./sidebar-items"

interface DashboardSidebarProps {
  role: Roles
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const items = sidebarItems[role]

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <h2 className="text-xl font-bold">MentorHub</h2>

      <nav className="space-y-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}