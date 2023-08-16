"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"


export default function LoginPage() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (!user.email && !user.password) {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }
    }, [user])

    const onLogin = async () => { 
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)

            toast.success(response.data.message)
            router.push("/profile")
        } catch (error: any) {
            console.log("🚀 ~ file: page.tsx:30 ~ onLogin ~ error:", error)
        } finally {
            setLoading(false)
        }
     }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Sign Up</h1>
            <hr />

            <label htmlFor="email">email</label>
            <input className="p-2 border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600 text-black" id={"email"} type="text" placeholder="email" value={user.email} onChange={({ target: { value } }) => {
                setUser((user) => { return { ...user, email: value } })
            }} />

            <label htmlFor="password">password</label>
            <input className="p-2 border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600 text-black" id={"password"} type="password" placeholder="password" value={user.password} onChange={({ target: { value } }) => {
                setUser((user) => { return { ...user, password: value } })
            }} />


            <button disabled={disabledButton} onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup</Link>
        </div>
    )
}