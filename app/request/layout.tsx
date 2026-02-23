// --- START OF FILE layout.tsx ---

import RequestSidebar from "@/components/requests/RequestSidebar"; // Renombrar
import RequestSummary from "@/components/requests/RequestSummary"; // Renombrar
import ToastNotification from "@/components/ui/ToastNotification";
import UserHeader from "@/components/ui/UserHeader";

export default function RequestLayout({ children }: Readonly<{ children: React.ReactNode}>) {
    return (
        <>
            <UserHeader />
            <div className="md:flex">
                <RequestSidebar />

                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                    {children}
                </main>

                <RequestSummary />
            </div>

            <ToastNotification />
        </>
    )
}