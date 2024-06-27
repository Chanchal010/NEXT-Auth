import { connectDb } from "@/db/connectDb";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

connectDb();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({ 
            verifyToken: token, 
            verifyTokenExpiry: { 
                $gt: Date.now() 
            } 
    })

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        console.log(user);

        user.isVerified = true;
        //cleaning up
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        

        return NextResponse.json({ 
            message: "Email verified successfully",status: 201 ,
            user
        });
        
        
    } catch (error:any) {
        return NextResponse.json(
        { error: error.message }, 
        { status: 500 }
    );
    }
}
