import mongoose from "mongoose";

export async function connect(){
    try{
        // if(!process.env.MONGO_URI){
            //     throw new Error("MONGO_URI is not defined in .env file")
            // }
            // await mongoose.connect(process.env.MONGO_URI);


        await mongoose.connect(process.env.MONGO_URI!);                // if we are sure that it will not be null then we can use this syntax no need to use if condition
        const connection = mongoose.connection           //store this because sometime after connection there are some error happning so with "connection" variable we can perform some listener(that perform in down code) so check that error.
        
        connection.on('connected', () => {                 //if not error after connection
            console.log("MongoDB connected");
        })


        connection.on('error', (err) => {                   //if error after after connection
            console.log("MongoDB connection error, please make sure DB is up and Running" + err)
            process.exit()                       //because DB connection is not happen because of err so now run application is not good.
        })

    }
    catch (error) {
        console.log("Somthing went wrong in connection of database.")
        console.log(error);
    }
}