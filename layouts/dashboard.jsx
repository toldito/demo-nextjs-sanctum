import {HeaderAuthNavigation} from "@/components/header-auth-navigation";
import {UserAvatar} from "@/components/user-avatar";
import {DashboardNav} from "@/components/nav-auth";
import {DashboardConfig} from "@/config/dashboard";

export function DashboardLayout({children}) {
  return (
    <div className="flex flex-col mx-auto space-y-6">
      <header className="container sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between h-16 py-4 border-b border-b-slate-200">
          <HeaderAuthNavigation />
          <UserAvatar />
        </div>
      </header>
      <div className="container">
        <aside className="float-left hidden w-[14rem]  shrink-0 flex-col space-y-12 py-4 md:flex">
          <DashboardNav items={DashboardConfig.sidebar.providers} title="Proveedores" />
          <DashboardNav items={DashboardConfig.sidebar.security} title="Seguridad" />
        </aside>
        <main className="md:ml-[17rem]">
          <div className="p-2">{children}</div>
        </main>
      </div>
    </div>
  );
}
