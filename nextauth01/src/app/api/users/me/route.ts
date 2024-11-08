import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest){
    try {   
        //extract data from token        //we can also do that here but we make one helper to s this work so we can use that in other route also otherwise no need of making helper
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id: userId}).select("-password")                //here role of select("-password") to select but we use '-' before password so means not selecting password fromn user information

        if(!user){
            return NextResponse.json(
                {error: "User not found"},
                {status: 400}
            )
        }

        return NextResponse.json({
            message: "User Found",
            data: user
        })



    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}