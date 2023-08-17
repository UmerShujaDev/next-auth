import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"

import User from "@/models/userModel"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json()
        const {token} = reqBody

       const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        if(!user) {
            return NextResponse.json({message: "invalid token"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        user.save()

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}