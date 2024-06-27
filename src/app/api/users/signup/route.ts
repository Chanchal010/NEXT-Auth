import { connectDb } from "@/db/connectDb";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connectDb();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()

        const { username, email, password } = reqBody;
        //validation 
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

       const hashedPassword = bcryptjs.hashSync(password, 10)

        const newUser = new User(
            { 
                username, 
                email, 
                password: hashedPassword 
            }
        );

        const savedUser = await newUser.save();
        console.log("saved User :- ",savedUser);
        
       // send verification email

       await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id
       })


        return NextResponse.json({ 
            message: "User created successfully",status: 201 ,
            savedUser
        });


    } catch (error: any) {
        return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
        );
    }    
}

