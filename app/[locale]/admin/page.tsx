import DashboardView from "@/components/admin/Dashboard";
import { fetchDashboardData } from "@/lib/actions";
// import { fetchDashboardData } from "@/lib/actions";

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  return (
    <div>
      <DashboardView data={data} />
    </div>
  );
}
