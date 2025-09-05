"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ChartBarIncreasing, LayoutDashboard } from "lucide-react"
import SidebarGroupComponent from "./sidebar-group"
import Image from "next/image"



export function AppSideBar() {
    return (

        <div className="w-auto h-auto relative">
            <Sidebar>
                <SidebarHeader className="flex flex-row items-center px-4 py-4">
                    <Image src={"/hypesoft_logo.jpg"} alt="" width={30} height={30} className="rounded-sm" />
                    <h2 className="font-semibold text-xl"><span className="text-violet-400">Hype</span>soft</h2>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroupComponent label="General" items={
                        [
                            { title: "Dashboard", url: "/", icon: <LayoutDashboard /> },
                            { title: "Statistics", url: "/", icon: <ChartBarIncreasing /> }
                        ]} />
                    <SidebarGroup />
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
            <SidebarTrigger className="absolute top-0 right-[-24px] z-50" />
        </div>
    )
}