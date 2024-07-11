import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const jwtSecret = "iMeeLdsbhdgjhewkwejg#@$";

const prisma = new PrismaClient({
    // log: ["query"],
});

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!findUser) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        const pwdCompare = await bcrypt.compare(password, findUser.password);
        if (!pwdCompare) {
            return NextResponse.json({ msg: "Password incorrect" }, { status: 400 });
        }

        // const data = {
        //     user: {
        //         id: findUser.id,
        //     },
        // };
        const data = findUser.id
           

        console.log(data)//it will be use in dynamic api

        const authToken = jwt.sign(data, process.env.jwtSecret);

        const response = NextResponse.json({msg:"login sucessfull", status:200, token:authToken})

        response.cookies.set("token", authToken,{
            expiresIn:"1d",
            httpOnly:true
        })

        return response


       
        
    } catch (error) {
        console.error("Error during login process:", error);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}
