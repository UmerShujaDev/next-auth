"use client";
import axios from "axios"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState()
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successfully!")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const getUserDetail = async () => {
        try {
            const response = await axios.get("/api/users/me")

            setData(response.data.user._id)

        } catch (error: any) {

        }
    }

    useEffect(() => {
        getUserDetail()
        return () => {
            setData()
        }
    }, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">
                {!data ? "Nothing" :
                    <Link href={`/profile/${data}`}>{data}</Link>
                }
            </h2>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={logout}>Logout</button>
        </div>
    )
}