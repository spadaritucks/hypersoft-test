"use client"
import { Bell, Sun } from "lucide-react";
import HeaderDropdown from "../dropdown/dropdown";
import UserAvatar from "../user-avatar/user-avatar";


export default function Header() {

    return (
        <header className="w-full flex items-center justify-evenly h-16 shadow-sm shadow-gray-200  ">
            <HeaderDropdown />
            <div className="flex items-center gap-3">
                <Bell className="cursor-pointer hover:opacity-70" />
                <Sun className="cursor-pointer hover:opacity-70" />
            </div>
            <UserAvatar />
        </header>
    )
}