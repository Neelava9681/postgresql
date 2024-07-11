import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"
import { v4 as uuidv4} from "uuid"

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        console.log("Received request with email:", email);

        if (!email || !password) {
            return NextResponse.json({ msg: "Fill all fields" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        console.log("Existing user:", existingUser);

        if (existingUser) {
            return NextResponse.json({ msg: "User already exists" }, { status: 400 });
        }

    
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt);

        const verificationToken = uuidv4()
        console.log(verificationToken)


        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: secPassword,
                verificationToken : verificationToken,
                contactBooks: { create: [] },
            },
        });

        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.mailgun.org',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: ' postmaster@sandbox49d22bcfbe0546c5a1c505bd2a84957e.mailgun.org', // Your Mailgun SMTP username
        //         pass: 'd8412c0d988094436ed1cd1d159a31cd-8a084751-8d04c18e', // Your Mailgun SMTP password
        //     },
        // });
        
        
        // const mailOption = {
        //     from:"Excited User <mailgun@sandbox49d22bcfbe0546c5a1c505bd2a84957e.mailgun.org>",
        //     to:email,
        //     subject:"verify your email",
        //     text:`click this link to varify: http://localhost:3000/api/auth/verify?token=${verificationToken}`,
        // };

        // await transporter.sendMail(mailOption)

        console.log("New user created:", newUser);

        return NextResponse.json({ msg: "User created successfully. please check your email to verify" }, { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
