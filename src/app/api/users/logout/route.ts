import { connectDb } from "@/db/connectDb";
import { NextRequest, NextResponse } from "next/server";
connectDb();


export async function GET(request: NextRequest) {
    try {

        const res =  NextResponse.json({ 
            message: "Logout successful",
            success: true ,
        })

        res.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });

        return res

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}