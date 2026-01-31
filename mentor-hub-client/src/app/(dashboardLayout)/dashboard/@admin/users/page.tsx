import { getUsersAction } from "@/src/app/actions/user.action";

export default async function AdminUsersPage() {
  const data = await getUsersAction();
  console.log("users res", data);

  const users = data?.users ?? [];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-2xl font-bold">All Users</h1>

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Bookings</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u: any) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={u.image || "/default-avatar.png"}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {u.name}
                </td>

                <td className="px-4 py-2">{u.email}</td>

                <td className="px-4 py-2 capitalize">
                  {u.role.toLowerCase()}
                </td>

                <td className="px-4 py-2">{u._count?.bookings ?? 0}</td>

                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      u.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}