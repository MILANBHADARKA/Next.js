//next js is run on edge server means it is run on our nearest server so here we need to connect to the database on every api call not like other backend where we connect to the database once in main file and then we can use it in all the api calls

import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect();

export async function POST(request: NextRequest){
    try {                    //remember whenever work is on database use try catch.
        
        const reqBody = await request.json()               //here use of await is nacessary.     
        const{username, email, password} = reqBody    
        // validation
        console.log(reqBody);

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"},
                {status: 400}
            )
        }

        const salt = await bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({email,emailType: "VERIFY",userId: savedUser._id})

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })
        


    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500})
    }
}

export async function GET(request: NextRequest){

}