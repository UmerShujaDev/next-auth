import { getDataFromToken } from "@/helpers/getDataFromtoken";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()


export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request)
        const user = await User.findOne({ _id: userID }).select("-password")

        return NextResponse.json({ mesasge: "User Found!", user })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })

    }
}