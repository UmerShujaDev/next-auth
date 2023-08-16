import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("DB connected")
        })

        connection.on("error", (err) => {
            console.log("Connection error", err)
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong")
        console.log("🚀 ~ file: dbConfig.ts:7 ~ connect ~ error:", error)
    }
}