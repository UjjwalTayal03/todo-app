import mongoose, { mongo } from 'mongoose'



const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Connection Failed\n", error)
        process.exit(1)
    }
}

export default connectDb