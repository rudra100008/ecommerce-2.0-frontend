"use client"

import { useCurrentUser } from "@/hooks/useUser";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function OAuthSuccessPage(){
    const {mutate:CurrentUser,isPending, error,isError,isSuccess} = useCurrentUser();
    const router = useRouter();
    useEffect(()=>{
        CurrentUser();

        if(isSuccess){
            router.push("/home")
        }
    },[CurrentUser,isSuccess,router])

    if(isPending){
        return(
            <div className="text-2xl flex justify-center items-center text-success-light">Loading.....</div>
        )
    }
    if(isError){
        return(
            <div className="text-2xl flex justify-center items-center text-danger">{(error as AxiosError<{message: string}>).response?.data?.message}</div>
        )
    }
}