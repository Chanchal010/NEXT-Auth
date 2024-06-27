import { connectDb } from "@/db/connectDb";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDb();



export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        //validation 
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

       const validPassword = bcryptjs.compareSync(password, user.password);

       if (!validPassword) {    
        return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
       }

       const tokenData = {
        _id: user._id,
        email: user.email,
        username: user.username,
       }


       const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
        expiresIn: "1d"
       })



       const res = NextResponse.json({ 
        message: "Login successful",status: 201 ,
        user,
        token
       });

       res.cookies.set(
        "token",
        token,
        {
            httpOnly: true,
        }
       )

       return res


    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}