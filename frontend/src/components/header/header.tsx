"use client"

import UserAvatar from "../user-avatar/user-avatar";


export default function Header() {

    return (
        <header className="w-full flex items-center justify-end h-16 shadow-sm shadow-gray-200 px-8  ">
            <UserAvatar />
        </header>
    )
}