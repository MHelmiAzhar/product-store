import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connect : ${conn.connection.host}`)
    } catch (error) {
        process.exit(1)
    }
}