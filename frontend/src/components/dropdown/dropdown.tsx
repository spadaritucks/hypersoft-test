import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"



export default function HeaderDropdown() {

    return (
        <DropdownMenu>
            
            <DropdownMenuTrigger asChild>
                <div className=" flex items-center gap-2 max-w-34 rounded-xl px-4 py-3  border border-gray-300 cursor-pointer hover:opacity-70 transition-all">
                    <p className="font-semibold">UnitedMen</p>
                    <ChevronDown/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}