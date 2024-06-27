import { connectDb } from "@/db/connectDb";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { getDaataFromToken } from "@/helpers/getDataFromToken";
connectDb();


export async function POST(request: NextRequest) {
    //extract data feom token 
    const userId: any = await getDaataFromToken(request)


    const user = await User.findOne({_id : userId}).select("-password")
    if (!user) {
        return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        
    }
    return NextResponse.json({ 
        message: "User fetched successfully",
        status: 201 ,
        user
    });
}