import { getServerUser } from "@/lib/getServerUser";
import ManageProfilePage from "./ManageProfilePage";

export default async function Page() {
  const user = await getServerUser();

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-600">
        Please login to manage your profile.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ManageProfilePage user={user} />
    </div>
  );
}