import ProfilePage from "@/components/ProfilePage";
import { fetchBookStats, fetchUserDetails } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentUser = await fetchUserDetails();
  const bookStats = await fetchBookStats(currentUser?.id!);
  if (!currentUser) {
    return null;
  }
  return (
    <>
      <ProfilePage currentUser={currentUser} bookStats={bookStats} />
    </>
  );
}
