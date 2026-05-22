"use client"
import { useAuthStore } from "@/store/useAuthStore"
import Image from "next/image";

export default function HomePage(){
    const user = useAuthStore(state => state.user);
    return(
        <div>
            {user?.fullName}
            {user?.imageUrl}
           {user?.imageUrl ? (
            <Image
            src={user.imageUrl}
            alt={user.fullName}
            width={80}
            height={80}
            className="rounded-full object-cover"
            />
           ):(
            <p>No Image</p>
           )
           }
        </div>
    )
}