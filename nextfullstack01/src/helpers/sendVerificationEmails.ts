import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try{

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({username, otp: verifyCode}),
          });

        return {success: true, message: "verification email send succesfully"} 
    }
    catch(emailError){
        console.log("Email sending Error", emailError)
        return {success: false, message: "Failed to sernd verification email"}            //this is needed because we are returning a promise type of ApiResponse and we need to return that ApiResponse type object needed to be returned
    }
}
