import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";


export default function UserAvatar() {

    return (
        <div className="flex items-center justify-center gap-2 hover:opacity-70 cursor-pointer">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
                <span className="font-semibold">Miguel Santos</span>
                <p className="text-sm text-gray-400">Admin</p>
            </div>
        </div>
    )
}