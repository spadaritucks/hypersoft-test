import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSideBar } from "../sidebar/sidebar";
import Header from "../header/header";


export default function AuthLayout({ children }: { children: ReactNode }) {

    return (

        <section className="flex w-full h-auto gap-0 m-0 p-0">
            <SidebarProvider>
                <AppSideBar  />
                
                <div className="flex flex-col w-full h-auto">
                    <Header/>
                    {children}
                </div>
            </SidebarProvider>

        </section>
    )
}