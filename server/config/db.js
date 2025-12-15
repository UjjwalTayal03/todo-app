import mongoose, { mongo } from 'mongoose'

const dbURI = 'mongodb+srv://utubeuser:utubeuser1234@cluster0.9riqk.mongodb.net/'

const connectDb = async () => {
    try {
        await mongoose.connect(dbURI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Connection Failed\n", error)
        process.exit(1)
    }
}

export default connectDb