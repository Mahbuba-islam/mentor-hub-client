
import { adminService } from "@/src/services/admin.services";
import ManageUserTable from "./manageUserTable";

export default async function ManageUsersPage() {
  // Server-side fetch (secure)
  const data = await adminService.getAllUsers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>

      <ManageUserTable data={data} />
    </div>
  );
}