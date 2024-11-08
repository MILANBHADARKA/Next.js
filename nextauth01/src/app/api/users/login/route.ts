import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"


connect();

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json()               //here use of await is nacessary.     
        const{username, email, password} = reqBody    
        // validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json(
                {error: "User does not exists"},
                {status: 400}
            )
        }
        console.log("User exists");

        const validPassword = await bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json(
                {error: "Check ypur credential"},
                {status: 400}
            )
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Logged in success",
            success: true,
        })

        response.cookies.set("token", token, {                       //if we use express we need to install cookie-parser but in next js we can use this syntax
            httpOnly: true
        })

        return response;

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}