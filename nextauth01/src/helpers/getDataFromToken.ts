import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";
import { request } from "http";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";          //here we put empty string because if there are no token then token is undifined so to not handle undefined we add empty string

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken.id

    } catch (error: any) {
        throw new Error(error.message)
    }
}