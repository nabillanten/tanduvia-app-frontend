import {jwtDecode} from "jwt-decode";
import {cookies} from "next/headers";
import AhligiziDashboard from "./ahli_gizi/dashboard/ahligizi-dashboard";
import AdminDashboard from "./admin/admin-dashboard";
import PetugasDashboard from "./petugas/dashboard/petugas-dashboard";
import {Suspense} from "react";
import DashboardLoading from "@/components/ui/dashboard-loading";

type Props = object;

const RenderDashboard = ({role}: {role: string}) => {
  if (role === "SUPERADMIN") {
    return <AdminDashboard />;
  } else if (role === "AHLI_GIZI") {
    return <AhligiziDashboard />;
  } else {
    return <PetugasDashboard />;
  }
};

const Page = async (props: Props) => {
  const cookie = await cookies();
  const access_token = cookie.get("access_token")?.value;
  let decodedJWT;
  try {
    decodedJWT = jwtDecode<{id: string; roles: Array<string>}>(
      access_token as string,
    );
  } catch (error) {
    console.log(error);
  }
  const role = decodedJWT?.roles?.[0];

  return (
    <Suspense key={role} fallback={<DashboardLoading />}>
      <RenderDashboard role={role as string} />
    </Suspense>
  );
};

export default Page;
