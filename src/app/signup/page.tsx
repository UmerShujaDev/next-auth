"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"


export default function SignUpPage() {
    const router = useRouter()
    const [disabledButton, setDisabledButton] = useState(false)
    const [loading, setloading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    })

    const onSignUp = async () => {
        try {
            setloading(true)

            const response = await axios.post("/api/users/signup", user)
            console.log("🚀 ~ file: page.tsx:24 ~ onSignUp ~ response:", response)
            toast.success(response.data.message)

            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [user])



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Sign Up</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600 text-black" id={"username"} type="text" placeholder="username" value={user.username} onChange={({ target: { value } }) => {
                setUser((user) => { return { ...user, username: value } })
            }} />

            <label htmlFor="email">email</label>
            <input className="p-2 border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600  text-black" id={"email"} type="text" placeholder="email" value={user.email} onChange={({ target: { value } }) => {
                setUser((user) => { return { ...user, email: value } })
            }} />

            <label htmlFor="password">password</label>
            <input className="p-2 border-gray-300 rounded-lg mb-4 focus:ouline-none focus:border-gray-600  text-black" id={"password"} type="password" placeholder="password" value={user.password} onChange={({ target: { value } }) => {
                setUser((user) => { return { ...user, password: value } })
            }} />


            <button disabled={disabledButton} onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Sign up here</button>
            <Link href="/login">Visit login</Link>
        </div>
    )
}