import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";



export const getDaataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        console.log( "get data from token:",token);
        

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!)

        return decodedToken._id

    } catch (error:any) {
        throw new Error(error.message)
    }
}