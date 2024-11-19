import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmails";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username,email,password} = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername){               //if existing verified username
            return Response.json({
                success: false,
                message: "username is already taken"
            },
            {
                status: 500
            })
        }

        const existingUserByEmail = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if(existingUserByEmail){           
            if(existingUserByEmail.isVerified){     //if user existing verified and now doing second time signUp with same
                return Response.json(
                    {
                        success: false,
                        message: "User already exist with this email"
                    },{status: 400}
                )
            }
            else{
                const hashedPassword = await bcrypt.hash(password,10)

                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        }
        else{         //if user doing signUp first time with new usermname and new email
            const hashedPassword = await bcrypt.hash(password,10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newuser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newuser.save()

            //send verification email
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )

            // console.log(emailResponse)        //for get information or method that we use below

            if(emailResponse.success){
                return Response.json(
                    {
                        success: false,
                        message: emailResponse.messages
                    },{status: 500}
                )
            }

            return Response.json(
                {
                    success: true,
                    message: "User registered successfully. please varify your email"
                },{status: 201}
            )

        }

    } catch (error) {
        console.error("error registring user", error)
        return Response.json({
            success: false,
            message: "error registring user"
        },
        {
            status: 500
        }
    )
    }
}