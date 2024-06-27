import mongoose from "mongoose";


export const connectDb = async () => {
    try {

        mongoose.connect(process.env.MONGO_URI!)
        const conection = mongoose.connection

        conection.on("connected", () => {
            console.log("MongoDB connected")
        })

        conection.on("error", (error) => {
            console.log("MongoDB connection error : " + error)
            process.exit()
        })
        
    } catch (error) {
        console.log("something went wrong with db")
        console.log(error);
    }
}