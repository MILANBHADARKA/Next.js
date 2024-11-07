import mongoose from "mongoose";
import { collectSegmentData } from "next/dist/server/app-render/collect-segment-data";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection

        connection.
    }
    catch (error) {
        console.log("Somthing went wrong in connectiondatabase.")
        console.log(error);
    }
}