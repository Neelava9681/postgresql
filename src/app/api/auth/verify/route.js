import Login from "@/app/login/page";
import { PrismaClient } from "@prisma/client";
import { data } from "autoprefixer";

import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export default async function GET(req, { params }){

    const { token } = req.query;
    console.log("entered in verify route");

    try {

        const user = await prisma.user.findFirst({
            where:{
                verificationToken:token
            }
        });

        if(!user){
            return NextResponse({status:400}, {msg:"invalid user token"})
        }

        const tokenVerify = await prisma.user({
            where:{id:user.id},
            data:{
                verified:true,
                verificationToken:null
            }
        })

        return NextResponse({status:200}, {msg:"verification done"})
        
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    }
}