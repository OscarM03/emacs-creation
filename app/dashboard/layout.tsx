import { requireAuth } from "@/actions/user";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    await requireAuth();

    return <>{children}</>;
}
